import { Global, Module } from '@nestjs/common';
import { CourseRepository } from '../../domain';
import { CourseOrmRepository } from './in-memory/repository/course.orm-repository';

const CourseRepositoryProvider = {
    provide: CourseRepository,
    useClass: CourseOrmRepository,
};

@Global()
@Module({
    providers: [CourseRepositoryProvider],
    exports: [CourseRepositoryProvider],
})
export class DatabaseModule {}
