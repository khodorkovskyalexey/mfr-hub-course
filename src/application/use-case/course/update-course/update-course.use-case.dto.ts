import { Id, IUpdateCourse } from '../../../../domain';

class CourseUpdates implements IUpdateCourse {
    constructor(
        readonly name?: string,
        readonly description?: string,
    ) {}
}

export class UpdateCourseUseCaseDto {
    readonly updates: CourseUpdates;
    constructor(
        readonly id: Id,
        updates: IUpdateCourse,
    ) {
        this.updates = new CourseUpdates(updates.name, updates.description);
    }
}
