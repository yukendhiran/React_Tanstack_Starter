import { getAuthState } from "@/store/auth/authStore";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticatedNoLayout")({
  beforeLoad: ({ location }) => {
    if (!getAuthState()) {
      return redirect({
        to: "/login",
        search: {
          redirect: location.href, // Redirect back after login
        },
      });
    }
  },
  component: Home,
});

function Home() {
  return (
    <>
      <Outlet />
    </>
  );
}
