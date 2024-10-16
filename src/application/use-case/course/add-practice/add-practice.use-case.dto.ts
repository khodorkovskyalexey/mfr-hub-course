import { Id, Url } from '../../../../domain';

export class AddPracticeUseCaseDto {
    constructor(
        readonly courseId: Id,
        readonly coachId: Id,
        readonly name: string,
        readonly description: string,
        readonly url: Url,
    ) {}
}
