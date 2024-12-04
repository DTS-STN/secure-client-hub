import { useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../components/LoadingSpinner'
import MetaData from '../../components/MetaData'
import getRedisService from '../api/redis-service.ts'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import {
  AuthIsDisabled,
  AuthIsValid,
  ValidateSession,
  getIdToken,
} from '../../lib/auth'
import { NextResponse } from 'next/server'

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

      router.push(authorizationUrl)
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

export async function getServerSideProps({ req, res, locale }) {
  //Temporary for testing purposes until auth flow is publicly accessible
  const authDisabled = AuthIsDisabled() ? true : false

  const session = await getServerSession(req, res, authOptions)
  const token = await getIdToken(req)

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

  const getResponse = async () => {
    const redirectUrl = '/oauth-callback'
    const loginResponse = await fetch(
      '/api/login-msca?redirect_url=' + redirectUrl,
    )
    //{ authorizationUrl, jwksUrl, codeVerifier, nonce, state, client } =
    return await loginResponse.json()
  } //TODO change to POST?

  const retrieveRedisService = async () => {
    return await getRedisService()
  }

  const redisService = retrieveRedisService()
  const response = getResponse()

  redisService.set('jwksUrl', response.jwksUrl)
  redisService.set('client', client)
  redisService.set('codeVerifier', codeVerifier)
  redisService.set('nonce', nonce)
  redisService.set('state', state)
  redisService.set('redirectUrl', redirectUrl)

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
    },
  }
}
