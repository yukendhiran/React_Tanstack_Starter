import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { logger } from "../logger";
import { postUser } from "../query/postQueries";

export const usePostUser = (
  reset: () => void,
  setView: (view: "list" | "create") => void
) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: postUser,
    onSuccess: (data) => {
      logger.log(" posted successfully:", data);
      toast({
        description: " Submitted Successfully",
      });
      if (reset) {
        reset();
        setView("list");
      }
    },
    onError: (error) => {
      logger.error("Error posting :", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    },
  });
};
