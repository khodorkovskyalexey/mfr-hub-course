import { Test, TestingModule } from '@nestjs/testing';
import {
    GetCourseByIdUseCase,
    GetCourseByIdUseCaseDto,
} from '../../src/application/use-case';
import { Course, CourseRepository, Id } from '../../src/domain';
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

        await courseRepositoryMock.add({
            id: courseId,
            coachId: Id.generate(),
            description: '',
            name: '0',
        });
    });

    it('must be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('success', async () => {
        const course = await useCase.execute(
            new GetCourseByIdUseCaseDto(courseId),
        );

        expect(course).not.toBeNull();
        CourseValidateDto.validate(course as Course);
    });

    it('bad id', async () => {
        const dto = new GetCourseByIdUseCaseDto(Id.generate());
        expect(() => useCase.execute(dto)).rejects.toThrow(Error);
    });
});
