import { useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { LoadingSpinner } from '@dts-stn/service-canada-design-system'

const Login = (props) => {
  //signIn('ecasProvider')
  useEffect(() => {
    signIn('ecasProvider', {
      callbackUrl: `${window.location.origin}/my-dashboard`,
    })
  }, [])
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
