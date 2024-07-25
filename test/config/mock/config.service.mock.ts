import { ConfigServiceAdapter } from '../../../src/infrastructure/config';

export const configServiceMock = (path: string) => {
    ConfigServiceAdapter.ConfigPath = path;
    return new ConfigServiceAdapter();
};
