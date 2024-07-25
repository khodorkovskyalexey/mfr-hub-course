import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../src/infrastructure/config/port/config.service';
import { configServiceMock } from './mock/config.service.mock';
import { copyFileSync, truncateSync, unlinkSync } from 'fs';
import { join } from 'path';

describe('ConfigService', () => {
    const envPath = {
        test: join(process.cwd(), '.env.test'),
        example: join(process.cwd(), '.env.example'),
    };

    const initConfigService = async (path: string) => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: ConfigService,
                    useFactory: () => configServiceMock(path),
                },
            ],
        }).compile();

        return module.get<ConfigService>(ConfigService);
    };

    beforeAll(() => {
        // mock config file
        copyFileSync(envPath.example, envPath.test);
    });

    afterAll(() => {
        unlinkSync(envPath.test);
    });

    it('should be defined', async () => {
        const service = await initConfigService('.env.test');
        expect(service).toBeDefined();
    });

    it('empty config', async () => {
        truncateSync(envPath.test);
        expect(initConfigService('.env.test')).rejects.toThrow(Error);
    });

    it('bad config path', async () => {
        expect(initConfigService('.bad_env')).rejects.toThrow(Error);
    });
});
