export type HttpResponse<T> = {
    status: number;
    data: T;
};

export type HttpOptions = {
    headers?: HttpHeaders & { Authorization?: HttpHeaders['Authorization'] };
};

export type HttpHeaders = {
    [key: string]: string | number | boolean | null;
};
