import * as jwt from 'next-auth/jwt'
// import axios from 'axios'

export function AuthIsDisabled() {
  return (
    process.env.AUTH_DISABLED &&
    process.env.AUTH_DISABLED.toLowerCase() === 'true'
  )
}

export async function AuthIsValid(req, session) {
  const token = await jwt.getToken({ req })
  if (session && token) {
    if (token.provider !== 'credentials') {
      await ValidateSession(process.env.CLIENT_ID, token.sub)
    }
    return true
  }
  return false
}

export async function ValidateSession(clientId, sharedSessionId) {
  // console.log('Renewing session...')

  //Necessary to test locally until we no longer need the proxy. Will use request without proxy on deployed app
  //   process.env.AUTH_ON_PROXY &&
  //   process.env.AUTH_ON_PROXY.toLowerCase() === 'true'
  //     ? axios
  //         .get(
  //           process.env.AUTH_ECAS_REFRESH_ENDPOINT +
  //             `?client_id=${clientId}&shared_session_id=${sharedSessionId}`,
  //           {
  //             proxy: {
  //               protocol: 'http',
  //               host: 'localhost',
  //               port: 3128,
  //             },
  //           }
  //         )
  //         .then((response) => {
  //           if (response.data === true) {
  //             console.log('Session renewed!')
  //           }
  //         })
  //         .catch((error) => console.error(error))
  //     : axios
  //         .get(
  //           process.env.AUTH_ECAS_REFRESH_ENDPOINT +
  //             `?client_id=${clientId}&shared_session_id=${sharedSessionId}`
  //         )
  //         .then((response) => {
  //           if (response.data === true) {
  //             console.log('Session renewed!')
  //           }
  //         })
  //         .catch((error) => console.error(error))
  // }

  //Removed axios request for now until issue can be resolved so as to not bog up our logs
  console.log(
    process.env.AUTH_ECAS_REFRESH_ENDPOINT +
      `?client_id=${clientId}&shared_session_id=${sharedSessionId}`
  )
}

export async function getToken(req) {
  return jwt.getToken(req)
}

export async function getLogoutURL(req, session) {
  const token = await jwt.getToken({ req })
  console.log(session)

  if (session && token) {
    return (
      process.env.AUTH_ECAS_GLOBAL_LOGOUT_URL +
      `?client_id=${process.env.CLIENT_ID}&shared_session_id=${token.sub}`
    )
  }
  return
}

export function Redirect() {
  return {
    redirect: {
      permanent: false,
      destination: '/api/auth/signin',
    },
  }
}
