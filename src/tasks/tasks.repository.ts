import { EntityRepository, Repository } from "typeorm";
import { User } from "./../auth/user.entity";
import { GetTasksFilterDto } from "./dto/GetTasksFilterDto";
import { TaskDTO } from "./dto/TaskDTO";
import { Task } from "./task.entity";
import { getRepository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

//@EntityRepository(TasksRepository)
@Injectable()
export class TasksRepository extends Repository<Task> {
    
    constructor(
        @InjectRepository(Task)
          repository: Repository<Task>
      ) {
        super(repository.target, repository.manager, repository.queryRunner);
      }
    async getTasks(filterDto:GetTasksFilterDto, user:User): Promise<Task[]>{
        const query = this.createQueryBuilder('task');
        const {name} = filterDto;
        query.where({user});
        if(name){
            query.andWhere('task.name= :name',{name});
        }
        const tasks = await query.getMany();
        return tasks;
    }
    
    async createTask(taskDTO:TaskDTO,user: User): Promise<Task>{
        const {id, name} =taskDTO;

        const task = this.create({
            id,
            name,
            user
        });

        await this.save(task);
        return task;
    }
}