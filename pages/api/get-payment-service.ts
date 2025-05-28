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
    getLastPaymentAmount: async (sin: string, program: string) => {
      console.log(sin + ' ' + program)
      return 1234
    },
    getNextPaymentAmount: async (sin: string, program: string) => {
      console.log(sin + ' ' + program)
      return 1234
    },
    getLastPaymentDate: async (sin: string, program: string) => {
      console.log(sin + ' ' + program)
      return new UTCDate()
    },
    getNextPaymentDate: async (sin: string, program: string) => {
      console.log(sin + program)
      return new UTCDate()
    },
  }
}
