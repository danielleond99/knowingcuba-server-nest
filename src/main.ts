import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("api/v1");
  app.use(helmet());

  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get("PORT"));
  Logger.log(`Server running on: ${await app.getUrl()}`);
}
bootstrap();
