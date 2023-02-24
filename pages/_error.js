import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { ErrorPage } from '@dts-stn/service-canada-design-system'

function CustomError({ statusCode }) {
  return (
    <ErrorPage
      lang={props.locale}
      errType={statusCode}
      isAuth={!props.isAuth}
      homePageLink={
        props.locale === 'en' ? '/en/my-dashboard' : '/fr/mon-tableau-de-bord'
      }
      accountPageLink="/"
    />
  )
}

/* istanbul ignore next */
export async function getStaticProps({ res, err }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

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
      bannerContent: bannerContent.en,
      popupContent: popupContent.en,
      statusCode,
      meta,
    },
  }
}

export default CustomError
