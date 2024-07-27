import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../config';
import { AuthUser } from '../types';
import { AuthGuard } from '../port/auth.guard';
import { HttpService } from '../../http';

@Injectable()
export class MfrHubAuthGuard extends AuthGuard {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers?.authorization?.slice(7);

        const authUrl = this.configService.api.auth;
        try {
            const { data } = await this.httpService.get(
                authUrl,
                { headers: { Authorization: `Bearer ${token}` } },
                AuthUser,
            );

            request.user = data;
            return true;
        } catch (error) {
            Logger.log(error);
            return false;
        }
    }
}
