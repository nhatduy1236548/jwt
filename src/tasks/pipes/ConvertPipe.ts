import { ArgumentMetadata, Injectable, Logger, PipeTransform } from "@nestjs/common";
import { User } from "./../../auth/user.entity";
import { TaskDTO } from "./../dto/TaskDTO";

@Injectable()
export class ConvertPipe implements PipeTransform<any> {
  private readonly logger = new Logger(ConvertPipe.name);
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const result = new TaskDTO();
    this.logger.log(`${value.username}`)
    // can of course contain more sophisticated mapping logic
    let num:number = value.id;
    value.id = num;
    return value; 
  }
}