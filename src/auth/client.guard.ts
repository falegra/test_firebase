import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Roles } from "src/common/enum/roles.enum";
import { HelpersService } from "src/helpers/helpers.service";
import { UserModel } from "src/user/model/user.model";
import { UserService } from "src/user/user.service";

@Injectable()
export class ClientGuard implements CanActivate {
    constructor (
        private readonly userService: UserService,
        private readonly helpersService: HelpersService,
        private readonly userModel: UserModel
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        if(!token) {
            throw new HttpException('', 460);
        }

        try {
            const payload = this.helpersService.verify_token(token);
            const userDb = await this.userModel.getBy('email', payload['key'].email);

            if(!userDb) {
                throw new HttpException('', 424);
            }

            if(userDb.role !== Roles.CLIENT && userDb.role !== Roles.ADMIN) {
                throw new UnauthorizedException();
            }

            request.user = payload['key'];
        } catch (error) {
            throw new UnauthorizedException();
        }

        return true;
    }
}