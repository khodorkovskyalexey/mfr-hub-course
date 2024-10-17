import { Injectable } from '@nestjs/common';
import { HttpService } from '../port/http.service';
import { HttpOptions, HttpResponse } from '../types';
import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ClassConstructor } from '../../../shared/types';
import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable()
export class HttpAdatperService extends HttpService {
    constructor(private readonly httpService: AxiosHttpService) {
        super();
    }

    async get<T>(url: string, options: HttpOptions): Promise<HttpResponse<T>>;
    async get<T extends object>(
        url: string,
        options: HttpOptions,
        validatorClass?: ClassConstructor<T>,
    ): Promise<HttpResponse<T>> {
        let response: AxiosResponse<T>;

        try {
            response = await firstValueFrom(
                this.httpService.get(url, { headers: options?.headers }),
            );

            if (!response) {
                throw new Error(`Fetch to ${url} return null`);
            }
        } catch (error) {
            throw new Error(error.message);
        }

        let data: T = response.data;
        if (validatorClass) {
            data = plainToClass(validatorClass, data, {
                excludeExtraneousValues: true,
            });

            const errors = validateSync(data, {
                enableDebugMessages: true,
                skipMissingProperties: false,
                forbidUnknownValues: true,
            });

            if (errors.length) {
                throw new Error(errors.toString());
            }
        }

        return { status: response.status, data };
    }
}
