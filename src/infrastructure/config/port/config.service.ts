import { NodeEnvType } from '../types';

export abstract class ConfigService {
    nodeEnv: NodeEnvType;

    port: number;
}
