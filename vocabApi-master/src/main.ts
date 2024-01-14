import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './config/config.service';
import { Logger } from './logger/logger';
import { createDocument } from './swagger/swagger';
import * as admin from 'firebase-admin';
import * as firebaseServiceAccount from 'firebaseServiceAccount.json';
import { AppModule } from './app/app.module';
import { readFileSync } from 'fs';
import { parseData } from './parseData';
import * as express from 'express';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
export const DATA_FILE = readFileSync('./anhvietdatasmall.txt', 'utf8');
async function bootstrap() {
  const serviceAccount = firebaseServiceAccount as admin.ServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);
  SwaggerModule.setup('api/docs', app, createDocument(app));
  //path.join(__dirname, '../uploads')
  // app.use(
  //   '/uploads',
  //   express.static(configService.get().fallbackResourceFolder),
  // );

  await app.listen(configService.get().port);
  // parseData();
}
export default admin;
bootstrap();
