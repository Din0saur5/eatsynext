import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/dashboard", "/createNewRecipe"];
  const { supabase, response } = createClient(request);
  const { data: { session } = {} } = await supabase.auth.getSession();
  // Check if the current path is one of the protected routes
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!session) {
      return NextResponse.redirect(request.nextUrl.origin + "/login");
    }
  } else if (session && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(request.nextUrl.origin + "/dashboard");
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
