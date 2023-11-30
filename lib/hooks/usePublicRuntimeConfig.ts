import { useMemo } from 'react'

import getConfig from 'next/config'

import { publicRuntimeConfigSchema } from '../schemas/public-runtime-config-schema'

export const usePublicRuntimeConfig = () => {
  const config = getConfig()

  const { LOGGING_LEVEL, ENVIRONMENT } = config?.publicRuntimeConfig ?? {}

  return useMemo(
    () =>
      publicRuntimeConfigSchema.validateSync({
        LOGGING_LEVEL,
        ENVIRONMENT,
      }),
    [LOGGING_LEVEL, ENVIRONMENT]
  )
}
