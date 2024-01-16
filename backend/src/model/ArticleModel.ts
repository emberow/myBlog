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

export const getArticleByFolderId = async (folderId: number, userName: String) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .leftJoin('article.articleFolder', 'folder')
        .where('article.article_folder_id = :folderId', { folderId })
        .andWhere('folder.user_name = :userName', { userName })
        .getMany();
}

export const addArticleFolder = async (articleFolder) => {
    return PostgresDataSource
        .getRepository(ArticleFolder)
        .save(articleFolder);
}

export const updateArticleFolder = async (userName: string, id: number, folderName: string) => {
    return PostgresDataSource
        .getRepository(ArticleFolder)
        .createQueryBuilder()
        .update()
        .set({name: folderName})
        .where('id = :id', { id })
        .andWhere('user_name = :userName', { userName })
        .execute();
}

export const deleteArticleFolder = async (id: number, userName: string) => {
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

export const updateArticle = async (id: number, articleName: string, userName: string) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .leftJoin('article.articleFolder', 'folder')
        .update()
        .set({name: articleName})
        .where('id = :id', {id})
        .andWhere('folder.user_name = :userName', {userName})
        .execute();
}

export const deleteArticles = async (ids: number[], userName: string) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .delete()
        .where('id in (:...ids)', {ids})
        .execute();
}

