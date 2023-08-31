import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  if (req.nextUrl.locale === 'und' && !req.nextUrl.pathname.endsWith('/')) {
    return NextResponse.redirect(
      new URL(`/en${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    )
  }

  //Redirect for index page as it's meant to be bilingual so we don't want users navigating to /en or /fr
  if (
    (req.nextUrl.locale === 'en' || req.nextUrl.locale === 'fr') &&
    req.nextUrl.pathname === '/'
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}
