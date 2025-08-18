import axios from 'axios'
import { getLogger } from '../logging/log-util'

const logger = getLogger('lib.inbox-pref')

const alwaysSucceed = alwaysSucc()

function alwaysSucc() {
  return true
}

export async function getInboxPref(spid: string) {
  if (alwaysSucceed) {
    //console.log(session.spid)
    try {
      const resp = await axios.post(
        `https://${process.env.HOSTALIAS_HOSTNAME}${process.env.MSCA_NG_INBOX_GET_ENDPOINT}`,
        {
          params: {
            programCode: 'CFOB',
            spid: spid,
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

export async function setInboxPref(spid: string, pref: string) {
  const eventCode = pref === 'yes' ? 'PAPERLESS' : 'MAIL'
  if (alwaysSucceed) {
    const inboxPref = await getInboxPref(spid)
    const id = inboxPref.id
    if (id) {
      try {
        await axios.post(
          `https://${process.env.HOSTALIAS_HOSTNAME}${process.env.MSCA_NG_INBOX_SET_ENDPOINT}${id}/subscribe`,
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
