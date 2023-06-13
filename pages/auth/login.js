import { useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { LoadingSpinner } from '@dts-stn/service-canada-design-system'
import { useRouter } from 'next/router'

const Login = (props) => {
  const router = useRouter()

  //signIn('ecasProvider')
  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.error) {
      signIn('ecasProvider', {
        callbackUrl: `${window.location.origin}/my-dashboard`,
      })
    }
  }, [router.isReady, router.query.error])
  return (
    <div className="grid h-screen place-items-center">
      <LoadingSpinner text="Loading / Chargement en cours ..." />
    </div>
  )
}

Login.getLayout = function PageLayout(page) {
  return <>{page}</>
}

export default Login
