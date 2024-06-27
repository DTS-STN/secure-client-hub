import { TextEncoder, TextDecoder } from 'util'

Object.assign(global, { TextDecoder, TextEncoder })

// for testing locally comment.
// process.env.AUTH_DISABLED= "true"
