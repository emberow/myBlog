import { Article } from "../entity/Article";
import PostgresDataSource from "../config/database";
import { ArticleFolder } from "../entity/ArticleFolder";

export const getArticleFolder = async (userName) => {
    return PostgresDataSource
        .getRepository(ArticleFolder)
        .find({where: {
            userName
        }});
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

export const updateArticle = async (id: string, articleName: string) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder()
        .update()
        .set({name: articleName})
        .where('id = :id', {id})
        .execute();
}

export const deleteArticle = async (id: string) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder()
        .delete()
        .where('id = :id', {id})
        .execute();
}


