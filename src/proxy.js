
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Login না থাকলে Login Page-এ পাঠাবে
  if (!session) {
    const loginUrl = new URL("/login", request.url);

    // Login করার পর আগের Page-এ ফিরে যাবে
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/freelancer/:path*",
    "/dashbord/freelancer/browse-task/:path*",
  ],
};
