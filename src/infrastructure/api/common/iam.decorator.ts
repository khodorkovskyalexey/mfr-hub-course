import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser, IdDto } from '../../auth/types';

export const IAM = createParamDecorator(
    (
        data: keyof AuthUser,
        ctx: ExecutionContext,
    ): AuthUser | AuthUser[keyof AuthUser] => {
        const { user: _userData } = ctx.switchToHttp().getRequest() as {
            user: AuthUser;
        };

        const user: AuthUser = { id: new IdDto(1), name: 'terminator' }; // TODO: убрать мок
        return data ? user[data] : user;
    },
);
