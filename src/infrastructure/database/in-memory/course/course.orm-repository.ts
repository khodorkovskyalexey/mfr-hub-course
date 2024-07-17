import { Injectable } from '@nestjs/common';
import {
    Course,
    CourseRepository,
    GetCourseFilter,
    GetCourseOptions,
    Id,
} from '../../../../domain';
import { CourseMapper } from './course.mapper';
import { InMemoryDatabase } from '../in-memory.database';
import { CourseOrmEntity } from './course.orm-entity';

@Injectable()
export class CourseOrmRepository extends CourseRepository {
    add(course: Course): Promise<Course> {
        return new Promise((resolve) => {
            const dataLength = InMemoryDatabase.data.push(
                CourseMapper.toOrmEntity(course),
            );

            resolve(
                CourseMapper.toDomainEntity(
                    InMemoryDatabase.data[dataLength - 1],
                ),
            );
        });
    }

    getById(id: Id): Promise<Course | null> {
        return new Promise((resolve) => {
            const index = InMemoryDatabase.data.findIndex(
                (ormCourse) => ormCourse.id === id.value,
            );

            if (index < 0) {
                resolve(null);
            }

            resolve(CourseMapper.toDomainEntity(InMemoryDatabase.data[index]));
        });
    }

    get(
        filter: GetCourseFilter = {},
        options: GetCourseOptions = {},
    ): Promise<Course[]> {
        return new Promise((resolve) => {
            const data: CourseOrmEntity[] = [];

            let i: number = 0;
            const whileLimit = () =>
                options.limit == null ||
                options.limit < 0 ||
                data.length < options.limit;

            while (whileLimit() && InMemoryDatabase.data.length > i) {
                const ormCourse = InMemoryDatabase.data[i];
                i++;
                if (
                    (!filter.name || filter.name === ormCourse.name) &&
                    (!filter.coachId ||
                        filter.coachId.value === ormCourse.coachId)
                ) {
                    data.push(ormCourse);
                }
            }

            resolve(data.map(CourseMapper.toDomainEntity));
        });
    }

    update(course: Course): Promise<Course> {
        return new Promise((resolve, reject) => {
            const index = InMemoryDatabase.data.findIndex(
                (ormCourse) => ormCourse.id === course.id.value,
            );

            if (index < 0) {
                reject(new Error('Course not found'));
            }

            InMemoryDatabase.data[index] = CourseMapper.toOrmEntity(course);

            resolve(CourseMapper.toDomainEntity(InMemoryDatabase.data[index]));
        });
    }

    delete(id: Id): Promise<void> {
        return new Promise((resolve, reject) => {
            const index = InMemoryDatabase.data.findIndex(
                (ormCourse) => ormCourse.id === id.value,
            );

            if (index < 0) {
                reject(new Error('Course not found'));
            }

            InMemoryDatabase.data.splice(index, 1);
            resolve();
        });
    }
}
