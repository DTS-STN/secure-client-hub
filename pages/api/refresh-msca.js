/*
 * Touch MSCA session is an endpoint exposed for the client to refresh ECAS session timers on action or page load
 *
 */

import { AuthIsDisabled, AuthIsValid } from '../../lib/auth'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    //Send request to ECAS to refresh MSCA session
    if (AuthIsDisabled()) {
      //Service unavailable when auth is disabled
      res.status(503).json({ success: false })
    } else if (await AuthIsValid(req)) {
      res.status(200).json({ success: true })
    } else {
      res.status(500).json({ success: false })
    }
  } else {
    //return unimplemented
    res.status(501).json({ success: false })
  }
  return res
}
