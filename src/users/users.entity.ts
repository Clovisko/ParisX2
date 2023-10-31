import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionHistory } from './../transaction-histories/transaction-history.entity';
import { GameHistory } from './../game-histories/game-history.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
  id: number;

  @Column({ name: 'full_name', type: 'varchar', length: 64 })
  fullName: string;

  @Column({ name: 'email', type: 'varchar', unique: true, length: 64 })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 64 })
  password: string;

  @Column({ name: 'account_balance', type: 'decimal', precision: 10, scale: 2 })
  accountBalance: number;

  @OneToMany(() => TransactionHistory, (history) => history.user)
  transactionHistories: TransactionHistory[];

  @OneToMany(() => GameHistory, (history) => history.user)
  gameHistories: GameHistory[];

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
