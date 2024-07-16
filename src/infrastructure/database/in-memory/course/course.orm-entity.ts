export class CourseOrmEntity {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly description: string,
        readonly coachId: number,
    ) {}
}
