import axios from 'axios'
import { getLogger } from '../logging/log-util'

const logger = getLogger('lib.inbox-pref')

const alwaysSucceed = alwaysSucc()

function alwaysSucc() {
  return true
}

export async function getInboxPref() {
  if (alwaysSucceed) {
    //console.log(session.spid)
    try {
      const resp = await axios.post(
        `https://${process.env.HOSTALIAS_HOSTNAME}${process.env.MSCA_NG_USER_ENDPOINT}/v4/user-profiles/user-profiles-with-events`,
        {
          params: {
            programCode: 'CFOB',
            spid: '', //session.spid,
          },
          headers: {
            'authorization': `Basic ${process.env.MSCA_NG_CREDS}`,
            'Content-Type': 'application/json',
          },
        },
      )
      logger.debug(resp)
      return resp.data.json()
    } catch (err) {
      logger.error(err)
      // TODO: Maybe re-emit error here?
    }
  }
  return null
}

export async function setInboxPref(pref: string) {
  const eventCode = pref === 'yes' ? 'PAPERLESS' : 'MAIL'
  if (alwaysSucceed) {
    const inboxPref = await getInboxPref()
    const id = inboxPref.id
    if (id) {
      try {
        await axios.post(
          `https://${process.env.HOSTALIAS_HOSTNAME}${process.env.MSCA_NG_USER_ENDPOINT}/v3/user-profiles/${id}/subscribe`,
          {
            eventCodes: [eventCode],
          },
          {
            headers: {
              'authorization': `Basic ${process.env.MSCA_NG_CREDS}`,
              'Content-Type': 'application/json',
            },
          },
        )
      } catch (err) {
        logger.error(err)
        throw err
      }
    }
  }
}
