import { Test, TestingModule } from '@nestjs/testing';
import {
    GetCoursesFilterDto,
    GetCoursesUseCase,
} from '../../src/application/use-case';
import { Course, CourseRepository, Id } from '../../src/domain';
import { courseRepositoryMock } from './mock/course.repository.mock';
import { CourseValidateDto } from './dto';

describe('GetCoursesUseCase', () => {
    let useCase: GetCoursesUseCase;
    const coachId = Id.generate();

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                GetCoursesUseCase,
                { provide: CourseRepository, useValue: courseRepositoryMock },
            ],
        }).compile();

        useCase = app.get<GetCoursesUseCase>(GetCoursesUseCase);

        await Promise.all(
            new Array(5)
                .fill(undefined)
                .map((_, i) =>
                    courseRepositoryMock.add(
                        new Course(Id.generate(), '' + i, '', coachId),
                    ),
                ),
        );
        await courseRepositoryMock.add(
            new Course(Id.generate(), '0', '', Id.generate()),
        );
    });

    it('must be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('without filters', async () => {
        const courses = await useCase.execute();
        expect(courses.length).toBe(6);
        courses.forEach((course) => CourseValidateDto.validate(course));
    });

    it('filter by coachId', async () => {
        const courses = await useCase.execute(new GetCoursesFilterDto(coachId));
        expect(courses.length).toBe(5);
        courses.forEach((course) => CourseValidateDto.validate(course));
    });

    it('empty response', async () => {
        const courses = await useCase.execute(
            new GetCoursesFilterDto(Id.generate()),
        );
        expect(courses.length).toBe(0);
    });
});
