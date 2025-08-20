import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { setInboxPref } from '../../lib/inbox-preferences'
import { redirect } from 'next/navigation'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions)
  const name = session?.user.name
  const spid = name ? name.split('|')[1] : ''
  const pref = req.query['pref'] ? req.query['pref'].toString() : ''
  const locale = req.query['locale'] ? req.query['locale'].toString() : ''
  setInboxPref(spid, pref)
  const redirectDestination =
    locale === 'en'
      ? '/en/inbox-notification-preferences-success'
      : '/fr/preferences-notification-boite-reception-success'
  redirect(redirectDestination)
}
