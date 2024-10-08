import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetTokenDecorator = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.token;
    }
);