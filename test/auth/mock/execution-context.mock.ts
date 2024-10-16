import { ExecutionContext } from '@nestjs/common';
import { Id } from '../../../src/domain';

export const executionContextMock = (isSuccess: boolean = true) =>
    ({
        switchToHttp: () => ({
            getRequest: () => ({
                headers: {
                    authorization: `Bearer ${isSuccess ? 'good' : 'bad'}`,
                },
                user: { id: new Id(1), name: 'terminator' },
            }),
        }),
    }) as ExecutionContext;
