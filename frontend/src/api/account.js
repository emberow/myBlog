import { PostRequest } from "../utils/request";

export const userLoginCheck = async (values) => {
  return (await PostRequest({
    url: "/api/login",
    data: values,
  })).data.data;
}

export const userSingUp = async (values) => {
  return (await PostRequest({
    url: "/api/account",
    data: values,
  })).data.data;
}
