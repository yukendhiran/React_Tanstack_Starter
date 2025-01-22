import axiosInstance from "@/configs/axios";
import { UserFetch } from "../types";

export const fetchUserQuery = async () => {
  const { data } = await axiosInstance.get<UserFetch[]>("/user");
  return data;
};
