import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from './port/config.service';
import { ConfigServiceAdapter } from './adapter/config.service.adapter';
import {
    CONFIG_OPTIONS,
    ConfigModuleAsyncOptions,
} from './types/config.module.types';

const ConfigServiceProvider: Provider = {
    provide: ConfigService,
    useClass: ConfigServiceAdapter,
};

@Global()
@Module({})
export class ConfigModule {
    static forRoot(options: ConfigModuleAsyncOptions): DynamicModule {
        const OptionsProvider = this.createOptionsProvider(options);

        return {
            module: ConfigModule,
            providers: [ConfigServiceProvider, OptionsProvider],
            exports: [ConfigServiceProvider],
        };
    }

    private static createOptionsProvider(
        options: ConfigModuleAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                provide: CONFIG_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject ?? [],
            };
        }
        if (options.useValue) {
            return {
                provide: CONFIG_OPTIONS,
                useValue: options.useValue,
            };
        }

        throw new Error('Config options provider not implemented');
    }
}
