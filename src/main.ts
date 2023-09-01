import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './modules';

const PORT = process.env.PORT || 3000;

async function loadServer() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://repair-eta.vercel.app'],
  });
  app.use(cookieParser('secret_cookie'));
  app.setGlobalPrefix('/api');

  await app.listen(PORT);
  console.log('start on ' + PORT);
}
loadServer();
