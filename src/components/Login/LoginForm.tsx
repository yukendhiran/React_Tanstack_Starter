// LoginForm.tsx
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { UserIcon, LockIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { LoginInputs, LoginFormProps } from "@/lib/types";

export function LoginForm({ onFormSubmit, isLoggingIn }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  return (
    <div className="flex flex-col content-center items-center justify-center">
      <form
        onSubmit={handleSubmit((data) => {
          void onFormSubmit(data);
        })}
      >
        <fieldset disabled={isLoggingIn} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="username-input" className="text-sm">
              User ID
            </label>
            <div className="relative mt-2">
              <Input
                id="username-input"
                {...register("username", { required: true })}
                placeholder="Enter your User ID"
                className="border-primary bg-white text-button placeholder:text-primary"
              />
              <span className="absolute inset-y-0 right-3 flex items-center pl-3">
                <UserIcon />
              </span>
            </div>
            {errors.username && <span>This field is required</span>}
          </div>

          <Button type="submit">
            {isLoggingIn ? (
              "Loading..."
            ) : (
              <>
                <LockIcon /> <span className="ml-3 text-button">Login</span>
              </>
            )}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
