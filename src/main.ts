import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule, Config } from './modules';

const PORT = process.env.PORT || 3000;

async function loadServer() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(Config.corsOptions);
  app.use(cookieParser('secret_cookie'));
  app.setGlobalPrefix('/api');

  await app.listen(PORT);
  console.log('start on ' + PORT);
}
loadServer();
