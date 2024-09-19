import { NodeEnvType } from '../types';

export interface ApiConfig {
    auth: string;
}

export abstract class ConfigService {
    nodeEnv: NodeEnvType;

    port: number;

    api: ApiConfig;
}
