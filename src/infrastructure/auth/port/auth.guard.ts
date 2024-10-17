import {
    CanActivate,
    ExecutionContext,
    Inject,
    mixin,
    Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export abstract class BaseAuthGuard implements CanActivate {
    abstract canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean>;
}

export function AuthGuard(): Type<CanActivate> {
    class Guard implements CanActivate {
        constructor(
            @Inject(BaseAuthGuard) private readonly guard: BaseAuthGuard,
        ) {}

        canActivate(ctx: ExecutionContext) {
            return this.guard.canActivate(ctx);
        }
    }

    return mixin(Guard);
}
