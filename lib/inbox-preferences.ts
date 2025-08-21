import axios from 'axios'
import { getLogger } from '../logging/log-util'

const logger = getLogger('lib.inbox-pref')

export async function getInboxPref(spid: string) {
  try {
    const resp = await axios.get(
      `https://${process.env.HOSTALIAS_HOSTNAME}${process.env.MSCA_NG_INBOX_GET_ENDPOINT}`,
      {
        params: {
          'program-code': 'CFOB',
          'Spid': spid,
        },
        headers: {
          'authorization': `Basic ${process.env.MSCA_NG_CREDS}`,
          'Content-Type': 'application/json',
        },
      },
    )
    const respData = resp.data[0]
    return respData
  } catch (err) {
    logger.error(err)
    // TODO: Maybe re-emit error here?
  }
  return null
}

export async function setInboxPref(spid: string, pref: string) {
  const eventCode = pref === 'yes' ? 'PAPERLESS' : 'MAIL'
  const inboxPref = await getInboxPref(spid)
  const id = inboxPref.id
  if (id) {
    await axios
      .post(
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
      .then(() => {
        // nothing needs to be done
      })
      .catch((err) => {
        logger.error(err)
        throw err
      })
  } else {
    logger.error('unable to find ID for spid ' + spid)
    throw new Error('unable to find id')
  }
}
