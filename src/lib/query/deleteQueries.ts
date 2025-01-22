import axiosInstance from "@/configs/axios";

export const deleteUserQuery = async (id: number) => {
  const { data } = await axiosInstance.delete<{ message: string }>(
    `/user/${id}`,
  );
  return data;
};
