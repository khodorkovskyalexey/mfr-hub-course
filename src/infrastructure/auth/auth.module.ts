import { Global, Module, Provider } from '@nestjs/common';
import { AuthGuard } from './port/auth.guard';
import { MfrHubAuthGuard } from './adapter/mfr-hub-auth.guard';
import { HttpModule } from '../http';

const AuthGuardProvider: Provider = {
    provide: AuthGuard,
    useClass: MfrHubAuthGuard,
};

@Global()
@Module({
    imports: [HttpModule],
    providers: [AuthGuardProvider],
    exports: [AuthGuardProvider],
})
export class AuthModule {}
