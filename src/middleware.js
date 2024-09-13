import { NextResponse } from "next/server";
import { i18n } from "../i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import { cookies } from 'next/headers'
import { getLocale } from "@/utils/path-name";

function getNextLocale(request) {

    // Get the languages from cookies
    const cookie = cookies(request).get('NEXT_LOCALE');
    const language = cookie ? cookie.value : i18n.defaultLocale;

    // Use negotiator and intl-localematcher to get best locale
    const locales = i18n.locales;

    const locale = matchLocale(language, locales, i18n.defaultLocale);

    return locale;
}

const protectedRoutes = [
    '/en/events',
    '/es/events',
    '/en/my-events',
    '/es/my-events',
    '/en/reservations',
    '/es/reservations',
    '/en/create-event',
    '/es/create-event'
];

export function middleware(request) {
    const pathname = request.nextUrl.pathname;

    // Check if the user is authenticated
    const sessionCookie = cookies(request).get('next-auth.session-token');
    const sessionToken = sessionCookie ? sessionCookie.value : null;

    const isProtectedRoute = protectedRoutes.includes(pathname);
    const currentLocale = getLocale(pathname) || "";
    if (isProtectedRoute && !sessionToken) {
        return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getNextLocale(request);

        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                request.url
            )
        );
    }


}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
