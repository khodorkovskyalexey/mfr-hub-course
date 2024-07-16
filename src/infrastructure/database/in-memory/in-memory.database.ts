import { CourseOrmEntity } from './course/course.orm-entity';

export class InMemoryDatabase {
    static data: CourseOrmEntity[] = [];
}
