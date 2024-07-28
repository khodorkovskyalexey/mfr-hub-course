import { Inject, Injectable } from '@nestjs/common';
import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
    validateSync,
} from 'class-validator';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { NodeEnvType } from '../types/enums';
import { ApiConfig, ConfigService } from '../port/config.service';
import { CONFIG_OPTIONS, ConfigOptions } from '../types';

@Expose()
class ApiConfigImpl implements ApiConfig {
    @Expose({ name: 'API_AUTH' })
    @IsString()
    @IsNotEmpty()
    auth: string;
}

@Expose()
class ConfigFile extends ConfigService {
    @Expose({ name: 'NODE_ENV' })
    @IsEnum(NodeEnvType)
    nodeEnv: NodeEnvType;

    @Expose({ name: 'PORT' })
    @IsNumber()
    @Type(() => Number)
    port: number;

    @Expose()
    @ValidateNested()
    @Transform(({ obj }) =>
        plainToClass(ApiConfigImpl, obj, { excludeExtraneousValues: true }),
    )
    api: ApiConfigImpl;
}

@Injectable()
export class ConfigServiceAdapter extends ConfigFile {
    constructor(@Inject(CONFIG_OPTIONS) readonly options: ConfigOptions) {
        super();
        const config = this.load(options.configPath);
        Object.assign(this, config);
    }

    private load(path: string) {
        try {
            const record = dotenv.parse(
                readFileSync(join(process.cwd(), path), 'utf8'),
            ) as Record<string, any>;

            return this.validate(record);
        } catch (e) {
            throw new Error(`Can't instantiate ConfigService: ${e?.message}`);
        }
    }

    private validate(config: Record<string, unknown>) {
        const validatedConfig = plainToClass(ConfigFile, config, {
            excludeExtraneousValues: true,
        });

        const errors = validateSync(validatedConfig, {
            enableDebugMessages: true,
            skipMissingProperties: false,
            forbidUnknownValues: true,
        });

        if (errors.length) {
            throw new Error(errors.toString());
        }
        return validatedConfig;
    }
}
