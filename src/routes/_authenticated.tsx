import {
  Outlet,
  createFileRoute,
  redirect,
  Link,
} from "@tanstack/react-router";

import { getAuthState } from "@/store/authStore";
export const Route = createFileRoute("/_authenticated")({
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

function NavigationMenu() {
  const links = [
    ["/", "Home"],
    ["/about", "About"],
    ["/Sample", "Sample"],
  ] as const;

  return (
    <div className="w-56 divide-y">
      {links.map(([to, label]) => (
        <div key={to}>
          <Link
            to={to}
            preload="intent"
            className="block px-3 py-2 text-blue-700"
            activeProps={{ className: "font-bold" }}
          >
            {label}
          </Link>
        </div>
      ))}
    </div>
  );
}

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center gap-2 border-b">
        <h1 className="p-3 text-2xl">Header</h1>
      </header>

      <div className="flex flex-1">
        <NavigationMenu />
        <main className="flex-1 border-l">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
