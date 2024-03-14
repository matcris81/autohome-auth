import { IsString } from 'class-validator';
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Feature } from '../entities/feature.entity';

export class UpdatePiDto {
  @IsString()
  password: string;

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  value: number;

  @ManyToMany(() => Feature)
  @JoinTable()
  features: Feature[];
}
