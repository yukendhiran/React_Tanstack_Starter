import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthState } from "@/store/authStore";

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
