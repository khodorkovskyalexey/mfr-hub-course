import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../src/infrastructure/auth/port/auth.guard';
import { AuthModule } from '../../src/infrastructure/auth/auth.module';
import { HttpService } from '../../src/infrastructure/http';
import { httpServiceMock } from './mock/http.service.mock';
import { ConfigModule, ConfigService } from '../../src/infrastructure/config';
import { configServiceMock } from './mock/config.service.mock';
import { ExecutionContext } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { executionContextMock } from './mock/execution-context.mock';

describe('AuthGuard', () => {
    let guard: AuthGuard;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                ConfigModule.forRoot({ useValue: { configPath: '' } }),
            ],
        })
            .overrideProvider(HttpService)
            .useValue(httpServiceMock)
            .overrideProvider(ConfigService)
            .useValue(configServiceMock)
            .compile();

        guard = app.get<AuthGuard>(AuthGuard);
    });

    it('must be defined', () => {
        expect(guard).toBeDefined();
    });

    it('success', async () => {
        const res = await guard.canActivate(
            executionContextMock(true) as ExecutionContext,
        );

        if (typeof res === 'boolean') {
            expect(res).toBe(true);
        } else {
            expect(await firstValueFrom(res)).toBe(true);
        }
    });

    it('403 forbidden', async () => {
        const res = await guard.canActivate(
            executionContextMock(false) as ExecutionContext,
        );

        if (typeof res === 'boolean') {
            expect(res).toBe(false);
        } else {
            expect(await firstValueFrom(res)).toBe(false);
        }
    });
});
