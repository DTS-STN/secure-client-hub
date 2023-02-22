import { ErrorPage } from '@dts-stn/service-canada-design-system'

export default function Custom503(props) {
  return (
    <ErrorPage
      lang={props.locale}
      errType="503"
      isAuth={!props.isAuth}
      homePageLink={
        props.locale === 'en' ? '/en/my-dashboard' : '/fr/mon-tableau-de-bord'
      }
      accountPageLink={props.isAuth ? '/' : '/'}
    />
  )
}

export async function getStaticProps({ locale }) {
  const langToggleLink = locale === 'en' ? '/fr/503' : '/503'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: '503 - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: '503 - Mon dossier Service Canada',
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
      langToggleLink,
      meta,
      hideBanner: true,
      isAuth: process.env.AUTH_DISABLED,
    },
  }
}
