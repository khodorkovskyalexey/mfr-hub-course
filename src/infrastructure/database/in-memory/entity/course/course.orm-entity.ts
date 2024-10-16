import { PracticeOrmEntity } from '../practice/practice.orm-entity';

export class CourseOrmEntity {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly description: string,
        readonly coachId: number,
        readonly practices: PracticeOrmEntity[],
    ) {}
}
