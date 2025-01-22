import { LoginForm } from "@/components/Login/LoginForm";
import { sleep } from "@/lib/utils";
import { useAuthStore } from "@/store/auth/authStore";
import {
  createLazyFileRoute,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import * as React from "react";
import { SubmitHandler } from "react-hook-form";

export const Route = createLazyFileRoute("/_auth/login/")({
  component: LoginComponent,
});

type Inputs = {
  email: string;
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
      const fieldValue: string = data.email;
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
    <div className="flex min-h-svh flex-col  items-center justify-center bg-muted p-6 md:p-10 bg-gray-400">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm onFormSubmit={onFormSubmit} isLoggingIn={isLoggingIn} />
      </div>
    </div>
  );
}
