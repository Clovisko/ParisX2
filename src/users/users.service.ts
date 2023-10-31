import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppHelper } from './../helper/app-helper';
import { TransactionHistoriesService } from 'src/transaction-histories/transaction-histories.service';
import { TransactionType } from 'src/commons/transaction-type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly transactionHistoryService: TransactionHistoriesService,
  ) {}

  async create(
    fullName: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = new User();
    user.fullName = fullName;
    user.email = email;
    user.password = await AppHelper.hashPassword(password);
    user.accountBalance = 0.0;
    user.isActive = true;
    await this.repository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email: email } });
  }

  async resetPassword(email: string) {
    const user = await this.repository.findOne({ where: { email: email } });
    const password = (Math.random() * (999999 - 111111) + 111111).toString();
    user.password = await AppHelper.hashPassword(password);
    await this.repository.save(user);
    // Send email
    console.log(password);
  }

  async updateAccountBalance(
    user: User,
    transactionType: TransactionType,
    phoneNumber: string,
    amount: number,
  ): Promise<any> {
    try {
      const query =
        'UPDATE users SET account_balance = account_balance + ? WHERE id = ?';
      const result = await this.repository.query(query, [
        transactionType == TransactionType.CASH_IN ? amount : -amount,
        user.id,
      ]);
      await this.transactionHistoryService.create(
        user,
        transactionType,
        phoneNumber,
        amount,
      );
      return result;
    } catch (error) {
      return null;
    }
  }
}
