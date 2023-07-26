import { PostRequest } from "../utils/request";

export const userLoginCheck = async (userName, password) => {
  return await PostRequest({
    url: "/api/login",
    data: {
      userName,
      password
    }
  })
}
