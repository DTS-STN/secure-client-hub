import { NextRequest, NextResponse } from 'next/server'

//regex to check if there's an extension in the path, ie .jpg
const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  const { nextUrl, url } = req
  const { locale, pathname } = nextUrl
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return
  }

  if (locale === 'und' && !pathname.endsWith('/')) {
    return NextResponse.redirect(new URL(`/en${pathname}`, url))
  }

  // //Redirect for index page as it's meant to be bilingual so we don't want users navigating to /en or /fr
  // if ((locale === 'en' || locale === 'fr') && pathname === '/') {
  //   return NextResponse.redirect(new URL(`/`, url))
  // }

  return NextResponse.next()
}
