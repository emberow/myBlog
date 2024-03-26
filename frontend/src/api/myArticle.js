import { GetRequest, PostRequest, DeleteRequest, PatchRequest } from "../utils/request.js";
import { message } from "antd";

const errHandler = async (err) => {
  if (err.response.data.message === "EXPIRED_TOKEN") {
    await message.error('EXPIRED_TOKEN, please login', 1);
  } else {
    await message.error('INVALID_TOKEN, please login', 1);
  }
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userName');
  window.location.href = "/articleList";
}

export const getFolder = async () => {
  try {
    return (await GetRequest({
      url: "/api/folder",
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    }))?.data?.data;
  } catch (err) {
    errHandler(err);
  }
}

export const addFolder = async (folderName) => {
  try{
    return (await PostRequest({
      url: "/api/folder",
      data: {folderName},
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    }));
  } catch (err) {
    errHandler(err);
  }
}

export const delFolder = async (folderId) => {
  try{
    return (await DeleteRequest({
      url: `/api/folder?id=${folderId}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    }));
  } catch (err) {
    errHandler(err);
  }
}

export const addArticle = async (folderId, articleName) => {
  try{
    return (await PostRequest({
      url: "/api/article",
      data: {
        folderId,
        articleName
      },
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    }));
  } catch (err) {
    errHandler(err);
  }
}

export const getArticle = async (articleId) => {
  try{
    return (await GetRequest({
      url: `/api/article/?id=${articleId}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    }))?.data?.data;
  } catch (err) {
    errHandler(err);
  }
}

export const patchArticle = async (article) => {
  try{
    return (await PatchRequest({
      url: "/api/article",
      data: article,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    }));
  } catch (err) {
    errHandler(err);
  }
}

export const delArticle = async (articleId) => {
  try{
    return (await DeleteRequest({
      url: `/api/article/?id=${articleId}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    }))?.data?.data;
  } catch (err) {
    errHandler(err);
  }
}