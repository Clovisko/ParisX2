import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './../users/users.entity';
import { GameOutcoume } from './../commons/game-outcome';

@Entity({ name: 'game_histories' })
export class GameHistory {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
  id: number;

  @Column({
    name: 'outcome',
    type: 'enum',
    enum: GameOutcoume,
  })
  outcome: GameOutcoume;

  @ManyToOne(() => User, (user) => user.gameHistories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
