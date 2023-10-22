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
        .where('id = :id', {id: id})
        .andWhere('user_name = :userName', {userName: userName})
        .execute();
}

export const deleteArticleFolder = async (id: string, userName: string) => {
    return PostgresDataSource
        .getRepository(ArticleFolder)
        .createQueryBuilder()
        .delete()
        .where('id = :id', {id})
        .andWhere('user_name = :userName', {userName: userName})
        .execute();
}



