import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from '../service/task.service';
import { DatabaseService } from '../../database/database';
import { IdParam } from '../../config/validation';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, DatabaseService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get Tasks', () => {
    it('get tasks all', async () => {
      const response = await controller.getAllTask();
      expect(response.length).toBeGreaterThanOrEqual(0);
    });
    it('get tasks paginated', async () => {
      const response = await controller.getAllTask();
      expect(response.length).toBeLessThanOrEqual(10);
    });
    it('get task with non-existent id', async () => {
      try {
        const idParam: IdParam = new IdParam(9999999);
        await controller.getTask(idParam);
      } catch (e) {
        expect(e.status).toEqual(404);
      }
    });
  });

  describe('Task Updates', () => {
    it('create and delete task', async () => {
      const payload = { task: 'test' } as any;
      const response = await controller.createTask(payload);
      expect(response['status']).toEqual('OPEN');
      expect(response['task']).toEqual('test');

      const idParam: IdParam = new IdParam(response['id']);
      const deleteResponse = await controller.Delete(idParam);
      expect(deleteResponse['id']).toEqual(response['id']);
    });
  });
});
