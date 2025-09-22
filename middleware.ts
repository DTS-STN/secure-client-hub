import { NextRequest, NextResponse } from 'next/server'
import { getLogger } from './logging/log-util'

//regex to check if there's an extension in the path, ie .jpg
const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  const { nextUrl, url } = req
  const { locale, pathname, searchParams } = nextUrl
  const logger = getLogger('middleware')

  logger.trace(`Incoming request for [${url}]`)

  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return
  }

  const link = searchParams.get('link')
  //Redirect from splash page if Lang parameter is supplied when redirecting from MSCA
  if (pathname === '/') {
    switch (searchParams.get('Lang')) {
      case 'fra': {
        const frenchRedirectUrl = new URL(`/fr/mon-tableau-de-bord`, url)
        if (link) {
          for (const [key, val] of searchParams) {
            frenchRedirectUrl.searchParams.append(key, val)
          }
        }
        return NextResponse.redirect(frenchRedirectUrl)
      }
      case 'eng': {
        const englishRedirectUrl = new URL(`/en/my-dashboard`, url)
        if (link) {
          for (const [key, val] of searchParams) {
            englishRedirectUrl.searchParams.append(key, val)
          }
        }
        return NextResponse.redirect(englishRedirectUrl)
      }
    }
  }

  //Redirect for index page as it's meant to be bilingual so we don't want users navigating to /en or /fr
  if ((locale === 'en' || locale === 'fr') && pathname === '/') {
    return NextResponse.redirect(new URL(`/`, url))
  }

  // I do not understand why we refuse to redirect correctly
  if (locale !== 'fr' && pathname.endsWith('/mon-tableau-de-bord')) {
    return NextResponse.redirect(new URL(`/fr/mon-tableau-de-bord`, url))
  }
  if (locale !== 'fr' && pathname.endsWith('/boite-reception-disponibles')) {
    return NextResponse.redirect(
      new URL(`/fr/boite-reception-disponibles`, nextUrl.origin),
    )
  }
  if (
    locale !== 'fr' &&
    pathname.endsWith('/preferences-notification-boite-reception-succes')
  ) {
    return NextResponse.redirect(
      new URL(
        `/fr/preferences-notification-boite-reception-succes`,
        nextUrl.origin,
      ),
    )
  }

  //Redirect rule that makes English appear as the default language instead of und
  if (locale === 'und' && !pathname.endsWith('/')) {
    return NextResponse.redirect(new URL(`/en${pathname}`, url))
  }

  //Redirect for index page as we don't want users navigating to this page on prod
  if (pathname === '/' && process.env.ENVIRONMENT === 'production') {
    return NextResponse.redirect(new URL(`/en/my-dashboard`, url))
  }

  return NextResponse.next()
}
