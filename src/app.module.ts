import { Module } from '@nestjs/common';
import { ApiModule } from './infrastructure/api/api.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from './infrastructure/config';

@Module({
    imports: [ApiModule, DatabaseModule, ConfigModule],
})
export class AppModule {}
