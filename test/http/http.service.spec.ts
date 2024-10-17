import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '../../src/infrastructure/http';
import { Equals } from 'class-validator';
import { Expose } from 'class-transformer';
import { axiosGetMock } from './mock/axios-get.mock';

class ValidateDto {
    @Expose()
    @Equals(true)
    ok: boolean;

    @Expose()
    jwt?: string;
}

describe('HttpServicePort', () => {
    let service: HttpService;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
        }).compile();

        service = app.get<HttpService>(HttpService);

        axiosGetMock((url, config) => {
            return url !== '/get-null'
                ? {
                      status: 200,
                      data: {
                          ok: url !== '/bad-url',
                          jwt: config?.headers?.Authorization,
                      },
                      config: { headers: config?.headers },
                  }
                : null;
        });
    });

    it('must be defined', () => {
        expect(service).toBeDefined();
    });

    it('empty response', async () => {
        expect(() => service.get('/get-null', {})).rejects.toThrow(Error);
    });

    it('without validation', async () => {
        const res = await service.get('/url', {
            headers: { Authorization: 'jwt' },
        });
        expect(res).toEqual({ status: 200, data: { ok: true, jwt: 'jwt' } });
    });

    describe('with validation', () => {
        it('success', async () => {
            const res = await service.get(
                '/url',
                { headers: { Authorization: 'jwt' } },
                ValidateDto,
            );
            expect(res).toEqual({
                status: 200,
                data: { ok: true, jwt: 'jwt' },
            });
        });
        it('success without headers', async () => {
            const res = await service.get('/url', {}, ValidateDto);
            expect(res).toEqual({
                status: 200,
                data: { ok: true },
            });
        });
        it('validation must be failed', async () => {
            expect(() =>
                service.get(
                    '/bad-url',
                    { headers: { Authorization: 'jwt' } },
                    ValidateDto,
                ),
            ).rejects.toThrow(Error);
        });
    });
});
