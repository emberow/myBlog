
import { EntitySchema, Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Timestamp } from 'typeorm';

@Entity()
export class Account {

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ unique: true })
  public userName: string;

  @Column()
  public password: string;

  @Column({ type: 'timestamptz' , default: 'NOW()'})
  public updateTime: Date;
}
