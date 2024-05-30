import axios from 'axios'
import https from 'https'
import fs from 'fs'
import { getLogger } from '../../logging/log-util'
import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { AuthIsValid } from '../../lib/auth'

export type ResponseData = {
  status: string
  components: {
    db: {
      status: string
      components: {
        mscaDataSource: {
          status: string
        }
        mscaseDataSource: {
          status: string
        }
      }
    }
    dbsWebService: {
      status: string
    }
    diskSpace: {
      status: string
    }
    itrdsWebService: {
      status: string
    }
    meiioWebService: {
      status: string
    }
    ping: {
      status: string
    }
    sepWebService: {
      status: string
    }
    sirWebService: {
      status: string
    }
    vanillaClientProfileService: {
      status: string
    }
  }
}

//The below sets the minimum logging level to error and surpresses everything below that
const logger = getLogger('brz-health')
logger.level = 'warn'

//Create httpsAgent to read in cert to make BRZ call
const httpsAgent =
  process.env.AUTH_DISABLED === 'true'
    ? new https.Agent()
    : new https.Agent({
        ca: fs.readFileSync(
          '/usr/local/share/ca-certificates/env.crt' as fs.PathOrFileDescriptor,
        ),
      })

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const session = await getServerSession(req, res, authOptions)
  if (await AuthIsValid(req, session))
    axios({
      method: 'get',
      url: `https://${process.env.HOSTALIAS_HOSTNAME}${process.env.MSCA_NG_HEALTH_ENDPOINT}`,
      headers: {
        'Authorization': `Basic ${process.env.MSCA_NG_CREDS}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: httpsAgent,
    })
      .then((response) => {
        logger.debug(response)
        res.status(200).json({
          status: response.data.status,
          components: {
            db: {
              status: response.data.components.db.status,
              components: {
                mscaDataSource: {
                  status:
                    response.data.components.db.components.mscaDataSource
                      .status,
                },
                mscaseDataSource: {
                  status:
                    response.data.components.db.components.mscaseDataSource
                      .status,
                },
              },
            },
            dbsWebService: {
              status: response.data.components.dbsWebService.status,
            },
            diskSpace: {
              status: response.data.components.diskSpace.status,
            },
            itrdsWebService: {
              status: response.data.components.itrdsWebService.status,
            },
            meiioWebService: {
              status: response.data.components.meiioWebService.status,
            },
            ping: {
              status: response.data.components.ping.status,
            },
            sepWebService: {
              status: response.data.components.sepWebService.status,
            },
            sirWebService: {
              status: response.data.components.sirWebService.status,
            },
            vanillaClientProfileService: {
              status:
                response.data.components.vanillaClientProfileService.status,
            },
          },
        })
      })
      .catch((error) => {
        logger.error(error)
        res.status(400)
      })
  else {
    res.status(401)
  }
}
