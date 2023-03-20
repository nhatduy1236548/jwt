import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt.payload";
import { UsersRepository } from "./auth.repository";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { duplicate } from "./exception.utils";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    private readonly logger = new Logger(JwtStrategy .name);
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository:UsersRepository,
    ){
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: JwtPayload){
        const { username } = payload;
        const user: User = await this.usersRepository.findOne(
            {
                where: {
                    username,
                }
            }
        );
        this.logger.log(user);
        if(!user){
            duplicate();
        }

        return user;
    }
    
}