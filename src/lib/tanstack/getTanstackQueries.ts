import { useQuery } from "@tanstack/react-query";
import { fetchUserQuery } from "../query/getQueries";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserQuery(),
  });
};
