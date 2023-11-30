import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { AuthIsDisabled } from '../../lib/auth'
import LoadingSpinner from '../../components/LoadingSpinner'
import MetaData from '../../components/MetaData'

export default function Login(props) {
  const router = useRouter()

  //signIn('ecasProvider')
  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.error) {
      //If auth is disabled, redirect to dashboard without triggering signIn event, for testing purposes only
      if (props.authDisabled) {
        setTimeout(() => {
          props.locale === 'en'
            ? router.push('/en/my-dashboard')
            : router.push('/fr/mon-tableau-de-bord')
        }, 3000)
        return
      }
      signIn('ecasProvider', {
        callbackUrl:
          props.locale === 'en'
            ? `${window.location.origin}/en/my-dashboard`
            : `${window.location.origin}/fr/mon-tableau-de-bord`,
      })
    }
  }, [router.isReady, props.authDisabled, router, props.locale])

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

Login.getLayout = function PageLayout(page) {
  return <>{page}</>
}

export async function getServerSideProps({ req, res, locale }) {
  //Temporary for testing purposes until auth flow is publicly accessible
  const authDisabled = AuthIsDisabled() ? true : false

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
      authDisabled: authDisabled ?? true,
    },
  }
}
