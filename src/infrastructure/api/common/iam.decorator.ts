import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../../auth/types';

export const IAM = createParamDecorator(
    (
        data: keyof AuthUser,
        ctx: ExecutionContext,
    ): AuthUser | AuthUser[keyof AuthUser] => {
        const { user } = ctx.switchToHttp().getRequest() as {
            user: AuthUser;
        };

        return data ? user[data] : user;
    },
);
