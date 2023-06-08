import { useEffect } from 'react'
import { getLogoutURL, AuthIsDisabled } from '../../lib/auth'
import { LoadingSpinner } from '@dts-stn/service-canada-design-system'

export default function Logout(props) {
  //Redirect to ECAS global sign out
  useEffect(() => {
    window.location.replace(props.logoutURL)
  }, [props.logoutURL])

  return (
    <div className="grid h-screen place-items-center">
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
      locale,
      logoutURL: logoutURL,
    },
  }
}
