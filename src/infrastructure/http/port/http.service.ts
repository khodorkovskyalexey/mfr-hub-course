import { ClassConstructor } from '../../../shared/types';
import { HttpOptions, HttpResponse } from '../types';

export abstract class HttpService {
    abstract get<T>(
        url: string,
        options: HttpOptions,
    ): Promise<HttpResponse<T>>;

    abstract get<T extends Object>(
        url: string,
        options: HttpOptions,
        validatorClass: ClassConstructor<T>,
    ): Promise<HttpResponse<T>>;
}
