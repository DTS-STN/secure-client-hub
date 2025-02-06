import { NextApiRequest, NextApiResponse } from 'next'
import { register, collectDefaultMetrics } from 'prom-client'

/* istanbul ignore next */
collectDefaultMetrics({ prefix: 'omnidevfrontend_' })

/* istanbul ignore next */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-type', register.contentType)
  res.send(register.metrics())
}
