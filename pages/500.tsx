import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import ErrorPage from '../components/ErrorPage'
import { getLogger } from '../logging/log-util'
import { GetStaticProps } from 'next'

interface Data {
  title: string
  desc: string
  author: string
  keywords: string
  service: string
  creator: string
  accessRights: string
}

interface Custom500Props {
  lang: string
  bannerContent: string
  popupContent: string
  isAuth: boolean
  locale: string
  langToggleLink: string
  meta: {
    data_en: Data
    data_fr: Data
  }
}

const Custom500 = (props: Custom500Props) => {
  return (
    <ErrorPage
      lang={props.lang}
      errType="500"
      isAuth={!props.isAuth}
      homePageLink={
        props.locale === 'en' ? '/en/my-dashboard' : '/fr/mon-tableau-de-bord'
      }
      accountPageLink={
        props.locale === 'en'
          ? 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=eng'
          : 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=fra'
      }
    />
  )
}

/* istanbul ignore next */
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger(`500 error page`)
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
  const langToggleLink = locale === 'en' ? `/fr/500` : `/en/500`
  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: `We couldn't find that web page - 500 - My Service Canada Account`,
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: `Nous ne pouvons trouver cette page Web - 500 - Mon dossier Service Canada`,
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
      locale,
      lang: locale === 'en' ? 'en' : 'fr',
      langToggleLink,
      bannerContent: bannerContent.en,
      popupContent: popupContent.en,
      meta,
      isAuth: process.env.AUTH_DISABLED ?? true,
    },
  }
}

export default Custom500
