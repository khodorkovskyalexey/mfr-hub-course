import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ApiModule } from '../../src/infrastructure/api/api.module';
import { mockProviders } from './mock';
import { SuccessResponseDto } from '../../src/infrastructure/api/common';
import { AuthModule } from '../../src/infrastructure/auth/auth.module';
import { axiosGetMock } from '../http/mock/axios-get.mock';

describe('PracticeController', () => {
    let app: INestApplication;
    const courseId = 1;

    beforeAll(async () => {
        const builder = Test.createTestingModule({
            imports: [ApiModule, AuthModule],
        });

        mockProviders.forEach(({ provider, mock }) => {
            builder.overrideProvider(provider).useValue(mock);
        });

        app = (await builder.compile()).createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
            }),
        );

        await app.init();

        axiosGetMock((_, config) => {
            return {
                status: 200,
                data: {
                    id: 1,
                    username: 'terminator',
                },
                config: { headers: config?.headers },
            };
        });
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /courses/:id/practices', () => {
        it('success create', async () => {
            const dto = {
                name: '1',
                description: '',
                url: 'www.mfr.hub',
            };

            return request(app.getHttpServer())
                .post('/courses/' + courseId + '/practices')
                .send(dto)
                .expect(201)
                .expect((res) => {
                    expect(res.body).toEqual(new SuccessResponseDto());
                });
        });

        it('validation failed', async () => {
            const dto = {
                name: 1,
                description: 1,
                url: 1,
            };

            return request(app.getHttpServer())
                .post('/courses/' + courseId + '/practices')
                .send(dto)
                .expect(400)
                .expect((res) => {
                    expect(res.body.message?.length).toBe(3);
                });
        });
    });
});
