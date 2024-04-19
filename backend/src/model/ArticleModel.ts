import { Article } from "../entity/Article";
import PostgresDataSource from "../config/database";

export const getArticleByFolderId = async (folderId: number, userName: String) => {
    return PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .leftJoin('article.articleFolder', 'folder')
        .where('article.article_folder_id = :folderId', { folderId })
        .andWhere('folder.user_name = :userName', { userName })
        .orderBy('article.update_time', "DESC")
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
        .andWhere('article.isPublish = true')
        
    if (search) {
        result = result
        .andWhere('article.name ilike :search OR article.content ilike :search OR folder.userName ilike :search', { search: `%${search}%` })
    }

    result = result
        .limit(limit)
        .offset(offset)
    
    return result.orderBy('article.update_time', "DESC").getMany();
}

export const getArticleCount = async (search: string) => {
    let result = PostgresDataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .leftJoinAndSelect('article.articleFolder', 'folder')
        .where('article.isPublish = true')

    if (search) {
        result.andWhere('(upper(article.name) ilike upper(:search) OR upper(article.content) ilike upper(:search) OR upper(folder.userName) ilike upper(:search))', { search: `%${search}%` })
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