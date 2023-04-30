
import { EntitySchema, Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class account {

  @PrimaryColumn()
  public name: string;

  @Column()
  public password: string;
}
