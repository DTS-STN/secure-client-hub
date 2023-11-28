import { LevelWithSilent } from 'pino'
import * as yup from 'yup'

export const levelsWithSilent: ReadonlyArray<LevelWithSilent> = [
  'debug',
  'error',
  'fatal',
  'info',
  'silent',
  'trace',
  'warn',
]

export const publicRuntimeConfigSchema = yup.object({
  LOGGING_LEVEL: yup
    .string()
    .oneOf(
      levelsWithSilent,
      'Env. variable ${path} must be one of the following values: ${values}'
    ),
})
