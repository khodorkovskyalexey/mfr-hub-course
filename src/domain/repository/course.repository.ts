import { Course } from '../entity';
import { Id } from '../id';

export interface GetCourseFilter {
    coachId?: Id;
    name?: string;
    notIds?: Id[];
}

export interface GetCourseOptions {
    limit?: number;
}

export abstract class CourseRepository {
    abstract add(course: Course): Promise<Course>;
    abstract getById(id: Id): Promise<Course | null>;
    abstract get(
        filter?: GetCourseFilter,
        options?: GetCourseOptions,
    ): Promise<Course[]>;
    abstract update(course: Course): Promise<Course>;
    abstract delete(id: Id): Promise<void>;
}
