import { createParamDecorator, ExecutionContext } from '@nestjs/common';
//we dont use request directly in get fucntion bcoz its error prone
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
