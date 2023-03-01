import { Body, Controller, Delete, Get, Post , Patch , Param } from '@nestjs/common';
import { TaskDTO } from './dto/TaskDTO';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(){
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Body('id') id:string){
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() taskDTO: TaskDTO){
    return this.tasksService.createTask(taskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string){
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(@Body('status') status:string, @Param('id') id:string){
    return this.tasksService.updateTask(id , status);
  }
}
