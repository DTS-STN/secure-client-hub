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

  const endpoint = searchParams.get('endpoint')
  //Redirect from splash page if Lang parameter is supplied when redirecting from MSCA
  switch (searchParams.get('Lang')) {
    case 'fra': {
      const frenchRedirectUrl = new URL(`/fr/mon-tableau-de-bord`, url)
      if (endpoint) {
        frenchRedirectUrl.searchParams.append('endpoint', endpoint)
      }
      return NextResponse.redirect(frenchRedirectUrl)
    }
    case 'eng': {
      const englishRedirectUrl = new URL(`/en/my-dashboard`, url)
      if (endpoint) {
        englishRedirectUrl.searchParams.append('endpoint', endpoint)
      }
      return NextResponse.redirect(englishRedirectUrl)
    }
  }

  //Redirect rule that makes English appear as the default language instead of und
  if (locale === 'und' && !pathname.endsWith('/')) {
    return NextResponse.redirect(new URL(`/en${pathname}`, url))
  }

  //Redirect for index page as it's meant to be bilingual so we don't want users navigating to /en or /fr
  if ((locale === 'en' || locale === 'fr') && pathname === '/') {
    return NextResponse.redirect(new URL(`/`, url))
  }

  if (
    locale === 'en' &&
    (pathname.endsWith('/mon-tableau-de-bord') ||
      pathname.endsWith('/notifications-boite-reception-disponibles'))
  ) {
    // I do not understand why we refuse to redirect correctly
    return NextResponse.redirect(new URL(`/fr${pathname}`, url))
  }

  //Redirect for index page as we don't want users navigating to this page on prod
  if (pathname === '/' && process.env.ENVIRONMENT === 'production') {
    return NextResponse.redirect(new URL(`/en/my-dashboard`, url))
  }

  return NextResponse.next()
}
