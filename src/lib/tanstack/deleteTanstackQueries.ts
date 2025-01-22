import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logger } from "../logger";
import { deleteUserQuery } from "../query/deleteQueries";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (id: number) => deleteUserQuery(id),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast({
        description: " Deleted Successfully",
      });
      logger.log(" deleted successfully:", data.message);
    },
    onError: (error) => {
      logger.error("Error deleting user:", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    },
  });

  return mutation;
};
