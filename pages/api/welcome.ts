import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import { getInboxPref } from '../../lib/inbox-preferences'

// TODO: Improve user experience by making this similar to login screen?
export default async function welcome(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions)
  const name = session?.user.name
  const spid = name ? name.split('|')[1] : ''
  const spid2 = session?.user.spid2

  console.log('spid ' + spid + ' spid2 ' + spid2)
  const locale = req.query['locale'] ? req.query['locale'].toString() : '' // user input, potentially unsafe
  const safeLocale = locale === 'en' ? 'en' : 'fr'

  try {
    const resp = await getInboxPref(spid)
    const noNotificationPref = resp.subscribedEvents.length === 0
    const redirectDestination = noNotificationPref
      ? getResUrl(safeLocale)
      : getDashboardUrl(safeLocale)
    res.redirect(redirectDestination)
  } catch {
    res.redirect(getDashboardUrl(safeLocale))
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
