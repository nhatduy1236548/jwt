import { ConflictException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, ObjectLiteral, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { notpermited, serverError } from "./exception.utils";

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
    private readonly logger = new Logger(UsersRepository.name);

   async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        
        const {username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);

        this.logger.log(salt);
        this.logger.log(hashedPassword);

        const user:User = this.create({
            username : username,
            password : hashedPassword
        });

        try{
          await this.save(user);
        }catch (error){
          if (error.code === '23505') {
            notpermited('Username already exists');
          }else {
            serverError();
          }
          this.logger.log(error.code);
        }
        return user;
    }    
}