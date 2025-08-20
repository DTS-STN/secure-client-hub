import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { setInboxPref } from '../../lib/inbox-preferences'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions)
  const name = session?.user.name
  const spid = name ? name.split('|')[1] : ''
  const pref = req.query['pref'] ? req.query['pref'].toString() : ''
  const locale = req.query['locale'] ? req.query['locale'].toString() : ''
  console.log('spid ' + spid + ' pref ' + pref)
  setInboxPref(spid, pref)
  let redirectDestination =
    locale === 'en'
      ? '/inbox-notification-preferences-success'
      : '/preferences-notification-boite-reception-success'
  // TODO: don't swap redirect
  redirectDestination = '/my-dashboard'
  res.redirect(redirectDestination)
}
