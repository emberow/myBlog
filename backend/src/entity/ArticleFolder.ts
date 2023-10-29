
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Article } from './Article';

@Entity()
export class ArticleFolder {

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @OneToMany(() => Article, (article) => article.id)
  public articles: Article[];

  @Column()
  public name: string;

  @Column()
  public userName: string;

  @Column({ type: 'timestamptz' , default: 'NOW()'})
  public updateTime: Date;
}
