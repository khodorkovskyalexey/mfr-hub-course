type ValueType = number;

export class Id {
    readonly value: ValueType;

    static generate(): Id {
        const value = Date.now() + Math.random() / 10;
        return new Id(value);
    }

    constructor(value: ValueType) {
        this.value = value;
    }

    isEqual(otherId: Id): boolean {
        return this.value === otherId.value;
    }
}
