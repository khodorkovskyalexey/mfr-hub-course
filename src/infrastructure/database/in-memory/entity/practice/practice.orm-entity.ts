export class PracticeOrmEntity {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly description: string,
        readonly url: string,
    ) {}
}
