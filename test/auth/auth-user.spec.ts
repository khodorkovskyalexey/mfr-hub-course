import { plainToClass } from 'class-transformer';
import { AuthUser } from '../../src/infrastructure/auth/types';
import { validateSync } from 'class-validator';

describe('AuthUser', () => {
    it('success', () => {
        const user = {
            id: 1,
            username: 'terminator_79',
        };

        const data = plainToClass(AuthUser, user, {
            excludeExtraneousValues: true,
        });

        const errors = validateSync(data, {
            enableDebugMessages: true,
            skipMissingProperties: false,
            forbidUnknownValues: true,
        });

        expect(errors.length).toBe(0);
    });

    it('failed', () => {
        const user = {};

        const data = plainToClass(AuthUser, user, {
            excludeExtraneousValues: true,
        });

        const errors = validateSync(data, {
            enableDebugMessages: true,
            skipMissingProperties: false,
            forbidUnknownValues: true,
        });

        expect(errors.length).toBe(2);
    });
});
