
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ArticleFolder } from './ArticleFolder';

@Entity()
export class Article {

  @ManyToOne(() => ArticleFolder, (ArticleFolder) => ArticleFolder.id)
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public Name: string;

  @Column()
  public content: string;

  @Column({ type: 'timestamptz' , default: 'NOW()'})
  public updateTime: Date;
}
