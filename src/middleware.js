import { NextResponse } from "next/server";
import { verify } from "./helper/jwtverify";

// import { NextRequest } from "next/server";
// const key = process.env.JWT_SECRETKEY;


export async function middleware(req) {
    const { cookies, nextUrl } = req;
    const { protocol, host } = nextUrl;
    const jwt = cookies.get('authToken')?.value;
    const url = req.url;

    if (url.includes('/login')) {
        if (!jwt) {
            return NextResponse.next();
        } else {
            try {
                await verify(jwt);
                return NextResponse.redirect(`${protocol}//${host}/admin/dashboard`);
            } catch (error) {
                return NextResponse.next();
            }

        }

    }
    if (url.includes('/dashboard')) {
        if (!jwt) {
            return NextResponse.redirect(`${protocol}//${host}/admin/login`);
        }
        if (jwt) {
            try {
                await verify(jwt);
                // console.log( "verified")
                return NextResponse.next();
            } catch (e) {
                // console.error("Token verification failed, redirecting to login", e);
                return NextResponse.redirect(`${protocol}//${host}/admin/login`);
            }
        }

    }


    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*'
}