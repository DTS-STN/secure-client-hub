import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { AuthIsDisabled } from '../../lib/auth'
import { LoadingSpinner } from '@dts-stn/service-canada-design-system'

export default function Login(props) {
  const router = useRouter()

  //signIn('ecasProvider')
  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.error) {
      //If auth is disabled, redirect to dashboard without triggering signIn event, for testing purposes only
      if (props.authDisabled) {
        router.push('/my-dashboard')
        return
      }
      signIn('ecasProvider', {
        callbackUrl: `${window.location.origin}/my-dashboard`,
      })
    }
  }, [router.isReady, props.authDisabled, router])
  return (
    <div className="grid h-screen place-items-center" data-cy="loading-spinner">
      <LoadingSpinner text="Loading / Chargement en cours ..." />
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
