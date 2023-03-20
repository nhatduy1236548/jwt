import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UsersRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: 'smtp.sendgrid.net',
      auth: {
        user: 'nguyenvannhatduy1236548@gmail.com',
        pass: '1236548nhatduy',
      },
    }
  }),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersRepository,JwtStrategy],
  exports:   [JwtStrategy, PassportModule],
})
export class AuthModule {}
