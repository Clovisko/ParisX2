import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameHistoriesModule } from './game-histories/game-histories.module';
import { TransactionHistoriesModule } from './transaction-histories/transaction-histories.module';
import { LocalStrategy } from './auth/local.strategy';
import { SessionSerializer } from './auth/session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    AuthModule,
    GameHistoriesModule,
    PassportModule.register({ session: true }),
    TransactionHistoriesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env?.TYPE_ORM_SYNCHRONIZE == 'true' ?? true,
      autoLoadEntities:
        process.env?.TYPE_ORM_AUTOLOAD_ENTITIES == 'true' ?? true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, SessionSerializer],
})
export class AppModule {}
