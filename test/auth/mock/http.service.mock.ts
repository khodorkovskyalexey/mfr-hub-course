import { HttpOptions } from "../../../src/infrastructure/http";

export const httpServiceMock = {
    get: async (_url: string, options: HttpOptions) => {
        if (options.headers?.Authorization === 'Bearer bad') {
            throw new Error('Forbidden');
        }

        return {
            id: 1,
            username: 'terminator_79',
        };
    },
};
