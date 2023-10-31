import { TransactionType } from './../commons/transaction-type';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity({ name: 'transaction_histories' })
export class TransactionHistory {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
  id: number;

  @Column({
    name: 'transaction_type',
    type: 'enum',
    enum: TransactionType,
  })
  transactionType: TransactionType;

  @ManyToOne(() => User, (user) => user.transactionHistories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'charges', type: 'decimal', precision: 10, scale: 2 })
  charges: number;

  @Column({ name: 'phone_number', type: 'varchar', length: 32 })
  phoneNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
