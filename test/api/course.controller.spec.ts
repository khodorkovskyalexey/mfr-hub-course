import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Course, Id } from '../../src/domain';
import { ApiModule } from '../../src/infrastructure/api/api.module';
import { mockIds, mockProviders } from './mock';
import { CourseResponseDto } from '../../src/infrastructure/api/course/dto';
import { SuccessResponseDto } from '../../src/infrastructure/api/common/success-response.dto';

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
        it('success create', async () => {
            const dto = {
                name: '1',
                description: '',
                coachId: mockIds.coachId.value,
            };

            return request(app.getHttpServer())
                .post('/courses')
                .send(dto)
                .expect(201)
                .expect((res) => {
                    expect(res.body).toEqual(
                        CourseResponseDto.fromEntity(
                            new Course(
                                mockIds.id,
                                dto.name,
                                dto.description,
                                new Id(dto.coachId),
                            ),
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
                    expect(res.body[0]).toEqual(
                        CourseResponseDto.fromEntity(
                            new Course(
                                mockIds.id,
                                mockIds.name,
                                mockIds.description,
                                mockIds.coachId,
                            ),
                        ),
                    );
                });
        });

        it('success filter by coachId', async () => {
            return request(app.getHttpServer())
                .get('/courses?coachId=1')
                .expect(200)
                .expect((res) => {
                    expect(res.body.length).toBe(1);
                    expect(res.body[0]).toEqual(
                        CourseResponseDto.fromEntity(
                            new Course(
                                mockIds.id,
                                mockIds.name,
                                mockIds.description,
                                mockIds.coachId,
                            ),
                        ),
                    );
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

    describe('GET /courses/:id', () => {
        it('success', async () => {
            return request(app.getHttpServer())
                .get(`/courses/${mockIds.id.value}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body).toEqual(
                        CourseResponseDto.fromEntity(
                            new Course(
                                mockIds.id,
                                mockIds.name,
                                mockIds.description,
                                mockIds.coachId,
                            ),
                        ),
                    );
                });
        });

        it('bad id validation failed', async () => {
            return request(app.getHttpServer())
                .get('/courses/bad_id')
                .expect(400)
                .expect((res) => {
                    expect(res.body.message?.length).toBe(1);
                });
        });
    });

    describe('PATCH /courses/:id', () => {
        it('success', async () => {
            const dto = {
                name: '1',
                description: '',
            };

            return request(app.getHttpServer())
                .patch(`/courses/${mockIds.id.value}`)
                .send(dto)
                .expect(200)
                .expect((res) => {
                    expect(res.body).toEqual(
                        CourseResponseDto.fromEntity(
                            new Course(mockIds.id, '1', '', mockIds.coachId),
                        ),
                    );
                });
        });

        it('bad id', async () => {
            const dto = {
                name: '1',
            };

            return request(app.getHttpServer())
                .patch('/courses/bad_id')
                .send(dto)
                .expect(400)
                .expect((res) => {
                    expect(res.body.message?.length).toBe(1);
                });
        });

        it('validation failed', async () => {
            const dto = {
                name: 1,
                description: 1,
            };

            return request(app.getHttpServer())
                .patch(`/courses/${mockIds.id.value}`)
                .send(dto)
                .expect(400)
                .expect((res) => {
                    expect(res.body.message?.length).toBe(2);
                });
        });
    });

    describe('DELETE /courses/:id', () => {
        it('success', async () => {
            return request(app.getHttpServer())
                .delete(`/courses/${mockIds.id.value}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body).toEqual(new SuccessResponseDto());
                });
        });

        it('bad id', async () => {
            return request(app.getHttpServer())
                .patch('/courses/bad_id')
                .expect(400)
                .expect((res) => {
                    expect(res.body.message?.length).toBe(1);
                });
        });
    });
});
