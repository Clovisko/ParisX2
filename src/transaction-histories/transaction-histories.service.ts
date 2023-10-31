import { Injectable } from '@nestjs/common';
import { TransactionHistory } from './transaction-history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../users/users.entity';
import { TransactionType } from 'src/commons/transaction-type';

@Injectable()
export class TransactionHistoriesService {
  constructor(
    @InjectRepository(TransactionHistory)
    private readonly repository: Repository<TransactionHistory>,
  ) {}

  async create(
    user: User,
    transactionType: TransactionType,
    phoneNumber: string,
    amount: number,
  ): Promise<TransactionHistory> {
    const t = new TransactionHistory();
    t.transactionType = transactionType;
    t.user = user;
    t.phoneNumber = phoneNumber;
    t.amount = amount;
    t.charges = 0.0;
    await this.repository.save(t);
    return t;
  }
}
