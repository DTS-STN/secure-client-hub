import { GetServerSidePropsContext } from 'next'

export function addCookie(
  res: GetServerSidePropsContext['res'],
  name: string,
  value: string,
  expiry: number,
) {
  let setCookieHeader = res.getHeader('Set-Cookie')
  if (setCookieHeader === undefined) {
    setCookieHeader = []
  }
  const cookies = setCookieHeader as string[]
  const expiryString = getTimeFromNow(expiry)
  cookies.push(`${name}=${value}; Max-Age=${expiryString}; path=/;`)
  res.setHeader('Set-Cookie', cookies)
}

export function extendExpiryTime(
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res'],
  cookieName: string,
  expiry: number,
) {
  const cookieValue = getCookieValue(
    cookieName,
    req.cookies,
    process.env.AUTH_COOKIE_PREFIX,
  )
  addCookie(
    res,
    process.env.AUTH_COOKIE_PREFIX + cookieName,
    cookieValue as string,
    expiry,
  )
}

export function deleteCookieWithName(
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res'],
  givenCookieName: string,
) {
  let setCookieHeader = res.getHeader('Set-Cookie')
  if (setCookieHeader === undefined) {
    setCookieHeader = []
  }
  const cookies = setCookieHeader as string[]
  for (const cookieName of Object.keys(req.cookies)) {
    if (cookieName === givenCookieName) {
      cookies.push(`${cookieName}=deleted; Max-Age=0; path=/;`)
    }
  }
  res.setHeader('Set-Cookie', cookies as string[])
}

export function deleteAllCookiesWithPrefix(
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res'],
  prefix: string,
) {
  let setCookieHeader = res.getHeader('Set-Cookie')
  if (setCookieHeader === undefined) {
    setCookieHeader = []
  }
  const cookies = setCookieHeader as string[]
  for (const cookieName of Object.keys(req.cookies)) {
    if (cookieName.startsWith(prefix)) {
      cookies.push(`${cookieName}=deleted; Max-Age=0; path=/`)
    }
  }
  res.setHeader('Set-Cookie', cookies as string[])
}

export function getCookieValue(
  givenCookieName: string,
  cookies: Partial<{ [key: string]: string }>,
  cookiePrefix?: string,
) {
  cookiePrefix = cookiePrefix ? cookiePrefix : ''
  for (const cookieName of Object.keys(cookies)) {
    if (cookieName === cookiePrefix + givenCookieName) {
      return cookies[cookieName]
    }
  }

  return null
}

function getTimeFromNow(secondsFromNow: number) {
  const now = new Date()
  const time = now.getTime()
  const timeFromNow = time + secondsFromNow
  now.setTime(timeFromNow)
  return now.toUTCString()
}
