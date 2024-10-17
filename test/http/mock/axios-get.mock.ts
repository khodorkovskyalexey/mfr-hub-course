import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosGetMock = (
    responseFunction: (
        url: string,
        config: AxiosRequestConfig | undefined,
    ) => any,
) =>
    jest.spyOn(AxiosHttpService.prototype, 'get').mockImplementation(
        (url, config) =>
            new Observable((subscribe) => {
                const response = responseFunction(url, config);

                subscribe.next(response as AxiosResponse);
            }),
    );
