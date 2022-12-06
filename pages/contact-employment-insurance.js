import PropTypes from 'prop-types'
import { Heading, TableContent } from '@dts-stn/service-canada-design-system'
import { Fragment } from 'react'
import en from '../locales/en'
import fr from '../locales/fr'
import ContactSection from '../components/contact/ContactSection'
import ContactProvince from '../components/contact/ContactProvince'
import { getProfileContent } from '../graphql/mappers/profile'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../graphql/mappers/beta-popup-page-not-available'
import logger from '../lib/logger'
import Modal from 'react-modal'
import React from 'react'
import ExitBetaModal from '../components/ExitBetaModal'
import Markdown from 'markdown-to-jsx'
const PageData = require('../json/Nov30Data.json')

const tmpContactMethods = PageData.data.schPagev1ByPath.item

const pareseContactMethods = (rawMethods) => {
  let tmp = {
    en: {
      breadCrumbs: rawMethods.scBreadcrumbParentPages.map((x) => {
        return {
          text: x.scTitleEn,
          link: `/${x.scPageNameEn}`,
        }
      }),
      title: rawMethods.scTitleEn,
      id: rawMethods.scId,
      methods: rawMethods.scFragments[0].scItems.map((x) => {
        return {
          title: x.scTitleEn,
          intro: x.schIntroEn.markdown,
          id: x.scId,
          details: x.schDetails.map((x) => {
            return {
              label: x.scTitleEn,
              id: x.scId,
              detail: x.scItems[0] ? x.scItems[0].scContentEn.markdown : null,
            }
          }),
        }
      }),
    },
    fr: {
      breadCrumbs: rawMethods.scBreadcrumbParentPages.map((x) => {
        return {
          text: x.scTitleEn,
          link: `/${x.scPageNameEn}`,
        }
      }),
      title: rawMethods.scTitleFr,
      id: rawMethods.scId,
      methods: rawMethods.scFragments[0].scItems.map((x) => {
        return {
          title: x.scTitleFr,
          intro: x.schIntroFr.markdown,
          id: x.scId,
          details: x.schDetails.map((x) => {
            return {
              label: x.scTitleFr,
              id: x.scId,
              detail: x.scItems[0] ? x.scItems[0].scContentFr.markdown : null,
            }
          }),
        }
      }),
    },
  }
  tmp.en.mail = tmp.en.methods[3]
  tmp.en.mail.details = tmp.en.mail.details.map((x) => {
    return {
      province: x.label,
      id: x.detail,
      contentEi:
        'Service Canada\n\nEmployment Insurance Program\n\nPO Box 2100\n\nVanvouver BC V6B 3T4',
      contentDocuments:
        'Service Canada Center\n\nPO Box 245\nEdmonton AB T5J 2J1',
    }
  })
  tmp.fr.mail = tmp.fr.methods[3]
  tmp.fr.mail.details = tmp.fr.mail.details.map((x) => {
    return {
      province: x.label,
      id: x.detail,
      contentEi:
        'Service Canada\n\nEmployment Insurance Program\n\nPO Box 2100\n\nVanvouver BC V6B 3T4',
      contentDocuments:
        'Service Canada Center\n\nPO Box 245\nEdmonton AB T5J 2J1',
    }
  })
  tmp.en.methods.pop()
  tmp.fr.methods.pop()
  return tmp
}

export default function ContactEmploymentInsurance(props) {
  /* istanbul ignore next */
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

  return (
    <div
      id="homeContent"
      data-testid="homeContent-test"
      data-cy="eIContactUsContent"
    >
      <Heading id="my-dashboard-heading" title={props.contactMethods.title} />
      <div className="py-5" />
      <TableContent
        sectionList={[
          ...props.contactMethods.methods,
          { title: 'Mail', id: 'mail' },
        ].map((item, i) => {
          return { name: item.title, link: `#${item.id}` }
        })}
      />

      {props.contactMethods.methods.map((item, i) => (
        <Fragment key={i}>
          <ContactSection programUniqueId={i} {...item} />
        </Fragment>
      ))}
      <div className="max-w-3xl" id="mail">
        <h2 className="py-4 md:py-9 md:mt-2 text-4xl font-display font-bold">
          {props.contactMethods.mail.title}
        </h2>
        <div className="[&_ul]:list-inside [&_ul]:ml-4 [&_ul]:list-disc pb-4">
          <Markdown>{props.contactMethods.mail.intro}</Markdown>
        </div>
        {props.contactMethods.mail.details
          .filter((x) => x.province && x.contentEi && x.contentDocuments)
          .map((item, i) => (
            <ContactProvince {...item} locale={props.locale} key={i} />
          ))}
      </div>

      <Modal
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
      </Modal>
    </div>
  )
}

export async function getStaticProps({ res, locale }) {
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
  const langToggleLink = locale === 'en' ? '/fr/profile' : '/profile'

  const t = locale === 'en' ? en : fr

  const contactMethods = pareseContactMethods(tmpContactMethods)

  const breadCrumbItems =
    locale === 'en'
      ? contactMethods.en.breadCrumbs
      : contactMethods.en.breadCrumbs

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Profile',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Profil',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: {
      locale,
      langToggleLink,
      meta,
      breadCrumbItems,
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
      contactMethods: locale === 'en' ? contactMethods.en : contactMethods.fr,
    },
  }
}

ContactEmploymentInsurance.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
