import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { RegisterForm } from "@/components/Register/RegisterForm";

export const Route = createLazyFileRoute("/_auth/register/")({
  component: RegisterComponent,
});

function RegisterComponent() {
  return (
    <div>
      <div className="flex h-full w-full flex-col content-center items-center justify-center">
        <div>
          <RegisterForm
            onFormSubmit={() => {
              console.log("SUBMITTED");
            }}
          />
        </div>
        <div className="mt-5 text-sm">
          <span>Already have an account? </span>
          <Link className="hover:underline" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
