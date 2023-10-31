import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import flash = require('connect-flash');
import mySQLSession = require('express-mysql-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const MySQLStore = mySQLSession(session);

  app.use(
    session({
      secret: 'my-session-secret',
      resave: false,
      saveUninitialized: false,
      store: new MySQLStore({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  app.use(flash());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.set('view options', { layout: 'layouts/app' });

  app.setViewEngine('hbs');

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
