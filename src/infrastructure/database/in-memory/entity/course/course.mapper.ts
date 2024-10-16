import { Course, Id } from '../../../../../domain';
import { PracticeMapper } from '../practice/practice.mapper';
import { CourseOrmEntity } from './course.orm-entity';

export class CourseMapper {
    static toOrmEntity(course: Course): CourseOrmEntity {
        const { id, name, description, coachId, practices } = course.unpack();

        const ormCourse = new CourseOrmEntity(
            id.value,
            name,
            description,
            coachId.value,
            practices.map(PracticeMapper.toOrmEntity),
        );

        return ormCourse;
    }

    static toDomainEntity(ormCourse: CourseOrmEntity): Course {
        const course = new Course({
            id: new Id(ormCourse.id),
            name: ormCourse.name,
            description: ormCourse.description,
            coachId: new Id(ormCourse.coachId),
            practices: ormCourse.practices.map(PracticeMapper.toDomainEntity),
        });

        return course;
    }
}
