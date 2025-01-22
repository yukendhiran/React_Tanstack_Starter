import { useToast } from "@/hooks/use-toast";
import { useModalStore } from "@/store/modal/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logger } from "../logger";
import { putUser } from "../query/putQueries";
import { UserFormValues } from "../types";

export const useUpdateUser = (id: number | undefined) => {
  const queryClient = useQueryClient();
  const { setOpen } = useModalStore();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: UserFormValues) => {
      if (typeof id === "undefined") {
        return Promise.reject(new Error(" ID is undefined"));
      }

      return putUser(id, data);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast({
        description: " Updated Successfully",
      });
      setOpen(false);
      logger.log(" updated successfully", data);
    },
    onError: (error) => {
      logger.error("Failed to update ", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    },
  });
};
