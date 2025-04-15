import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LanguageType } from "./i18n.config";


function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  
    const locales: LanguageType[] = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    let locale = "";
  
    try {
      locale = matchLocale(languages, locales, i18n.defaultLocale);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      locale = i18n.defaultLocale;
    }
    return locale;
  }
  


//request: NextRequest عشان الفانكشن بترجع ريكويست للسرفر هنسميه ريكويست والتايب بتاعو NextRequest
export function middleware(request: NextRequest){

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url" , request.url); // عشان يرجعلى الهيدر بتاع البيدج الى واقع فيها 
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}`)
      );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
          new URL(`/${locale}${pathname}`, request.url)
        );
      }

    return NextResponse.next({  // هنا بحدد الريكويست الى هيرجع 
        request:{
            headers: requestHeaders,
        }
    });

}

export const config = { // الكونفج دا بعملو وبحد فيه الراوتس الى لما ادخل فيها ميعتبرهاش من ضمن اللوكاليزيشن
    // Matcher ignoring `/_next/`, `/api/`, ..etc
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
  };