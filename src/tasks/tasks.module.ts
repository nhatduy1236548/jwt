import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task
    ])
  ],
  providers: [TasksService,TasksRepository],
  controllers: [TasksController],
})
export class TasksModule {}
