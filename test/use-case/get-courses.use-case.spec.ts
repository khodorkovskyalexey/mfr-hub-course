import { Test, TestingModule } from '@nestjs/testing';
import { GetCoursesUseCase } from '../../src/application/use-case';
import { CourseRepository, Id } from '../../src/domain';
import { courseRepositoryMock } from './mock/course.repository.mock';
import { CourseValidateDto } from './dto';
import { GetCoursesFilterDto } from '../../src/application/use-case/course/get-courses/get-courses.use-case.dto';

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
            new Array(5).fill(undefined).map((_, i) =>
                courseRepositoryMock.add({
                    id: Id.generate(),
                    coachId,
                    description: '',
                    name: '' + i,
                }),
            ),
        );
        await courseRepositoryMock.add({
            id: Id.generate(),
            coachId: Id.generate(),
            description: '',
            name: '0',
        });
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
