import { PostRequest } from "../utils/request";

export const userAddFolder = async (folderName) => {
  return (await PostRequest({
    url: "/api/folder",
    data: {folderName},
  })).data.data;
}