import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
//import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext()({
  component: () => (
    <>
      <Outlet />
      {
        // <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
      }
    </>
  ),
});
