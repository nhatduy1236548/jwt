import { Body, Controller, Query, Delete, Get, Post , Patch , Param, ParseIntPipe, ValidationPipe, Logger, UsePipes } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/GetTasksFilterDto';
import { TaskDTO } from './dto/TaskDTO';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { ConvertPipe } from './pipes/ConvertPipe';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksService.name);
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id:number): Promise<Task> 
  {
    return this.tasksService.getTaskById(id);  
  }

  @Post()
  //@UsePipes(new ConvertPipe())
  createTask(@Body() taskDTO:TaskDTO,
            @GetUser() user:User): Promise<Task>
  {
    this.logger.log(`${taskDTO.id}+${taskDTO.name}+${user}`);
    return this.tasksService.createtask(taskDTO,user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:number):Promise<void>{
    return this.tasksService.deleteTask(id);
  }

  @Get()
  getTasks(@Query() filterDto:GetTasksFilterDto,
          @GetUser() user:User ): Promise<Task[]>{
    return this.tasksService.getTasks(filterDto, user);
  }
}
