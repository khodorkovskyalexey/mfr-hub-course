import { Id } from '../../../../domain';

export class CreateCourseUseCaseDto {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly coachId: Id,
    ) {}
}
