import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { TaskDTO } from './dto/TaskDTO';

@Injectable()
export class TasksService {
  private  tasks:Task[]=[];
  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id:string):Task{
    return this.tasks.find(task => task.id === id);
  }

  createTask(taskDTO: TaskDTO): Task{
    const {id,name} = taskDTO;
    const task = {
      id: id,
      name:name
    }
    this.tasks.push(task);
    return task;
  }

  deleteTask(id:string){
    this.tasks=this.tasks.filter(task => task.id !== id);
  }

  updateTask(id:string,status:string): Task{
    const task= this.tasks.find(task => task.id ===id);
    task.name= status;
    return task;
  }
}
