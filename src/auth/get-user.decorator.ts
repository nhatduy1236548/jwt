import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator(
    (_data, ctx: ExecutionContext): User =>{
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    }
);

// export const GetUser = createParamDecorator(
//     (_data, ctx: ExecutionContext): User => {
//       const req = ctx.switchToHttp().getRequest();
//       const authHeader = req.headers.authorization;
  
//       if (!authHeader) {
//         throw new UnauthorizedException('Authorization header not found');
//       }
  
//       const [bearer, token] = authHeader.split(' ');
  
//       if (bearer !== 'Bearer' || !token) {
//         throw new UnauthorizedException('Invalid authorization header');
//       }
  
//       try {
//         const payload = jwt.verify(token, process.env.JWT_SECRET);
//         return payload;
//       } catch (error) {
//         throw new UnauthorizedException('Invalid token');
//       }
//     },
//   );