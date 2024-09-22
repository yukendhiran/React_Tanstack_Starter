import * as React from "react";
import {
  createLazyFileRoute,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { LoginForm } from "@/components/Login/LoginForm";
import { SubmitHandler } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import { sleep } from "@/lib/utils";

export const Route = createLazyFileRoute("/_auth/login/")({
  component: LoginComponent,
});

type Inputs = {
  username: string;
};

function LoginComponent() {
  //const [, login] = useAtom(loginAtom); // Use Jotai login atom
  const { login } = useAuthStore();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    console.log("DATA", data);

    try {
      const fieldValue: string = data.username;
      console.log("fieldValue", fieldValue);
      if (!fieldValue) return;
      const username = fieldValue.toString();
      await login(username);

      await router.invalidate();

      await sleep(1);

      await navigate({ to: "/" });
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoggingIn = isLoading || isSubmitting;

  return (
    <div>
      <div className="flex h-full w-full flex-col content-center items-center justify-center">
        <div className="w-3/4">
          <LoginForm onFormSubmit={onFormSubmit} isLoggingIn={isLoggingIn} />
        </div>
      </div>
    </div>
  );
}
