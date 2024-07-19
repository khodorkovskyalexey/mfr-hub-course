import { Course, Id } from '../../../../domain';
import { OptionalExclude } from '../../../../shared/types';

class CourseUpdates implements OptionalExclude<Course, 'id' | 'coachId'> {
    constructor(
        readonly name?: string,
        readonly description?: string,
    ) {}
}

export class UpdateCourseUseCaseDto {
    readonly updates: CourseUpdates;
    constructor(
        readonly id: Id,
        updates: OptionalExclude<Course, 'id' | 'coachId'>,
    ) {
        this.updates = new CourseUpdates(updates.name, updates.description);
    }
}
