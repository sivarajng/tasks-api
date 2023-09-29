import { Injectable } from '@nestjs/common';
import { task as Task } from '@prisma/client';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CONFIG } from '../../config';
import { DatabaseService } from '../../database/database';
import { PageParam, RangeParam, TaskParam } from '../../config/validation';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private prisma: DatabaseService) {}

  getCount = (value: any, status: string): number => {
    const count: number = _.filter(value, { status }).reduce(
      (acc: any, curr: any) => (acc += curr.count),
      0,
    );
    return count;
  };

  // get task report with status wise count for given month range
  async getTaskReport(range: RangeParam): Promise<any> {
    const { startMonth, endMonth } = range;
    if (
      !moment(startMonth, 'YYYY-MM').isValid() ||
      !moment(endMonth, 'YYYY-MM').isValid()
    ) {
      throw new BadRequestException(
        'Invalid date value, value should be in YYYY-MM',
      );
    }

    let tasks = await this.prisma.task.groupBy({
      where: {
        AND: [
          {
            created_on: {
              gte: moment(startMonth, 'YYYY-MM').startOf('month').toISOString(),
            },
          },
          {
            modified_on: {
              lte: moment(endMonth, 'YYYY-MM').endOf('month').toISOString(),
            },
          },
        ],
      },
      by: ['status', 'modified_on'],
      _count: { _all: true },
      orderBy: [{ modified_on: 'asc' }],
    });

    tasks = tasks.map((task) => {
      task['month'] = moment(task.modified_on).format('MMMM YYYY');
      task['count'] = task._count._all;
      delete task.modified_on;
      delete task._count;
      return task;
    });
    const groupedTasks = _.groupBy(tasks, 'month');
    const response = [];
    Object.keys(groupedTasks).map((key) => {
      const value = groupedTasks[key];
      response.push({
        date: key,
        metrics: {
          open_tasks: this.getCount(value, CONFIG.STATUS.OPEN),
          inprogress_tasks: this.getCount(value, CONFIG.STATUS.IN_PROGRESS),
          completed_tasks: this.getCount(value, CONFIG.STATUS.COMPLETED),
        },
      });
    });

    return response;
  }

  // get all tasks with pagination
  async getAllTask(page: PageParam): Promise<Task[]> {
    const { pageSize, currentPage } = page;
    const tasks = await this.prisma.task.findMany({
      take: Number(pageSize),
      skip: Number(pageSize) * (currentPage - 1),
    });
    return tasks;
  }

  // get the task by id
  async getTask(id: number): Promise<Task | null> {
    return await this.prisma.task.findUnique({
      where: { id: Number(id) },
    });
  }

  // Fetch the user's data from the database
  async createTask(data: TaskParam): Promise<Task> {
    return this.prisma.task.create({
      data: {
        task: data.task,
        status: data.status || CONFIG.TASK.DEFAULT_STATUS,
      },
    });
  }

  // Update the task and status
  async updateTask(id: number, data: TaskParam): Promise<Task> {
    return this.prisma.task.update({
      where: { id: Number(id) },
      data: {
        task: data.task,
        status: data.status,
        modified_on: new Date().toISOString(),
      },
    });
  }

  // Delete the task by id
  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id: Number(id) } });
  }
}
