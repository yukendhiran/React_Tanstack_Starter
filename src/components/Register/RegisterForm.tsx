// RegisterForm.tsx
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { UserIcon, MailIcon, KeyIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { RegisterInputs, RegisterFormProps } from "@/lib/types";

export function RegisterForm({ onFormSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  return (
    <div className="flex flex-col content-center items-center justify-center">
      <form
        onSubmit={handleSubmit((data) => {
          void onFormSubmit(data);
        })}
      >
        <fieldset className="flex flex-col space-y-4">
          <div>
            <div className="relative mt-2">
              <Input
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
          <div>
            <div className="relative mt-2">
              <Input
                {...register("email", { required: true })}
                placeholder="Enter your E-Mail ID"
                className="border-primary bg-white text-button placeholder:text-primary"
              />
              <span className="absolute inset-y-0 right-3 flex items-center pl-3">
                <MailIcon />
              </span>
            </div>
            {errors.username && <span>This field is required</span>}
          </div>
          <div>
            <div className="relative mt-2">
              <Input
                {...register("password", { required: true })}
                placeholder="Enter your Password"
                className="border-primary bg-white text-button placeholder:text-primary"
              />
              <span className="absolute inset-y-0 right-3 flex items-center pl-3">
                <KeyIcon />
              </span>
            </div>
            {errors.username && <span>This field is required</span>}
          </div>
          <Button type="submit">
            <span className="ml-3 text-button text-secondary">Register</span>
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
