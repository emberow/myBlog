
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ArticleFolder } from './ArticleFolder';

@Entity()
export class Article {

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public name: string;

  @Column({nullable: true})
  public content: string;

  @Column({ type: 'timestamptz' , default: 'NOW()'})
  public updateTime: Date;

  @ManyToOne(() => ArticleFolder, (ArticleFolder) => ArticleFolder.id)
  public articleFolder: ArticleFolder

  @Column({nullable: true})
  public isPublish: Boolean;

}
