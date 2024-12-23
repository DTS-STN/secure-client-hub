/**
 * The RedisService is a service module for interacting with a Redis server. It
 * provides methods for getting, setting, and deleting values from Redis.
 *
 * The getRedisService() function creates a singleton instance of the Redis
 * client. The instance is lazy initialized as needed, so it will only be
 * created when a client requests it. This ensures that a single connection pool
 * is used for the entire application.
 *
 * Example usage:
 *
 *   const redisService = getRedisService({ url: 'redis://redis.example.com' });
 *   await redisService.set('key', 'value', { EX: 600 }); // expire in 10 minutes
 *   const value = await redisService.get('key');
 *   await redisService.del('key');
 *
 * @see https://redis.io/docs/connect/clients/nodejs/
 */
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

console.log('test')

async function createRedisService() {
  // const env = getEnv();

  const redisClient = createClient({
    password: 'foobared',
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
