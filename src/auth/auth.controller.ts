import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './user.entity';

@Controller('auth')
//@UseGuards(AuthGuard())
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(private authService: AuthService){}

    @Post('/signup')
    signup(@Body() authCredentialsDto:AuthCredentialsDto):Promise<User> {
        return this.authService.signup(authCredentialsDto);      
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        this.logger.log(`123`);
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('pass')
    async resetPassword(@Body('email') email:string,
        @Body('username') username:string
    ): Promise<void> {
        await this.authService.resetPassword(email, username);
    }

    @Post('/test')
    test(@Req() req){
        console.log(req);
    }
}
