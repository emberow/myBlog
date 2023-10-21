import PostgresDataSource from "../config/database";
import { ArticleFolder } from "../entity/ArticleFolder";

export const getArticleFolder = async (userName: String) => {
    return PostgresDataSource
        .getRepository(ArticleFolder)
        .find();
}

export const addArticleFolder = async (articleFolder) => {
    return PostgresDataSource
        .getRepository(ArticleFolder)
        .save(articleFolder);
}

export const deleteArticleFolder = async (id: string, userName: string) => {
    return PostgresDataSource
        .getRepository(ArticleFolder)
        .createQueryBuilder()
        .delete()
        .where('id = :id', {id: id})
        .andWhere('user_name = :userName', {userName: userName})
        .execute();
}



