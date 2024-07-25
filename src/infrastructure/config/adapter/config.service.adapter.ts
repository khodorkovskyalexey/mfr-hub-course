import { Injectable } from '@nestjs/common';
import { Expose, plainToClass, Type } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { NodeEnvType } from '../types';
import { ConfigService } from '../port/config.service';

@Expose()
class ConfigFile implements ConfigService {
    @Expose({ name: 'NODE_ENV' })
    @IsEnum(NodeEnvType)
    nodeEnv: NodeEnvType;

    @Expose({ name: 'PORT' })
    @IsNumber()
    @Type(() => Number)
    port: number;
}

@Injectable()
export class ConfigServiceAdapter extends ConfigFile {
    static ConfigPath = '.env';

    constructor() {
        super();
        const config = this.load(ConfigServiceAdapter.ConfigPath);
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
        const validatedConfig = plainToClass(ConfigFile, config);

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
