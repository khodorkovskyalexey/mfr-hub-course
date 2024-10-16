import { Id } from '../types';
import { Practice } from './practice';

interface ICourse {
    readonly id: Id;
    readonly name: string;
    readonly description: string;
    readonly coachId: Id;
    readonly practices: Practice[];
}

interface ICreateCourse {
    readonly name: string;
    readonly description: string;
    readonly coachId: Id;
}

export interface IUpdateCourse {
    readonly name?: string;
    readonly description?: string;
}

export class Course {
    private readonly id: Id;
    private name: string;
    private description: string;
    private readonly coachId: Id;
    private readonly practices: Practice[];

    constructor(params: ICourse) {
        Object.assign(this, {
            id: params.id,
            name: params.name,
            description: params.description,
            coachId: params.coachId,
            practices: params.practices,
        });
    }

    public static create({
        description,
        name,
        coachId,
    }: ICreateCourse): Course {
        return new Course({
            id: Id.generate(),
            name,
            description,
            coachId,
            practices: [],
        });
    }

    public update({ name, description }: IUpdateCourse): void {
        if (name) this.name = name;
        if (description) this.description = description;
    }

    public addPractice(newPractice: Practice): void {
        if (
            this.practices.some(
                (practice) =>
                    practice.unpack().name === newPractice.unpack().name,
            )
        ) {
            throw new Error('Practice name must be unique');
        }

        this.practices.push(newPractice);
    }

    public unpack() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            coachId: this.coachId,
            practices: this.practices,
        };
    }
}
