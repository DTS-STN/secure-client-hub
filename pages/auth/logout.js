import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getLogoutURL, AuthIsDisabled } from '../../lib/auth'
import { LoadingSpinner } from '@dts-stn/service-canada-design-system'

export default function Logout(props) {
  const router = useRouter()

  //Redirect to ECAS global sign out
  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.error) {
      router.push(props.logoutURL)
    }
  }, [router, props.logoutURL])

  return (
    <>
      <LoadingSpinner text="Loading / Chargement en cours ..." />
    </>
  )
}

Logout.getLayout = function PageLayout(page) {
  return <>{page}</>
}

export async function getServerSideProps({ req, res, locale }) {
  const logoutURL =
    !AuthIsDisabled() &&
    (await getLogoutURL(req).catch((error) => {
      logger.error(error)
      res.statusCode = 500
      throw error
    }))

  return {
    props: {
      locale,
      logoutURL: logoutURL ?? '/',
    },
  }
}
