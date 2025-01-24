import {
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";

import { AppSidebar } from "@/components/Authenticated/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getAuthState } from "@/store/auth/authStore";

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

function Home() {
  const router = useRouter();
  const pathSegments = router.latestLocation.pathname
    .split("/")
    .filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                  const href = "/" + pathSegments.slice(0, index + 1).join("/");
                  const isLast = index === pathSegments.length - 1;
                  return (
                    <>
                      <BreadcrumbItem key={href}>
                        {isLast ? (
                          <BreadcrumbPage>
                            {decodeURIComponent(segment)}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>
                            {decodeURIComponent(segment)}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
