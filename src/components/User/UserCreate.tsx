import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { userFormSchema } from "@/lib/schema";

import { Card } from "@/components/ui/card";
import { usePostUser } from "@/lib/tanstack/postTanstackQueries";
import { UserFormValues } from "@/lib/types";
import { useViewStore } from "@/store/view/viewStore";
import { Label } from "@radix-ui/react-dropdown-menu";
import { UserForm } from "./UserForm";
export function UserCreate() {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });
  const { setView } = useViewStore();
  const PostUser = usePostUser(form.reset, setView);
  return (
    <div className=" p-5 ">
      <Card className="mt-5 p-5">
        <Label>User Create</Label>
        <div className="mt-5">
          <UserForm form={form} Mutate={PostUser} />
        </div>
      </Card>
    </div>
  );
}
