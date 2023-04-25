import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { LoadingSpinner } from '@dts-stn/service-canada-design-system'

const bannerContent = {
  bannerBoldText: '',
  bannerText: '',
  bannerLink: '',
  bannerLinkHref: '',
}

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
  }, [router.isReady])
  return (
    <>
      <LoadingSpinner text="Loading / Chargement en cours ..." />
    </>
  )
}

Login.getLayout = function PageLayout(page) {
  return <>{page}</>
}

export default Login
