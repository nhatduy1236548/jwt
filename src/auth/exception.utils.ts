import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

export const duplicate = () => {
    throw new UnauthorizedException();
};
export const notpermited = (message:string) => {
    throw new ConflictException(message);
};
export const serverError = () => {
    throw new InternalServerErrorException();
};