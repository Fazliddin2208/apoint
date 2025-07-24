import type {LoginType} from "@/types/LoginType";
import {baseApi} from "../axios/axiosConfig";

export const login = async (userData: LoginType) => {
  const response = await baseApi.post("/hr/user/sign-in?include=token", userData);
  return response.data;
};
