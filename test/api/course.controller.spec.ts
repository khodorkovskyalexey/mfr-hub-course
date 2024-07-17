import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Id } from '../../src/domain';
import { ApiModule } from '../../src/infrastructure/api/api.module';
import { createCourseUseCaseMock } from './mock/create-course.use-case.mock';
import { mockProviders } from './mock';
import { CourseResponseDto } from '../../src/infrastructure/api/course/dto';

describe('CourseController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const builder = Test.createTestingModule({
            imports: [ApiModule],
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
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /courses', () => {
        afterEach(() => {
            createCourseUseCaseMock.reset();
        });

        it('success create', async () => {
            const dto = {
                name: '1',
                description: '',
                coachId: Id.generate().value,
            };

            return request(app.getHttpServer())
                .post('/courses')
                .send(dto)
                .expect(201)
                .expect((res) => {
                    expect(res.body).toEqual(
                        CourseResponseDto.fromEntity(
                            createCourseUseCaseMock.execute({
                                ...dto,
                                coachId: new Id(dto.coachId),
                            }),
                        ),
                    );
                });
        });

        it('validation failed', async () => {
            const dto = {
                name: 1,
                description: 1,
                coachId: 'bad id',
            };

            return request(app.getHttpServer())
                .post('/courses')
                .send(dto)
                .expect(400)
                .expect((res) => {
                    expect(res.body.message?.length).toBe(3);
                });
        });
    });

    describe('GET /courses', () => {
        it('without filter', async () => {
            return request(app.getHttpServer())
                .get('/courses')
                .expect(200)
                .expect((res) => {
                    expect(res.body.length).toBe(1);
                });
        });

        it('success filter by coachId', async () => {
            return request(app.getHttpServer())
                .get('/courses?coachId=1')
                .expect(200)
                .expect((res) => {
                    expect(res.body.length).toBe(1);
                });
        });

        it('empty response from filter by coachId', async () => {
            return request(app.getHttpServer())
                .get('/courses?coachId=2')
                .expect(200)
                .expect((res) => {
                    expect(res.body.length).toBe(0);
                });
        });

        it('validation failed', async () => {
            return request(app.getHttpServer())
                .get('/courses?coachId=text')
                .expect(400)
                .expect((res) => {
                    expect(res.body.message?.length).toBe(1);
                });
        });
    });
});
