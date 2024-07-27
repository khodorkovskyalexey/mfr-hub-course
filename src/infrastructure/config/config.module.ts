import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from './port/config.service';
import { ConfigServiceAdapter } from './adapter/config.service.adapter';

const CourseRepositoryProvider: Provider = {
    provide: ConfigService,
    useClass: ConfigServiceAdapter,
};

@Global()
@Module({
    providers: [CourseRepositoryProvider],
    exports: [CourseRepositoryProvider],
})
export class ConfigModule {}
