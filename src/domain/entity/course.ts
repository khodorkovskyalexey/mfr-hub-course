import { Id } from '../id';

interface ICourse {
    readonly name: string;
    readonly description: string;
    readonly coachId: Id;
}

export interface IUpdateCourse {
    readonly name?: string;
    readonly description?: string;
}

export class Course {
    constructor(
        private readonly id: Id,
        private name: string,
        private description: string,
        private readonly coachId: Id,
    ) {}

    public static create({ description, name, coachId }: ICourse): Course {
        return new Course(Id.generate(), name, description, coachId);
    }

    public update({ name, description }: IUpdateCourse): void {
        if (name) this.name = name;
        if (description) this.description = description;
    }

    public unpack() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            coachId: this.coachId,
        };
    }
}
