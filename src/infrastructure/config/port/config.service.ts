import { NodeEnvType } from '../types/enums';

export interface ApiConfig {
    auth: string;
}

export abstract class ConfigService {
    nodeEnv: NodeEnvType;

    port: number;

    api: ApiConfig;
}
