import { Id, Url } from '../types';

interface IPractice {
    readonly id: Id;
    readonly name: string;
    readonly description: string;
    readonly url: Url;
}

interface ICreatePractice extends Omit<IPractice, 'id'> {}

export class Practice {
    private readonly id: Id;
    private readonly name: string;
    private readonly description: string;
    private readonly url: Url;

    constructor(params: IPractice) {
        Object.assign(this, {
            id: params.id,
            name: params.name,
            description: params.description,
            url: params.url,
        });
    }

    public static create(params: ICreatePractice): Practice {
        return new Practice({ ...params, id: Id.generate() });
    }

    public unpack() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            url: this.url,
        };
    }
}
