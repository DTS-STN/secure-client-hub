import { useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../components/LoadingSpinner'
import MetaData from '../../components/MetaData'
import { getRedisService } from '../api/redis-service'
import { getOpenIdClientService } from '../api/openid-client-service'
import { GetServerSidePropsContext } from 'next'
import {
  AuthIsDisabled,
  AuthIsValid,
  ValidateSession,
  getIdToken,
} from '../../lib/auth'
import { generators } from 'openid-client'
import React from 'react'
import { CircuitBreaker } from '../../lib/circuit-breaker'
import moize from 'moize'

interface MetaDataProps {
  data_en: {
    title: string
    desc: string
    author: string
    keywords: string
    service: string
    creator: string
    accessRights: string
  }
  data_fr: {
    title: string
    desc: string
    author: string
    keywords: string
    service: string
    creator: string
    accessRights: string
  }
}

interface LoginProps {
  locale?: string | undefined
  meta: MetaDataProps
  authDisabled: boolean
  authorizationUrl: string
}

export default function Login(props: LoginProps) {
  const router = useRouter()

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

      router.push(props.authorizationUrl)
    }
  }, [
    router.isReady,
    props.authDisabled,
    router,
    props.locale,
    props.authorizationUrl,
  ])

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

Login.getLayout = function PageLayout(page: JSX.Element) {
  return <>{page}</>
}

async function actuallyGetServerSideProps(
  locale: GetServerSidePropsContext['locale'],
) {
  const redisService = await getRedisService()
  const authDisabled = AuthIsDisabled() ? true : false

  const idToken = await getIdToken()

  //If id token is available and not expired, check to see if ECAS session is and then redirect to dashboard instead of reinitiating auth
  if (!authDisabled && (await AuthIsValid())) {
    const sessionValid = await ValidateSession(
      process.env.CLIENT_ID as string,
      idToken?.sid,
    )
    if (sessionValid) {
      return {
        redirect: {
          destination:
            locale === 'en' ? '/en/my-dashboard' : '/fr/mon-tableau-de-bord',
          permanent: false,
        },
      }
    } else {
      redisService.del('idToken')
    }
  }

  const openIdClientService = getOpenIdClientService()
  const codeVerifier = generators.codeVerifier()
  const codeChallenge = generators.codeChallenge(codeVerifier)
  const scope = 'openid profile'
  const state = generators.state()
  const codeChallengeMethod = 'S256'
  const nonce = generators.nonce()

  const authorizationUrl = await (
    await openIdClientService
  ).authorize(scope, codeChallenge, codeChallengeMethod, state, nonce)

  redisService.set('codeVerifier', codeVerifier)
  redisService.set('nonce', nonce)
  redisService.set('state', state)

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
      locale: locale,
      meta,
      authDisabled: authDisabled,
      authorizationUrl: authorizationUrl,
    },
  }
}

const circuitBreaker = moize(createLoginCircuitBreaker, {
  onCacheAdd: () => console.log('creating login circuit breaker'),
})

function createLoginCircuitBreaker() {
  return new CircuitBreaker({})
}

export const getServerSideProps = async function ({
  locale,
}: {
  locale: GetServerSidePropsContext['locale']
}) {
  return await circuitBreaker().wrappedCallback(() =>
    actuallyGetServerSideProps(locale),
  )
}
