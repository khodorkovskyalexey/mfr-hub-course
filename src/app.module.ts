import { Module } from '@nestjs/common';
import { ApiModule } from './infrastructure/api/api.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
    imports: [ApiModule, DatabaseModule],
})
export class AppModule {}
