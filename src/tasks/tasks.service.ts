import { Inject, Injectable, Logger } from '@nestjs/common';
import { TaskDTO } from './dto/TaskDTO';
import { NotFoundException } from '@nestjs/common/exceptions';
import { GetTasksFilterDto } from './dto/GetTasksFilterDto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Testclass } from './task-status.enum';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository
  ){}

  async getTasks(filterDto:GetTasksFilterDto, user:User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number): Promise<Task>{
    this.logger.log(`${id}}`);
    const found = await this.tasksRepository.findOne(
      {
        where: {
          id: id,
        },
    }
    );
    this.logger.log(`${found}`);
    if(!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }

    return found;
  }

  async createtask(task:TaskDTO, user: User): Promise<Task>{
    this.logger.log(`${task.name} + ${task.id}`);
    return this.tasksRepository.createTask(task,user);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id:number, status: Testclass):Promise<Task>{
    const task =await this.getTaskById(id);
     task.name = status;
     await this.tasksRepository.save(task);
    return task;
  }
}
