import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: LoginComponent,
});

function LoginComponent() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}
