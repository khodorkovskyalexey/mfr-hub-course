import { Global, Module, Provider } from '@nestjs/common';
import { BaseAuthGuard } from './port/auth.guard';
import { MfrHubAuthGuard } from './adapter/mfr-hub-auth.guard';
import { HttpModule } from '../http';
import { ConfigModule } from '../config';

const AuthGuardProvider: Provider = {
    provide: BaseAuthGuard,
    useClass: MfrHubAuthGuard,
};

@Global()
@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            useValue: {
                configPath: '.env',
            },
        }),
    ],
    providers: [AuthGuardProvider],
    exports: [AuthGuardProvider],
})
export class AuthModule {}
