import { GetRequest, PostRequest } from "../utils/request";

export const getFolder = async (folderName) => {
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