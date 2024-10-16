import { Test, TestingModule } from '@nestjs/testing';
import {
    UpdateCourseUseCase,
    UpdateCourseUseCaseDto,
} from '../../src/application/use-case';
import { Course, CourseRepository, Id } from '../../src/domain';
import { courseRepositoryMock } from './mock/course.repository.mock';
import { CourseValidateDto } from './dto';

describe('UpdateCourseUseCase', () => {
    let useCase: UpdateCourseUseCase;
    let courseId: Id;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateCourseUseCase,
                { provide: CourseRepository, useValue: courseRepositoryMock },
            ],
        }).compile();

        useCase = app.get<UpdateCourseUseCase>(UpdateCourseUseCase);

        const coachId = Id.generate();

        await Promise.all(
            new Array(2).fill(undefined).map((_, i) =>
                courseRepositoryMock.add(
                    Course.create({
                        name: '' + i,
                        description: '',
                        coachId,
                    }),
                ),
            ),
        ).then((res) => {
            courseId = (res[0] as Course).unpack().id;
        });
    });

    it('must be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('success', () => {
        it('name', async () => {
            const dto = new UpdateCourseUseCaseDto(courseId, {
                name: 'new name',
            });

            const course = await useCase.execute(dto);
            CourseValidateDto.validate(course);
            expectIfCourseIdEqual(course, courseId);
        });

        it('description', async () => {
            const dto = new UpdateCourseUseCaseDto(courseId, {
                description: 'new description',
            });

            const course = await useCase.execute(dto);
            CourseValidateDto.validate(course);
            expectIfCourseIdEqual(course, courseId);
        });

        it('all fields', async () => {
            const dto = new UpdateCourseUseCaseDto(courseId, {
                name: 'new name2',
                description: 'new description',
            });

            const course = await useCase.execute(dto);
            CourseValidateDto.validate(course);
            expectIfCourseIdEqual(course, courseId);
            expect(course.unpack().practices.length).toBe(0);
        });
    });

    it('bad id', async () => {
        const dto = new UpdateCourseUseCaseDto(Id.generate(), { name: '' });
        expect(() => useCase.execute(dto)).rejects.toThrow(Error);
    });

    it('updated course already exist', async () => {
        const dto = new UpdateCourseUseCaseDto(courseId, { name: '1' });
        expect(() => useCase.execute(dto)).rejects.toThrow(Error);
    });
});

function expectIfCourseIdEqual(course: Course, id: Id): void {
    expect(id.isEqual(course.unpack().id)).toBeTruthy();
}
