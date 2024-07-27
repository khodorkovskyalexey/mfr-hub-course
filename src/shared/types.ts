export type OptionalExclude<Type, ExcludeKeys extends keyof Type> = {
    [Property in keyof Type as Exclude<Property, ExcludeKeys>]?: Type[Property];
};

export type ClassConstructor<T> = { new (...args: any[]): T };
