import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { getInboxPref } from '../../lib/inbox-preferences'
import { getLogger } from '../../logging/log-util'

const logger = getLogger('welcome')
// TODO: Improve user experience by making this similar to login screen?
export default async function welcome(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions)
  const name = session?.user.name
  const spid = name ? name.split('|')[1] : ''

  const locale = req.query['locale'] ? req.query['locale'].toString() : '' // user input, potentially unsafe
  const safeLocale = locale === 'en' ? 'en' : 'fr'

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  try {
    const resp = await getInboxPref(spid)
    logger.trace('resp ' + resp.toString())
    const noNotificationPref = resp.subscribedEvents.length === 0
    const redirectDestination = noNotificationPref
      ? getResUrl(safeLocale)
      : getDashboardUrl(safeLocale)
    logger.trace('redirecting to ' + redirectDestination)
    res.redirect(redirectDestination)
  } catch {
    const redirectDestination = getDashboardUrl(safeLocale)
    logger.trace('catch redirecting to ' + redirectDestination)
    res.redirect(redirectDestination)
  }
}

function getResUrl(locale: string) {
  return locale === 'en'
    ? '/inbox-notifications-now-available'
    : '/notifications-boite-reception-disponibles'
}

function getDashboardUrl(locale: string) {
  return locale === 'en' ? '/my-dashboard' : '/mon-tableau-de-bord'
}
