import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../src/infrastructure/config/port/config.service';
import { configServiceMock } from './mock/config.service.mock';
import { copyFileSync, unlinkSync, truncateSync, existsSync } from 'fs';
import { join } from 'path';

describe('ConfigService', () => {
    let originalConfigPath: string | undefined;
    const envPath = {
        test: join(process.cwd(), '.env.test'),
        example: join(process.cwd(), '.env.example'),
        default: join(process.cwd(), '.env'),
    };

    const initConfigService = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: ConfigService,
                    useFactory: configServiceMock,
                },
            ],
        }).compile();

        return module.get<ConfigService>(ConfigService);
    };

    beforeAll(() => {
        // mock config file
        originalConfigPath = process.env.CONFIG_PATH;
        process.env.CONFIG_PATH = '.env.test';
        copyFileSync(envPath.example, envPath.test);
    });

    afterAll(() => {
        process.env.CONFIG_PATH = originalConfigPath;
        unlinkSync(envPath.test);
    });

    it('should be defined', async () => {
        const service = await initConfigService();
        expect(service).toBeDefined();
    });

    it('empty config', async () => {
        truncateSync(envPath.test);
        expect(initConfigService).rejects.toThrow(Error);
    });

    it('bad config path', async () => {
        process.env.CONFIG_PATH = '.bad_env';
        expect(initConfigService).rejects.toThrow(Error);
    });

    describe('without process.env.CONFIG_PATH', () => {
        let isEnvCreated: boolean;

        beforeAll(() => {
            delete process.env.CONFIG_PATH;
            if (!existsSync(envPath.default)) {
                copyFileSync(envPath.example, envPath.default);
                isEnvCreated = true;
            }
        });

        afterAll(() => {
            if (isEnvCreated) {
                unlinkSync(envPath.default);
            }
        });

        it('should be defined', async () => {
            const service = await initConfigService();
            expect(service).toBeDefined();
        });
    });
});
