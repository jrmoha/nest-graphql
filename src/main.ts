import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get<number>('PORT');
  await app.listen(PORT);
  // await CommandFactory.run(AppModule);
}
bootstrap();
