import { Id } from '../id';

interface ICourse {
    readonly name: string;
    readonly description: string;
    readonly coachId: Id;
}

export class Course {
    constructor(
        readonly id: Id,
        readonly name: string,
        readonly description: string,
        readonly coachId: Id,
    ) {}

    public static create({ description, name, coachId }: ICourse): Course {
        return new Course(Id.generate(), name, description, coachId);
    }
}
