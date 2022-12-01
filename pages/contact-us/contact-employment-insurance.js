import PropTypes from 'prop-types'
import { Heading, TableContent } from '@dts-stn/service-canada-design-system'
import { Fragment } from 'react'
import PageLink from '../../components/PageLink'
import en from '../../locales/en'
import fr from '../../locales/fr'
import ContactSection from '../../components/ContactSection'
import { getProfileContent } from '../../graphql/mappers/profile'
import { getBetaBannerContent } from '../../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../../graphql/mappers/beta-popup-page-not-available'
import logger from '../../lib/logger'
import ProfileTasks from '../../components/ProfileTasks'
import Modal from 'react-modal'
import React from 'react'
import ExitBetaModal from '../../components/ExitBetaModal'
import ContactProvince from '../../components/ContactProvince'
const PageData = require('../../json/Nov30Data.json')
import Markdown from 'markdown-to-jsx'

const tmpContactMethods = PageData.data.schPagev1ByPath.item

const pareseContactMethods = (rawMethods) => {
  let tmp = {
    en: {
      title: rawMethods.scTitleEn,
      methods: rawMethods.scFragments[0].scItems.map((x) => {
        return {
          title: x.scTitleEn,
          intro: x.schIntroEn.markdown,
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
      title: rawMethods.scTitleFr,
      methods: rawMethods.scFragments[0].scItems.map((x) => {
        return {
          title: x.scTitleFr,
          intro: x.schIntroFr.markdown,
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
      contentEi: x.detail,
      contentDocuments:
        'Service Canada Center\n\nPO Box 245\nEdmonton AB T5J 2J1',
    }
  })
  tmp.fr.mail = tmp.fr.methods[3]
  tmp.fr.mail.details = tmp.fr.mail.details.map((x) => {
    return {
      province: x.label,
      id: x.detail,
      contentEi: x.detail,
      contentDocuments:
        'Service Canada Center\n\nPO Box 245\nEdmonton AB T5J 2J1',
    }
  })
  tmp.en.methods.pop()
  tmp.fr.methods.pop()
  return tmp
}

export default function Profile(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr

  console.log(props, tmpContactMethods)

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
    <div id="homeContent" data-testid="homeContent-test">
      <Heading id="my-dashboard-heading" title={props.contactMethods.title} />

      <TableContent
        sectionList={props.contactMethods.methods.map((item, i) => {
          return { name: item.title, link: '#' }
        })}
      />

      {props.contactMethods.methods.map((item, i) => (
        <Fragment key={i}>
          <ContactSection key={i} programUniqueId={i} {...item} />
        </Fragment>
      ))}
      <div className="max-w-3xl">
        <h2 className="py-4 md:py-9 md:mt-2 text-4xl font-display font-bold">
          {props.contactMethods.mail.title}
        </h2>
        <div className="list-disc list-inside list-disc markdown_div pb-4">
          <Markdown>{props.contactMethods.mail.intro}</Markdown>
        </div>
        {props.contactMethods.mail.details
          .filter((x) => x.province && x.contentEi && x.contentDocuments)
          .map((item) => (
            <ContactProvince {...item} />
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
  const content = await getProfileContent().catch((error) => {
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
  const langToggleLink = locale === 'en' ? '/fr/profile' : '/profile'

  const t = locale === 'en' ? en : fr

  const breadCrumbItems = [
    {
      link: t.url_dashboard,
      text: t.pageHeading.title,
    },
  ]

  const contactMethods = pareseContactMethods(tmpContactMethods)

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
      content: locale === 'en' ? content.en : content.fr,
      meta,
      breadCrumbItems,
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
      contactMethods: locale === 'en' ? contactMethods.en : contactMethods.fr,
    },
  }
}

Profile.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}

// {props.content.cards.map((card) => {
//   const moreLessButtonText = card.lists.tasks[0].title
//   const tasks = card.lists.tasks.slice(1, card.lists.tasks.length)
//   return (
//     <Card
//       key={card.id}
//       programUniqueId={card.id}
//       locale={props.locale}
//       cardTitle={card.title}
//       viewMoreLessCaption={moreLessButtonText}
//     >
//       <div
//         className="px-3 sm:px-8 md:px-15 border-t-2"
//         data-cy="task-list"
//       >
//         <ProfileTasks
//           tasks={tasks}
//           data-testID="profile-task-group-list"
//           openModal={openModal}
//           data-cy="task"
//         />
//       </div>
//     </Card>
//   )
// })}
// <PageLink
//   lookingForText={t.pageLinkSecurity}
//   accessText={t.accessYourSecurityText}
//   linkText={t.securityLinkText}
//   href="/security-settings"
//   linkID="link-id"
//   dataCy="access-security-page-link"
//   buttonHref={t.url_dashboard}
//   buttonId="back-to-dashboard-button"
//   buttonLinkText={t.backToDashboard}
// ></PageLink>

{
  /* <p className="mb-8 text-xl font-body">
{props.content.securityQuestions.subTitle}
</p>

<Link
id="eiAccessCodeLink"
dataTestId="eiAccessCodeLink"
text={props.content.eiAccessCode.linkTitle.text}
href={props.content.eiAccessCode.linkTitle.link}
/>
<p className="pb-7 text-xl font-body">
{props.content.eiAccessCode.subTitle}
</p> */
}

// <PageLink
// lookingForText={props.content.lookingFor.title}
// accessText={props.content.lookingFor.subText[0]}
// linkText={props.content.lookingFor.subText[1]}
// href={props.content.lookingFor.link}
// linkID="link-id"
// dataCy="access-profile-page-link"
// buttonHref={t.url_dashboard}
// buttonId="back-to-dashboard-button"
// buttonLinkText={t.backToDashboard}
// ></PageLink>
