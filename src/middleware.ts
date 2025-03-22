import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  const { nextUrl, auth: session } = req;
  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isLoginPage = nextUrl.pathname === "/auth/login";
  const isRegisterPage = nextUrl.pathname === "/auth/register";

  const isAuthenticated = !!session?.user;
  const isProfileComplete = isAuthenticated
    ? !!session.user?.profile?.is_profile_complete
    : false;

  const callbackUrl = nextUrl.pathname + nextUrl.search;

  if (
    isApiRoute ||
    nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|css|js|ico)$/)
  ) {
    return NextResponse.next();
  }

  if (isAuthenticated && !isProfileComplete && !isRegisterPage) {
    const registerUrl = new URL("/auth/register", req.url);
    registerUrl.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(registerUrl);
  }

  if (isAuthenticated && isProfileComplete && isAuthRoute) {
    if (isLoginPage && req.nextUrl.searchParams.get("callbackUrl")) {
      const redirectUrl =
        req.nextUrl.searchParams.get("callbackUrl") || "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    /*
     * 以下を除外:
     * - static files (/_next/, /favicon.ico など)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

export const runtime = "nodejs";
