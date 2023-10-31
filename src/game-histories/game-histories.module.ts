import { Module } from '@nestjs/common';
import { GameHistoriesService } from './game-histories.service';
import { GameHistoriesController } from './game-histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameHistory } from './game-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameHistory])],
  providers: [GameHistoriesService],
  controllers: [GameHistoriesController],
})
export class GameHistoriesModule {}
