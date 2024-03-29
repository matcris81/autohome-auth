import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Feature } from './feature.entity';

@Entity()
export class Pi {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  deviceId: string;

  @Column({ nullable: false })
  accessToken: string;

  // @Column()
  // name: string;

  // @Column()
  // value: number;

  @ManyToMany(() => Feature)
  @JoinTable()
  features: Feature[];
}
