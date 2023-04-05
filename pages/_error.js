import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { ErrorPage } from '@dts-stn/service-canada-design-system'
import logger from '../lib/logger'

function CustomError(props) {
  return (
    <ErrorPage
      lang={props?.locale}
      errType={props?.statusCode}
      isAuth={!props?.isAuth}
      homePageLink={
        props?.locale === 'en' ? '/en/my-dashboard' : '/fr/mon-tableau-de-bord'
      }
      accountPageLink="/"
    />
  )
}

/* istanbul ignore next */
export async function getServerSideProps({ req, res, locale }) {
  const statusCode = res.statusCode.toString() || '500'
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
  const langToggleLink =
    locale === 'en' ? `/fr/${statusCode}` : `/${statusCode}`
  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: `${statusCode} - My Service Canada Account`,
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: `${statusCode} - Mon dossier Service Canada`,
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
      locale: locale ? locale : 'en',
      langToggleLink,
      bannerContent: bannerContent.en,
      popupContent: popupContent.en,
      statusCode,
      meta,
      isAuth: process.env.AUTH_DISABLED,
    },
  }
}

export default CustomError
