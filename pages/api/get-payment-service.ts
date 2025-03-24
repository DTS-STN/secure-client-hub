import moize from 'moize'
import { UTCDate } from '@date-fns/utc'
import { getLogger } from '../../logging/log-util'

const log = getLogger('payment-service')

/**
 * Return a singleton instance (by means of memomization) of the payment service.
 */
export const getPaymentService = moize.promise(createPaymentService, {
  onCacheAdd: () => log.info('Creating new payment service'),
})

async function createPaymentService() {
  return {
    getLastPaymentAmount: async () => {
      return 1234
    },
    getNextPaymentAmount: async () => {
      return 1234
    },
    getLastPaymentDate: async () => {
      return new UTCDate()
    },
    getNextPaymentDate: async () => {
      return new UTCDate()
    },
  }
}
