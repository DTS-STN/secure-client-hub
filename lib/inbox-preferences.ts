import axios from 'axios'
import { getLogger } from '../logging/log-util'
import https from 'https'
import fs from 'fs'

const logger = getLogger('lib.inbox-pref')

//Create httpsAgent to read in cert to make BRZ call
const httpsAgent =
  process.env.AUTH_DISABLED === 'true'
    ? new https.Agent()
    : new https.Agent({
        ca: fs.readFileSync(
          '/usr/local/share/ca-certificates/env.crt' as fs.PathOrFileDescriptor,
        ),
      })

export async function getInboxPref(spid: string) {
  try {
    logger.trace('before getInboxPref request')
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
        httpsAgent: httpsAgent,
      },
    )
    const respData = resp.data[0]
    logger.trace('getInboxPref response ' + respData.toString())
    return respData
  } catch (err) {
    logger.error(err)
    // TODO: Maybe re-emit error here?
  }
  return null
}

export async function setInboxPref(spid: string, pref: string) {
  logger.trace('start setInboxPref')
  const eventCode = pref === 'yes' ? 'PAPERLESS' : 'MAIL'
  const inboxPref = await getInboxPref(spid)
  const id = inboxPref.id
  if (id) {
    logger.trace('before setInboxPref req')
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
          httpsAgent: httpsAgent,
        },
      )
      .then(() => {
        // nothing needs to be done
      })
      .catch((err) => {
        logger.error(err)
        throw err
      })
    logger.trace('setInboxPref complete')
  } else {
    logger.error('unable to find ID for spid ' + spid)
    throw new Error('unable to find id')
  }
}
