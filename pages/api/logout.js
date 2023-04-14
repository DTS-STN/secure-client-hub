/*
 * Logout from MSCA session
 *
 */

import { AuthIsDisabled, Logout } from '../../lib/auth'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    //Send request to ECAS to logout from MSCA session
    if (AuthIsDisabled()) {
      //Service unavailable when auth is disabled
      res.status(503).json({ success: false })
    } else if (await Logout(req)) {
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
