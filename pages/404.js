import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import ErrorPage from '../components/ErrorPage'
import { getLogger } from '../logging/log-util'

function Custom404(props) {
  return (
    <ErrorPage
      lang={props.lang ? props.lang : props.locale}
      errType="404"
      isAuth={!props?.isAuth}
      homePageLink={
        props?.locale === 'en' ? '/en/my-dashboard' : '/fr/mon-tableau-de-bord'
      }
      accountPageLink={
        props?.locale === 'en' ? '/en/my-dashboard' : '/fr/mon-tableau-de-bord'
      }
    />
  )
}

/* istanbul ignore next */
export async function getStaticProps({ locale }) {
  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger(`404 error page`)
  logger.level = 'error'

  const bannerContent = await getBetaBannerContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })
  const popupContent = await getBetaPopupExitContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })
  const langToggleLink = locale === 'en' ? `/fr/404` : `/en/404`
  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: `404 - My Service Canada Account`,
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: `404 - Mon dossier Service Canada`,
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
      locale: locale ? locale : 'en',
      langToggleLink,
      bannerContent: bannerContent.en,
      popupContent: popupContent.en,
      meta,
      isAuth: process.env.AUTH_DISABLED ?? true,
    },
  }
}

export default Custom404
