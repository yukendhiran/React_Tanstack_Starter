import { Card } from "@/components/ui/card";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: LoginComponent,
});

function LoginComponent() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Card className="flex h-full w-full justify-center">
        <Outlet />
      </Card>
    </div>
  );
}
