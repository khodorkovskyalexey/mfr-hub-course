import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../src/infrastructure/config/port/config.service';
import { copyFileSync, truncateSync, unlinkSync } from 'fs';
import { join } from 'path';
import { ConfigModule } from '../../src/infrastructure/config';
import {
    CONFIG_OPTIONS,
    ConfigOptions,
} from '../../src/infrastructure/config/types';

describe('ConfigService', () => {
    let app: TestingModule;
    const envPath = {
        test: join(process.cwd(), '.env.test'),
        example: join(process.cwd(), '.env.example'),
    };

    const initConfigService = async (
        configPath: string,
        initOptionsType: 'useValue' | 'useFactory' | 'empty' = 'useValue',
    ) => {
        const options = {
            useValue:
                initOptionsType === 'useValue' ? { configPath } : undefined,
            useFactory:
                initOptionsType === 'useFactory'
                    ? () => ({ configPath })
                    : undefined,
        };
        app = await Test.createTestingModule({
            imports: [ConfigModule.forRoot(options)],
        }).compile();

        return app.get<ConfigService>(ConfigService);
    };

    beforeEach(() => {
        // mock config file
        copyFileSync(envPath.example, envPath.test);
    });

    afterAll(() => {
        unlinkSync(envPath.test);
    });

    describe('check file opening', () => {
        it('success open and validate', async () => {
            const service = await initConfigService('.env.test');
            const options = app.get<ConfigOptions>(CONFIG_OPTIONS);
            expect(service).toBeDefined();
            expect(options.configPath).toBe('.env.test');
        });

        it('empty config', async () => {
            truncateSync(envPath.test);
            expect(initConfigService('.env.test')).rejects.toThrow(Error);
        });

        it('bad config path', async () => {
            expect(initConfigService('.bad_env')).rejects.toThrow(Error);
        });
    });

    describe('check module init', () => {
        it('useValue', async () => {
            const service = await initConfigService('.env.test', 'useValue');
            expect(service).toBeDefined();
        });

        it('useFactory', async () => {
            const service = await initConfigService('.env.test', 'useFactory');
            expect(service).toBeDefined();
        });

        it('without option implementation', async () => {
            expect(initConfigService('.env.test', 'empty')).rejects.toThrow(
                Error,
            );
        });
    });
});
