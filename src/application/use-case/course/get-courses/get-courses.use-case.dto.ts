import { Id } from '../../../../domain';

export class GetCoursesFilterDto {
    constructor(readonly coachId?: Id) {}
}
