import { InjectionToken } from '@nestjs/common';

export interface ConfigOptions {
    configPath: string;
}

export interface ConfigModuleAsyncOptions {
    useFactory?: (...args: any[]) => Promise<ConfigOptions> | ConfigOptions;
    useValue?: ConfigOptions;
    inject?: InjectionToken[];
}

export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';
