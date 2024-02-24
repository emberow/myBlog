import { Article } from "../entity/Article";
import PostgresDataSource from "../config/database";

export const getArticleByFolderId = async (folderId: number, userName: String) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .leftJoin('article.articleFolder', 'folder')
        .where('article.article_folder_id = :folderId', { folderId })
        .andWhere('folder.user_name = :userName', { userName })
        .getMany();
}

export const getArticle = async (id: number, userName: string) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .leftJoinAndSelect('article.articleFolder', 'folder')
        .where('article.id = :id', { id })
        .andWhere('folder.user_name = :userName', { userName })
        .getOne();
}

export const addArticle = async (article) => {
    return PostgresDataSource
        .getRepository(Article)
        .save(article);
}

export const updateArticle = async (id: number, article) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .update()
        .set(article)
        .where('id = :id', {id})
        .execute();
}

export const deleteArticles = async (ids: number[]) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .delete()
        .where('id in (:...ids)', {ids})
        .execute();
}

export const getArticleList = async (limit: number, offset: number, search: string) => {
    let result = PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .leftJoinAndSelect('article.articleFolder', 'folder')
        .where('article.isPublish = true')
        
    if (search) {
        result = result
            .andWhere('upper(article.name) like upper(:search)', { search: `%${search}%` })
            .orWhere('upper(article.content) like upper(:search)', { search: `%${search}%` })
    }

    result = result
        .limit(limit)
        .offset(offset)
    
    return result.getMany();
}

export const getArticleCount = async (search: string) => {
    let result = PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .where('article.isPublish = true')

    if (search) {
        result = result
            .andWhere('upper(article.name) like upper(:search)', { search: `%${search}%` })
            .orWhere('upper(article.content) like upper(:search)', { search: `%${search}%` })
    }

    return result.getCount();
}

export const getPublishedArticle = async (id: number) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .leftJoinAndSelect('article.articleFolder', 'folder')
        .where('article.id = :id', { id })
        .andWhere('article.isPublish = true')
        .getOne();
}