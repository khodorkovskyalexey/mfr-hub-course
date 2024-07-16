import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateCourseUseCase } from '../../src/application/use-case';
import { Id } from '../../src/domain';
import { ApiModule } from '../../src/infrastructure/api/api.module';
import { CourseResponseDto } from '../../src/infrastructure/api/course/dto/course.response.dto';
import { createCourseUseCaseMock } from './mocks/create-course.use-case.mock';

describe('Cats', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ApiModule],
        })
            .overrideProvider(CreateCourseUseCase)
            .useValue(createCourseUseCaseMock)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());

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
                    expect(res.body.message?.length).toBe(4);
                });
        });
    });
});
