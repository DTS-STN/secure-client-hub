import { useEffect } from 'react'
import { getLogoutURL, AuthIsDisabled } from '../../lib/auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import LoadingSpinner from '../../components/LoadingSpinner'
import { signOut } from 'next-auth/react'
import MetaData from '../../components/MetaData'
import { getLogger } from '../../logging/log-util'
import { getToken } from 'next-auth/jwt'

export default function Logout(props) {
  //Redirect to ECAS global sign out
  useEffect(() => {
    const logout = async () => {
      if (props.provider === 'credentials') {
        await signOut({ callbackUrl: props.logoutURL })
      } else {
        await signOut({ redirect: false })
        window.location.replace(props.logoutURL)
      }
    }
    logout().catch(console.error)
  }, [])

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

Logout.getLayout = function PageLayout(page) {
  return <>{page}</>
}

export async function getServerSideProps({ req, res, locale }) {
  const session = await getServerSession(req, res, authOptions)

  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger('logout')
  logger.level = 'error'

  const token = await getToken({ req })
  const provider = token.provider

  const logoutURL =
    !AuthIsDisabled() && provider !== 'credentials'
      ? await getLogoutURL(req).catch((error) => {
          logger.error(error)
          res.statusCode = 500
          throw error
        })
      : '/'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'Loading-Chargement en cours - Canada.ca',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Loading-Chargement en cours - Canada.ca',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Emploi et Développement social Canada',
      accessRights: '1',
    },
  }

  return {
    props: {
      locale,
      meta,
      logoutURL: logoutURL ?? '/',
      provider: provider,
    },
  }
}
