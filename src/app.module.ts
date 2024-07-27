import { Module } from '@nestjs/common';
import { ApiModule } from './infrastructure/api/api.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from './infrastructure/config';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
    imports: [ApiModule, AuthModule, ConfigModule, DatabaseModule],
})
export class AppModule {}
