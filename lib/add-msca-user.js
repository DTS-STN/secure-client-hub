'use server'

import { getLogger } from '../logging/log-util'

const logger = getLogger('auth-helpers')

export async function AddMscaUser(pid, spid) {
    logger.error('got here')
    const response = await fetch(process.env.MSCA_BASE_URL + `/api/v1/users`,
        {
          'method': 'POST',
          'Content-Type': 'application/json',
          'body' : JSON.stringify(
            {
              'pid': pid,
              'spid': spid
            }
          )
        }
    )
    .then((response) => response)
    .catch((error) => logger.error(error));
    logger.error("blublue" + pid + ' ' + spid)
    console.error('blueblue' + pid)
    return response.ok;
  }