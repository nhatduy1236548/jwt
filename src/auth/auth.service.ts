import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './user.entity';
import * as bcrypt from "bcrypt";
import { NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtPayload } from './jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
       @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
        private jwtService: JwtService,
        private mailService: MailerService
    ){}

    async signup(authCredentialDto:AuthCredentialsDto): Promise<User>
    {
        return this.usersRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        this.logger.log(`${authCredentialDto.username} `+ `${authCredentialDto.password}`);
        const {username, password } = authCredentialDto;
        const user = await this.usersRepository.findOne({
            where: {
              username,
            },
        });
        this.logger.log(`${user.username}`);
        if (user && (await bcrypt.compare(password, user.password))){
            const payload:JwtPayload = {username};
            const accessToken: string = await this.jwtService.sign(payload);
            this.logger.log(accessToken);
            return { accessToken};
        }else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }

    async resetPassword(email: string, username: string): Promise<void> {
        const user = await this.findByUser(username);

        if(!user) {
            throw new NotFoundException('User not found');
        }

        const newPassword: string = await this.generatePassword();
        this.logger.log(`${newPassword}`);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        this.logger.log(`${hashedPassword}`);
        await this.updatePassword(user.id,hashedPassword);
        this.logger.log(`sucess`);
        //await this.sendResetPasswordEmail(email, newPassword);
    }
    sendResetPasswordEmail(email: string, newPassword: string) {
             this.mailService.sendMail({
                to: email,
                from: "nguyenvannhatduy1236548@gmail.com",
                subject: 'Plain Text Email ✔',
                text: `Changed password: ${newPassword} from the system`, 
               });
          
    }
    async updatePassword(id: number, hashedPassword: string): Promise<User> {
        const user = await this.getUserById(id);
        user.password = hashedPassword;
        await this.usersRepository.save(user);
       return user;
    }
    getUserById(id: number): Promise<User> {
        return this.usersRepository.findOne({
            where: {id}
        });
    }
    generatePassword(): string {
        return Math.random().toString(36).slice(-8);
    }
    findByUser(username: string): Promise<User> {
        return this.usersRepository.findOne({
            where: {username}
        });
    }

    // async onModuleInit() {
    //     // Initialize the necessary settings for email delivery
    //     await this.mailService.sendMail({
    //       to: 'recipient@example.com',
    //       subject: 'Test email',
    //       text: 'This is a test email sent using NestJS',
    //     });
    //   }
}
