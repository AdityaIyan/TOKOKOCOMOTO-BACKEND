import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const express = require('express');

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({ origin: true, credentials: true });
  await app.init();
}

let bootstrapped = false;

export default async function handler(req: any, res: any) {
  if (!bootstrapped) {
    await bootstrap();
    bootstrapped = true;
  }
  server(req, res);
}
