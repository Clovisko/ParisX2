import { Module } from '@nestjs/common';
import { TransactionHistoriesService } from './transaction-histories.service';
import { TransactionHistoriesController } from './transaction-histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionHistory } from './transaction-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionHistory])],
  providers: [TransactionHistoriesService],
  exports: [TransactionHistoriesService],
  controllers: [TransactionHistoriesController],
})
export class TransactionHistoriesModule {}
