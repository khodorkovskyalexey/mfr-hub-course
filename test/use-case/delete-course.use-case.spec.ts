import { Test, TestingModule } from '@nestjs/testing';
import {
    DeleteCourseUseCase,
    DeleteCourseUseCaseDto,
} from '../../src/application/use-case';
import { Course, CourseRepository, Id } from '../../src/domain';
import { courseRepositoryMock } from './mock/course.repository.mock';

describe('DeleteCourseUseCase', () => {
    let useCase: DeleteCourseUseCase;
    let courseId: Id;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteCourseUseCase,
                { provide: CourseRepository, useValue: courseRepositoryMock },
            ],
        }).compile();

        useCase = app.get<DeleteCourseUseCase>(DeleteCourseUseCase);

        await courseRepositoryMock
            .add(
                Course.create({
                    name: 'Course',
                    description: '',
                    coachId: Id.generate(),
                }),
            )
            .then((course) => {
                courseId = course.unpack().id;
            });
    });

    it('must be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('success', async () => {
        try {
            await useCase.execute(new DeleteCourseUseCaseDto(courseId));
        } catch (error) {
            expect(false).toBeTruthy();
        }
    });

    it('failed try to delete already deleted course', async () => {
        const deleteCourse = () =>
            useCase.execute(new DeleteCourseUseCaseDto(courseId));
        expect(deleteCourse).rejects.toThrow(Error);
    });
});
