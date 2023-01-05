import CountDown from '../components/sessionModals/CountDown'
import SignedOut from '../components/sessionModals/SignedOut'
import { useState } from 'react'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PropTypes from 'prop-types'
import { Heading, Link } from '@dts-stn/service-canada-design-system'
import PageLink from '../components/PageLink'
import en from '../locales/en'
import fr from '../locales/fr'
import { getContactUsContent } from '../graphql/mappers/contact-us'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../graphql/mappers/beta-popup-page-not-available'
import logger from '../lib/logger'
import { Button } from '@dts-stn/service-canada-design-system'
import Modal from 'react-modal'

export default function DeleteMe(props) {
  const t = props.locale === 'en' ? en : fr

  const [modalBody, setModalBody] = useState(null)

  function content(content) {
    setModalBody(content)
  }

  function closeModal() {
    setModalBody(null)
  }

  return (
    <div>
      <SignedOut />
      <Button text="Countdown" styling="primary" className="mr-3" />
      <Button
        text="Signed Out"
        styling="primary"
        className="mr-3"
        onClick={() => content('mooo')}
      />

      <Modal
        className="flex justify-center bg-black/75 h-full"
        isOpen={modalBody === null ? false : true}
        onRequestClose={closeModal}
        contentLabel={'ddddD'}
      >
        <div
          className="m-8 sm:mx-24 sm:mt-24 p-4 md:p-16 bg-white rounded h-fit"
          data-cy="exitBetaModal"
          id={'dd'}
        >
          <div className="flex justify-between">
            <div
              className="text-3xl font-display font-bold"
              role="heading"
              aria-level="1"
            >
              Hello World
            </div>
            <button
              data-cy="x-button"
              type="button"
              aria-label={'sssssss'}
              onClick={closeModal}
            >
              <FontAwesomeIcon
                aria-hidden="true"
                icon={solid('xmark')}
                size="xl"
              />
            </button>
          </div>
          <p className="text-xl font-display py-4 mr-10">
            <SignedOut />
          </p>
        </div>
      </Modal>
    </div>
  )
}

export async function getStaticProps({ res, locale }) {
  const content = await getContactUsContent().catch((error) => {
    logger.error(error)
    //res.statusCode = 500
    throw error
  })
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

  /* 
   * Uncomment this block to make Banner Popup Content display "Page Not Available"
   * Comment "getBetaPopupExitContent()" block of code above.
  
    const popupContent = await getBetaPopupNotAvailableContent().catch((error) => {
      logger.error(error)
      // res.statusCode = 500
      throw error
    })
  */

  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/contact-us' : '/contact-us'

  const t = locale === 'en' ? en : fr

  const breadCrumbItems = [
    {
      link: t.url_dashboard,
      text: t.pageHeading.title,
    },
  ]

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Contact',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Contactez-nous',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: {
      locale,
      langToggleLink,
      content: locale === 'en' ? content.en : content.fr,
      meta,
      breadCrumbItems,
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
    },
  }
}

DeleteMe.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Language link toggle text
   */
  langToggleLink: PropTypes.string,

  /*
   * Content Tags
   */

  content: PropTypes.object,

  /*
   * Meta Tags
   */

  meta: PropTypes.object,

  /*
   * BreadCrumb Items
   */
  breadCrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
}
