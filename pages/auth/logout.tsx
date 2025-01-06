import { useEffect } from 'react'
import { getLogoutURL, AuthIsDisabled } from '../../lib/auth'
import { GetServerSidePropsContext } from 'next'
import LoadingSpinner from '../../components/LoadingSpinner'
import MetaData from '../../components/MetaData'
import { getLogger } from '../../logging/log-util'
import React from 'react'

interface MetaDataProps {
  data_en: {
    title: string
    desc: string
    author: string
    keywords: string
    service: string
    creator: string
    accessRights: string
  }
  data_fr: {
    title: string
    desc: string
    author: string
    keywords: string
    service: string
    creator: string
    accessRights: string
  }
}

interface LogoutProps {
  locale: string
  meta: MetaDataProps
  logoutURL: string
}
export default function Logout(props: LogoutProps) {
  //Redirect to ECAS global sign out
  useEffect(() => {
    const logout = async () => {
      //await signOut({ redirect: false })
      window.location.replace(props.logoutURL)
    }
    logout().catch(console.error)
  }, [props.logoutURL])

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

Logout.getLayout = function PageLayout(page: JSX.Element) {
  return <>{page}</>
}

export async function getServerSideProps({
  res,
  locale,
}: {
  res: GetServerSidePropsContext['res']
  locale: GetServerSidePropsContext['locale']
}) {
  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger('logout')
  logger.level = 'error'

  const logoutURL = !AuthIsDisabled()
    ? await getLogoutURL().catch((error) => {
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
      locale: locale,
      meta,
      logoutURL: logoutURL ?? '/',
    },
  }
}
