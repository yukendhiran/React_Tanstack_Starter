import axiosInstance from "@/configs/axios";
import { UserFormValues } from "../types";

export const putUser = async (id: number, data: UserFormValues) => {
  const { data: response } = await axiosInstance.put<UserFormValues>(
    `/user/${id}`,
    data
  );
  return response;
};
