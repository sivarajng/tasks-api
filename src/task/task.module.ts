import { Module } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { TaskController } from './controller/task.controller';
import { DatabaseService } from '../database/database';

@Module({
  providers: [TaskService, DatabaseService],
  controllers: [TaskController],
})
export class TaskModule {}
