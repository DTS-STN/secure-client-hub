import { createClient } from 'redis'

import moize from 'moize'

//import { getEnv } from '~/utils/env.server';
import { getLogger } from '../../logging/log-util'

const log = getLogger('redis-service.server')

/**
 * Return a singleton instance (by means of memomization) of the redis service.
 */
export const getRedisService = moize.promise(createRedisService, {
  onCacheAdd: () => log.info('Creating new redis service'),
})

async function createRedisService() {
  // const env = getEnv();

  const redisClient = createClient({
    password: 'foobared',
    //url: 'redis://redis:6379',
  })

  await redisClient.connect()

  return {
    get: async (key: string) => {
      const value = await redisClient.get(key)
      return value ? JSON.parse(value) : null
    },
    set: async (key: string, value: unknown) => {
      return redisClient.set(key, JSON.stringify(value))
    },
    del: async (key: string) => {
      return redisClient.del(key)
    },
  }
}
