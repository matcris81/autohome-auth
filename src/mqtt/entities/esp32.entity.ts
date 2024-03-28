import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Esp32 {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  deviceId: string;

  @Column({ nullable: false })
  accessToken: string;
}
