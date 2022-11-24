import en from '../../locales/en'
import fr from '../../locales/fr'
import BackToButton from '../../components/BackToButton'
import MetaData from '../../components/MetaData'
import PhaseBanner from '../../components/PhaseBanner'
import { getBetaBannerContent } from '../../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../../graphql/mappers/beta-popup-exit'
// import ExitBetaModal from '../components/ExitBetaModal'
// import Modal from 'react-modal'
import React from 'react'

export default function MscaHomepage(props) {
  const t = props.locale === 'en' ? en : fr
  const [openModalWithLink, setOpenModalWithLink] = React.useState({
    isOpen: false,
    activeLink: '/',
  })

  function openModal(link) {
    setOpenModalWithLink({ isOpen: true, activeLink: link })
  }

  function closeModal() {
    setOpenModalWithLink({ isOpen: false, activeLink: '/' })
  }

  console.log(props.locale)
  return (
    <div role="main" className=" mx-auto">
      <MetaData language={props.locale} data={props.meta}></MetaData>
      <PhaseBanner
        bannerBoldText={props.bannerContent.bannerBoldText}
        bannerText={props.bannerContent.bannerText}
        bannerLink={props.bannerContent.bannerLink}
        bannerLinkHref={props.bannerContent.bannerLinkHref}
        bannerButtonText={props.bannerContent.bannerButtonText}
        bannerButtonLink={props.bannerContent.bannerButtonLink}
        icon={props.bannerContent.icon}
        popupContent={props.popupContent}
      ></PhaseBanner>
      <div className="flex flex-col  items-center m-auto">
        <h1 className="sr-only">service.canada.ca-digital-center</h1>
        {/* <img src='/beta/Status_updates.svg' alt='next' /> */}
        <div className="mx-auto sm:hidden">
          {props.locale === 'en' ? (
            <img src="/beta/MSCA_mobile_EN.png" alt="next" />
          ) : (
            <img src="/beta/MSCA_mobile_FR.png" alt="next" />
          )}
        </div>

        <div className="sm:block hidden">
          {props.locale === 'en' ? (
            <img src="/beta/MSCA_desktop_EN.png" alt="next" />
          ) : (
            <img src="/beta/MSCA_desktop_FR.png" alt="next" />
          )}
        </div>
        <BackToButton
          buttonHref={t.url_dashboard}
          buttonId="back-to-dashboard-button"
          buttonLinkText={t.backToDashboard}
        />
      </div>
      {/* <Modal
        className="flex justify-center bg-black/75 h-full"
        isOpen={openModalWithLink.isOpen}
        onRequestClose={closeModal}
        contentLabel={t.aria_exit_beta_modal}
      >
        <ExitBetaModal
          closeModal={closeModal}
          closeModalAria={t.close_modal}
          continueLink={openModalWithLink.activeLink}
          popupId={props.popupContent.popupId}
          popupTitle={props.popupContent.popupTitle}
          popupDescription={props.popupContent.popupDescription}
          popupPrimaryBtn={props.popupContent.popupPrimaryBtn}
          popupSecondaryBtn={props.popupContent.popupSecondaryBtn}
        />
      </Modal> */}
    </div>
  )
}

MscaHomepage.getLayout = function PageLayout(page) {
  return <>{page}</>
}

export async function getServerSideProps({ locale }) {
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
      title: 'My Service Canada Account - Canada.ca',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Canada.ca',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: {
      locale,
      content: locale === 'en' ? content.en : content.fr,
      meta,
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
    },
  }
}
