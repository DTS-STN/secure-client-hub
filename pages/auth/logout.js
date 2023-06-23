import { useEffect } from 'react'
import { getLogoutURL, AuthIsDisabled } from '../../lib/auth'
import { LoadingSpinner } from '@dts-stn/service-canada-design-system'
import { signOut } from 'next-auth/react'

export default function Logout(props) {
  //Redirect to ECAS global sign out
  useEffect(() => {
    const logout = async () => {
      await signOut({ redirect: false })
      window.location.replace(props.logoutURL)
    }
    logout().catch(console.error)
  }, [props.logoutURL])

  return (
    <div className="grid h-screen place-items-center" data-cy="loading-spinner">
      <LoadingSpinner text="Loading / Chargement en cours ..." />
    </div>
  )
}

Logout.getLayout = function PageLayout(page) {
  return <>{page}</>
}

export async function getServerSideProps({ req, res, locale }) {
  const logoutURL = !AuthIsDisabled()
    ? await getLogoutURL(req).catch((error) => {
        logger.error(error)
        res.statusCode = 500
        throw error
      })
    : '/'

  return {
    props: {
      logoutURL: logoutURL ?? '/',
    },
  }
}
