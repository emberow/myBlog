import { GetRequest, PostRequest, DeleteRequest } from "../utils/request";

export const getFolder = async () => {
  return (await GetRequest({
    url: "/api/folder",
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    }
  })).data.data;
}

export const addFolder = async (folderName) => {
  return (await PostRequest({
    url: "/api/folder",
    data: {folderName},
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    }
  }));
}

export const delFolder = async (folderId) => {
  return (await DeleteRequest({
    url: "/api/folder",
    data: {folderId},
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    }
  }));
}