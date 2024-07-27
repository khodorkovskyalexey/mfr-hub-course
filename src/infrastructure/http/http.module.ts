import { Module, Provider } from '@nestjs/common';
import { HttpService } from './port/http.service';
import { HttpAdatperService } from './adapter/http-adapter.service';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';

const HttpServiceProvider: Provider = {
    provide: HttpService,
    useClass: HttpAdatperService,
};

@Module({
    imports: [
        AxiosHttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    providers: [HttpServiceProvider],
    exports: [HttpServiceProvider],
})
export class HttpModule {}
