import { Id } from '../../../../domain';

export class GetCourseByIdUseCaseDto {
    constructor(readonly id: Id) {}
}
