import { Test, TestingModule } from '@nestjs/testing';
import {
    GetCourseByIdUseCase,
    GetCourseByIdUseCaseDto,
} from '../../src/application/use-case';
import { Course, CourseRepository, Id, Practice, Url } from '../../src/domain';
import { courseRepositoryMock } from './mock/course.repository.mock';
import { CourseValidateDto } from './dto';

describe('GetCourseByIdUseCase', () => {
    let useCase: GetCourseByIdUseCase;
    const courseId = Id.generate();

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                GetCourseByIdUseCase,
                { provide: CourseRepository, useValue: courseRepositoryMock },
            ],
        }).compile();

        useCase = app.get<GetCourseByIdUseCase>(GetCourseByIdUseCase);

        await courseRepositoryMock.add(
            new Course({
                id: courseId,
                name: '0',
                description: '',
                coachId: Id.generate(),
                practices: [
                    new Practice({
                        id: Id.generate(),
                        name: 'Practice1',
                        description: '',
                        url: new Url('www.mfr.hub/1'),
                    }),
                    new Practice({
                        id: Id.generate(),
                        name: 'Practice2',
                        description: '',
                        url: new Url('www.mfr.hub/2'),
                    }),
                ],
            }),
        );
    });

    it('must be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('success', async () => {
        const course = await useCase.execute(
            new GetCourseByIdUseCaseDto(courseId),
        );
        expect(course).not.toBeNull();
        expect(course.unpack().practices.length).toBe(2);
        CourseValidateDto.validate(course as Course);
    });

    it('bad id', async () => {
        const dto = new GetCourseByIdUseCaseDto(Id.generate());
        expect(() => useCase.execute(dto)).rejects.toThrow(Error);
    });
});
