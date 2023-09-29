import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { task as Task } from '@prisma/client';
import { TaskService } from '../service/task.service';

import { ApiOperation } from '@nestjs/swagger';
import * as moment from 'moment';
import { CONFIG } from '../../config';
import {
  IdParam,
  PageParam,
  RangeParam,
  TaskParam,
} from '../../config/validation';

@Controller('api/v1/task')
export class TaskController {
  startMonth: string = moment()
    .subtract(CONFIG.TASK.DEFAULT_BACK_DAY, 'days')
    .startOf('month')
    .format('YYYY-MM');
  endMonth: string = moment().endOf('month').format('YYYY-MM');

  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Get Task Report by Status and Month wise count' })
  @ApiException(() => BadRequestException)
  @Get('/report')
  async getTaskReport(
    @Query() range: RangeParam = new RangeParam(this.startMonth, this.endMonth),
  ): Promise<Task[]> {
    return this.taskService.getTaskReport(range);
  }

  @ApiOperation({ summary: 'Get All Tasks by pagination' })
  @Get()
  @ApiException(() => BadRequestException)
  async getAllTask(
    @Query()
    page: PageParam = new PageParam(
      CONFIG.TASK.DEFAULT_PAGE_SIZE,
      CONFIG.TASK.DEFAULT_CURRENT_PAGE,
    ),
  ): Promise<Task[]> {
    return this.taskService.getAllTask(page);
  }

  @ApiOperation({ summary: 'Get Task by id' })
  @ApiException(() => NotFoundException, {
    description: 'Task could not be found',
  })
  @ApiException(() => BadRequestException)
  @Get(':id')
  async getTask(@Param() params: IdParam): Promise<Task | null> {
    const task = await this.taskService.getTask(params.id);
    if (!!task) return task;
    else throw new NotFoundException();
  }

  @ApiOperation({ summary: 'Create Task' })
  @Post()
  async createTask(@Body() data: TaskParam): Promise<Task> {
    return this.taskService.createTask(data);
  }

  @ApiOperation({ summary: 'Update Task by id' })
  @ApiException(() => NotFoundException, {
    description: 'Task could not be found',
  })
  @ApiException(() => BadRequestException)
  @Put(':id')
  async Update(
    @Param() params: IdParam,
    @Body() data: TaskParam,
  ): Promise<Task> {
    return this.taskService.updateTask(params.id, data).catch((err) => {
      if (err.code == 'P2025') throw new NotFoundException();
      else throw err;
    });
  }

  @ApiOperation({ summary: 'Delete Task by id' })
  @ApiException(() => NotFoundException, {
    description: 'Task could not be found',
  })
  @ApiException(() => BadRequestException)
  @Delete(':id')
  async Delete(@Param() params: IdParam): Promise<Task> {
    return await this.taskService.deleteTask(params.id).catch((err) => {
      if (err.code == 'P2025') throw new NotFoundException();
      else throw err;
    });
  }
}

// throw new HttpException({
//   message: err.message
// }, HttpStatus.BAD_REQUEST);
