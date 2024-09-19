import { Course, Id } from '../../../../domain';
import { CourseOrmEntity } from './course.orm-entity';

export class CourseMapper {
    static toOrmEntity(course: Course): CourseOrmEntity {
        const { id, name, description, coachId } = course.unpack();

        const ormCourse = new CourseOrmEntity(
            id.value,
            name,
            description,
            coachId.value,
        );

        return ormCourse;
    }

    static toDomainEntity(ormCourse: CourseOrmEntity): Course {
        const course = new Course(
            new Id(ormCourse.id),
            ormCourse.name,
            ormCourse.description,
            new Id(ormCourse.coachId),
        );

        return course;
    }
}
