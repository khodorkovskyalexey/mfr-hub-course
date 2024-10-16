import { Test, TestingModule } from '@nestjs/testing';
import { Course, CourseRepository, Id } from '../../src/domain';
import { DatabaseModule } from '../../src/infrastructure/database/database.module';
import { CourseValidateDto } from '../use-case/dto';

describe('CourseRepositoryImplementation', () => {
    let repository: CourseRepository;
    let course: Course;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule],
        }).compile();

        repository = app.get<CourseRepository>(CourseRepository);
        course = Course.create({
            name: 'Course1',
            description: '',
            coachId: Id.generate(),
        });
    });

    it('must be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('add', () => {
        it('success', async () => {
            const createdCourse = await repository.add(course);
            const courseId = course.unpack().id;

            expect(courseId.isEqual(createdCourse.unpack().id)).toBeTruthy();
            CourseValidateDto.validate(createdCourse);
        });
    });

    describe('get by id', () => {
        it('get by id', async () => {
            const courseId = course.unpack().id;

            const foundCourse = await repository.getById(courseId);
            const foundCourseId = foundCourse?.unpack().id;

            expect(foundCourse).not.toBeNull();
            expect(foundCourseId?.isEqual(courseId));
            CourseValidateDto.validate(foundCourse as Course);
        });

        it('get by non-existent id', async () => {
            const foundCourse = await repository.getById(Id.generate());
            expect(foundCourse).toBeNull();
        });
    });

    describe('get list', () => {
        const coachId = Id.generate();
        beforeAll(async () => {
            const courses = new Array(4).fill(undefined).map((_, i) =>
                Course.create({
                    name: 'Course' + (i + 1),
                    description: '',
                    coachId,
                }),
            );

            await Promise.all(courses.map((course) => repository.add(course)));
        });

        it('get all courses', async () => {
            const courses = await repository.get();
            expect(courses.length).toBe(5);
            courses.forEach((course) => CourseValidateDto.validate(course));
        });

        it('get course by name', async () => {
            const courses = await repository.get({ name: 'Course1' });
            expect(courses.length).toBe(2);
        });

        it('get course by coachId', async () => {
            const courses = await repository.get({ coachId });
            expect(courses.length).toBe(4);
        });

        it('get course with notIds', async () => {
            const courseId = course.unpack().id;
            const courses = await repository.get({ notIds: [courseId] });
            expect(courses.length).toBe(4);
        });

        it('get course with limit', async () => {
            const courses = await repository.get({}, { limit: 3 });
            expect(courses.length).toBe(3);
        });
    });

    describe('update', () => {
        it('success', async () => {
            const { id, name, coachId } = course.unpack();
            const data = new Course({
                id,
                name,
                description: 'New description',
                coachId,
                practices: [],
            });

            const updatedCourse = await repository.update(data);
            const { id: updatedId, description: updatedDescription } =
                updatedCourse.unpack();

            expect(id.isEqual(updatedId)).toBeTruthy();
            expect(updatedDescription).toBe('New description');
            CourseValidateDto.validate(updatedCourse);
        });

        it('wrong id', async () => {
            const data = Course.create({
                name: '',
                description: '',
                coachId: Id.generate(),
            });

            expect(() => repository.update(data)).rejects.toThrow(Error);
        });
    });

    describe('delete', () => {
        it('success', async () => {
            const courseId = course.unpack().id;
            await repository.delete(courseId);
            // check that course is deleted
            const data = await repository.getById(courseId);
            expect(data).toBeNull();
        });

        it('wrong id', async () => {
            expect(() => repository.delete(Id.generate())).rejects.toThrow(
                Error,
            );
        });
    });
});
