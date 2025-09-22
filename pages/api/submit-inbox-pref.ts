import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { setInboxPref } from '../../lib/inbox-preferences'
import { getLogger } from '../../logging/log-util'

const logger = getLogger('submit-inbox-api')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions)
  const name = session?.user.name
  const spid = name ? name.split('|')[1] : ''
  const pref = req.query['pref'] ? req.query['pref'].toString() : '' // user input, potentially unsafe
  const locale = req.query['locale'] ? req.query['locale'].toString() : '' // user input, potentially unsafe
  const safePref = pref === 'no' ? 'no' : 'yes'

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  try {
    await setInboxPref(spid, safePref)
    const redirectDestination =
      locale === 'en'
        ? '/inbox-notification-preferences-success'
        : '/preferences-notification-boite-reception-succes'
    res.redirect(redirectDestination)
  } catch (error) {
    logger.error(error)
    res.redirect('/500')
  }
}
