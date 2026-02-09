import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const pathname = req.nextUrl.pathname;

        // Check if user is approved for protected routes
        if (pathname.startsWith("/dashboard")) {
            if (!token?.isApproved) {
                return NextResponse.redirect(new URL("/pending", req.url));
            }
        }

        // Check if user is admin for admin routes
        if (pathname.startsWith("/admin")) {
            if (token?.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/pending"],
};
