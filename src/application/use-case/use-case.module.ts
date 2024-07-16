import { Module } from '@nestjs/common';
import { CourseUseCaseModule } from './course';

@Module({
    imports: [CourseUseCaseModule],
    exports: [CourseUseCaseModule],
})
export class UseCaseModule {}
