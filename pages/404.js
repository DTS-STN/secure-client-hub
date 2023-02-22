import { ErrorPage } from '@dts-stn/service-canada-design-system'

export default function Custom404(props) {
  return (
    <>
      <ErrorPage
        lang={props.locale}
        errType="404"
        isAuth={!props.isAuth}
        homePageLink={
          props.locale === 'en' ? '/en/my-dashboard' : '/fr/mon-tableau-de-bord'
        }
        accountPageLink="/"
      />
    </>
  )
}

export async function getStaticProps({ locale }) {
  const langToggleLink = locale === 'en' ? '/fr/404' : '/404'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: '404 - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: '404 - Mon dossier Service Canada',
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
