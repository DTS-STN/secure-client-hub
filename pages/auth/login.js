import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import LoadingSpinner from '../../components/LoadingSpinner'
import MetaData from '../../components/MetaData'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import {
  AuthIsDisabled,
  AuthIsValid,
  ValidateSession,
  getIdToken,
} from '../../lib/auth'

export default function Login(props) {
  const router = useRouter()

  //signIn('ecasProvider')
  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.error) {
      //If auth is disabled, redirect to dashboard without triggering signIn event, for testing purposes only
      if (props.authDisabled) {
        setTimeout(() => {
          props.locale === 'en'
            ? router.push('/en/my-dashboard')
            : router.push('/fr/mon-tableau-de-bord')
        }, 3000)
        return
      }

      const redirectTarget = props.redirectUrl
        ? props.ecasUrl + props.redirectUrl
        : props.locale === 'en'
          ? `${window.location.origin}/api/welcome?locale=en`
          : `${window.location.origin}/api/welcome?locale=fr`

      signIn('ecasProvider', {
        callbackUrl: redirectTarget,
      })
    }
  }, [router.isReady, props.authDisabled, router, props.locale])

  return (
    <div role="main">
      <MetaData language="en" data={props.meta}></MetaData>
      <h1
        className="grid h-screen place-items-center"
        data-cy="loading-spinner"
        aria-live="polite"
        aria-busy="true"
      >
        <LoadingSpinner text="Loading / Chargement en cours ..." />
      </h1>
    </div>
  )
}

Login.getLayout = function PageLayout(page) {
  return <>{page}</>
}

export async function getServerSideProps({ req, res, locale, query }) {
  //Temporary for testing purposes until auth flow is publicly accessible
  const authDisabled = AuthIsDisabled() ? true : false

  const session = await getServerSession(req, res, authOptions)
  const token = await getIdToken(req)
  const ecasUrl = process.env.AUTH_ECAS_BASE_URL
  // TODO: Compare vs a whitelist
  const queryRedirect = query.endpoint ? query.endpoint : ''

  //If Next-Auth session is valid, check to see if ECAS session is and then redirect to dashboard instead of reinitiating auth
  if (!AuthIsDisabled() && (await AuthIsValid(req, session))) {
    const sessionValid = await ValidateSession(
      process.env.CLIENT_ID,
      token?.sid,
    )
    if (sessionValid) {
      return {
        redirect: {
          destination:
            locale === 'en' ? '/en/my-dashboard' : '/fr/mon-tableau-de-bord',
          permanent: false,
        },
      }
    }
  }

  // If we get into the flow above and are already logged in, ignore redirect
  let redirectUrl = ''
  const isSecure = req.headers['x-forwarded-proto'] === 'https'
  if (queryRedirect) {
    // If there's a query parameter, it overrides any cookies
    res.setHeader(
      'Set-Cookie',
      `redirecturl=${queryRedirect}; max-age=900; path=/; samesite=strict ; HttpOnly; ${isSecure ? 'Secure;' : ''}`,
    )
    redirectUrl = queryRedirect
  } else {
    const redirectCookie = req.cookies.redirecturl
    if (redirectCookie) {
      // If there's no query parameter, set to the redirect cookie value
      redirectUrl = redirectCookie
    }
    // If there's no query paramater AND no cookie, return empty to trigger normal flow
  }

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'Loading-Chargement en cours - Canada.ca',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Loading-Chargement en cours - Canada.ca',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Emploi et Développement social Canada',
      accessRights: '1',
    },
  }

  return {
    props: {
      locale,
      meta,
      authDisabled: authDisabled ?? true,
      redirectUrl: redirectUrl,
      ecasUrl: ecasUrl,
    },
  }
}
