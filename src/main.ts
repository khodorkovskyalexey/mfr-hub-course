import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { name, description, version } from '../package.json';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService, NodeEnvType } from './infrastructure/config';

function useSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle(name)
        .setDescription(description)
        .setVersion(version)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
}

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    app.enableCors({
        origin: '*',
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const configService = app.get<ConfigService>(ConfigService);
    const port = configService.port ?? 3000;
    const env = configService.nodeEnv;

    if (env !== NodeEnvType.Production) {
        useSwagger(app);
    }

    await app.listen(port, () => {
        Logger.log(`Running on port ${port}`, 'NestApplication');
        Logger.log(`Environment ${env}`, 'NestApplication');
    });
}
bootstrap();
