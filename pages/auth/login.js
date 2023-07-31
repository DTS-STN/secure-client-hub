import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { AuthIsDisabled } from '../../lib/auth'
import { LoadingSpinner } from '@dts-stn/service-canada-design-system'
import Head from 'next/head'

export default function Login(props) {
  const router = useRouter()

  //signIn('ecasProvider')
  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.error) {
      //If auth is disabled, redirect to dashboard without triggering signIn event, for testing purposes only
      if (props.authDisabled) {
        setTimeout(() => {
          router.push('/my-dashboard')
        }, 3000)
        return
      }
      signIn('ecasProvider', {
        callbackUrl: `${window.location.origin}/my-dashboard`,
      })
    }
  }, [router.isReady, props.authDisabled, router])
  return (
    <div role="main">
      <Head>
        {' '}
        <title>Loading-Chargement en cours</title>
      </Head>
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

  return {
    props: {
      authDisabled: authDisabled ?? true,
    },
  }
}
