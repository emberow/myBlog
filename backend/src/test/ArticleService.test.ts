import * as ArticleService from '../services/ArticleService';
import * as ArticleFolderModel from '../model/ArticleFolderModel';
import * as ArticleModel from '../model/ArticleModel';
import { ArticleFolder } from '../entity/ArticleFolder';
import { Article } from '../entity/Article';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('AccountService', () => {
    it('getArticleFolder', async () => {
        const article : Promise<Article[]> = Promise.resolve([new Article()]);
        const articleFolder : Promise<ArticleFolder[]> = Promise.resolve([new ArticleFolder()]);
        jest.spyOn(ArticleFolderModel, 'getArticleFolder')
            .mockImplementation(async () => articleFolder);
        jest.spyOn(ArticleModel, 'getArticleByFolderId')
            .mockImplementation(async () => article);
        const result = await ArticleService.getArticleFolder("userName");
        const expected = await articleFolder;
        expected[0].articles = await article;
        expect(result).toEqual(expected);
    });

    it('addArticleFolder', async () => {
        const article : Promise<Article[]> = Promise.resolve([new Article()]);
        jest.spyOn(ArticleFolderModel, 'addArticleFolder')
            .mockImplementation(async () => article);
        await ArticleService.addArticleFolder("userName", "folderName");
    });

    it('deleteArticleFolder', async () => {
        const article : Promise<Article[]> = Promise.resolve([new Article()]);
        jest.spyOn(ArticleModel, 'getArticleByFolderId')
            .mockImplementation(async () => article);
        jest.spyOn(ArticleModel, 'deleteArticles')
            .mockImplementation(async () => null);
        jest.spyOn(ArticleFolderModel, 'deleteArticleFolder')
            .mockImplementation(async () => null);
        await ArticleService.deleteArticleFolder(0, "userName");
    });

    it('getArticle', async () => {
        const article : Promise<Article> = Promise.resolve(new Article());
        jest.spyOn(ArticleModel, 'getArticle')
            .mockImplementation(async () => article);
        const result = await ArticleService.getArticle("userName", 0);
        expect(result).toEqual(await article);
    });

    it('addArticle', async () => {
        const article = Promise.resolve(new Article());
        jest.spyOn(ArticleModel, 'addArticle')
            .mockImplementation(async () => article);
        const result = await ArticleService.addArticle("userName", 0, "articleName");
        expect(result).toEqual(await article);
    });

    it('updateArticle', async () => {
        const updateResult = Promise.resolve(new UpdateResult());
        jest.spyOn(ArticleModel, 'updateArticle')
            .mockImplementation(async () => updateResult);
        const result = await ArticleService.updateArticle("userName", 0, "name", "content", false);
        expect(result).toEqual(await updateResult);
    });

    it('deleteArticles', async () => {
        const deleteResult = Promise.resolve(new DeleteResult());
        jest.spyOn(ArticleModel, 'deleteArticles')
            .mockImplementation(async () => deleteResult);
        await ArticleService.deleteArticle("userName", 0);
    });

    it('getArticleList', async () => {
        const article : Promise<Article[]> = Promise.resolve([new Article()]);
        jest.spyOn(ArticleModel, 'getArticleList')
            .mockImplementation(async () => article);
        const result = await ArticleService.getArticleList(0, 0, "search");
        expect(result).toEqual(await article);
    });

    it('getArticleCount', async () => {
        const count : Promise<number> = Promise.resolve(0);
        jest.spyOn(ArticleModel, 'getArticleCount')
            .mockImplementation(async () => count);
        const result = await ArticleService.getArticleCount("search");
        expect(result).toEqual(await count);
    });


    it('getPublishedArticle', async () => {
        const article : Promise<Article> = Promise.resolve(new Article());
        jest.spyOn(ArticleModel, 'getPublishedArticle')
            .mockImplementation(() => article);
        const result = await ArticleService.getPublishedArticle(0);
        expect(result).toEqual(await article);
    });
});
