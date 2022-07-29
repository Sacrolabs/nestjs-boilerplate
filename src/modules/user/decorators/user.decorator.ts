import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities';

export const GetUserFromRequest = createParamDecorator(
  (data: string, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();

    if (!data) {
      return req.user;
    }

    return req.user ? req.user[data] : undefined;
  },
);
