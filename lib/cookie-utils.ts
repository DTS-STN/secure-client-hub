import { GetServerSidePropsContext } from 'next'

export function addCookie(
  res: GetServerSidePropsContext['res'],
  name: string,
  value: string,
  expiry: number,
) {
  const setCookieHeader = res.getHeader('Set-Cookie')
  const cookies = setCookieHeader as string[]
  const expiryString = getTimeFromNow(expiry)
  cookies.push(
    'Set-Cookie',
    `${name}=${value}; Max-Age=${expiryString}; path=/`,
  )
  res.setHeader('Set-Cookie', cookies)
}

export function extendExpiryTime(
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res'],
  cookieName: string,
  expiry: number,
) {
  const cookieValue = getCookieValue(cookieName, req.cookies)
  addCookie(res, cookieName, cookieValue as string, expiry)
}

export function deleteAllCookiesWithPrefix(
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res'],
  prefix: string,
) {
  const cookies = []
  for (const cookie of Object.keys(req.cookies)) {
    if (cookie.startsWith(prefix)) {
      cookies.push(`${cookie}=deleted; Max-Age=0; path=/`)
    }
  }
  res.setHeader('Set-Cookie', cookies as string[])
}

export function getCookieValue(
  givenCookieName: string,
  cookies: Partial<{ [key: string]: string }>,
) {
  for (const cookieName of Object.keys(cookies)) {
    if (cookieName.match(givenCookieName)) {
      const splitCookie = cookies[cookieName]?.split('=')
      if (splitCookie) {
        return splitCookie[0]
      } else {
        return null
      }
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
