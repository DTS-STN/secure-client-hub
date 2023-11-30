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

export const allowedEnvironments: string[] = ['production', 'development']

export const publicRuntimeConfigSchema = yup.object({
  LOGGING_LEVEL: yup
    .string()
    .oneOf(
      levelsWithSilent,
      'Env. variable ${path} must be one of the following values: ${values}'
    ),
  ENVIRONMENT: yup
    .string()
    .oneOf(
      allowedEnvironments,
      'Env. variable ${path} must be one of the following values: ${values}'
    ),
})
