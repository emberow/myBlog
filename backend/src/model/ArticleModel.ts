import { Article } from "../entity/Article";
import PostgresDataSource from "../config/database";
import { ArticleFolder } from "../entity/ArticleFolder";

export const getArticleFolder = async (userName) => {
    return PostgresDataSource
        .getRepository(ArticleFolder)
        .createQueryBuilder('articleFolder')
        .where('user_name = :userName', { userName })
        .orderBy('articleFolder.update_time', "DESC")
        .getMany();
}

export const getArticleByFolderId = async (folderId: number) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .where('article.article_folder_id = :folderId', { folderId })
        .getMany();
}

export const addArticleFolder = async (articleFolder) => {
    return PostgresDataSource
        .getRepository(ArticleFolder)
        .save(articleFolder);
}

export const updateArticleFolder = async (userName: string, id: string, folderName: string) => {
    return PostgresDataSource
        .getRepository(ArticleFolder)
        .createQueryBuilder()
        .update()
        .set({name: folderName})
        .where('id = :id', { id })
        .andWhere('user_name = :userName', { userName })
        .execute();
}

export const deleteArticleFolder = async (id: string, userName: string) => {
    return PostgresDataSource
        .getRepository(ArticleFolder)
        .createQueryBuilder()
        .delete()
        .where('id = :id', {id})
        .andWhere('user_name = :userName', { userName })
        .execute();
}

export const getArticle = async (id: number, userName: string) => {
    return PostgresDataSource
        .getRepository(Article)
        .find({where: {
                id,
                articleFolder: {
                    userName: userName,
                }
            }
        });
}

export const addArticle = async (article) => {
    return PostgresDataSource
        .getRepository(Article)
        .save(article);
}

export const updateArticle = async (id: string, articleName: string, userName: string) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .leftJoin('article.articleFolder', 'folder')
        .update()
        .set({name: articleName})
        .where('id = :id', {id})
        .andWhere('folder.userName = :userName', {userName})
        .execute();
}

export const deleteArticle = async (id: string, userName: string) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .leftJoin('article.articleFolder', 'folder')
        .delete()
        .where('id = :id', {id})
        .andWhere('folder.userName = :userName', {userName})
        .execute();
}


