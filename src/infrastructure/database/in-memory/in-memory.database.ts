import { CourseOrmEntity } from './entity/course/course.orm-entity';

export class InMemoryDatabase {
    static data: CourseOrmEntity[] = [];
}
