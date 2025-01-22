import axiosInstance from "@/configs/axios";
import { UserFormValues } from "../types";

export const postUser = async (data: UserFormValues) => {
  const { data: response } = await axiosInstance.post<UserFormValues>(
    "/user",
    data
  );
  return response;
};
