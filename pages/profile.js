import PropTypes from 'prop-types'
import { Heading } from '@dts-stn/service-canada-design-system'
import PageLink from '../components/PageLink'
import en from '../locales/en'
import fr from '../locales/fr'
import { getProfileContent } from '../graphql/mappers/profile'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../graphql/mappers/beta-popup-page-not-available'
import { getAuthModalsContent } from '../graphql/mappers/auth-modals'
import logger from '../lib/logger'
import ProfileTasks from './../components/ProfileTasks'
import React from 'react'
import { useEffect, useCallback, useMemo } from 'react'
import throttle from 'lodash.throttle'
import { acronym } from '../lib/acronym'

export default function Profile(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr

  //Event listener for click events that revalidates MSCA session, throttled using lodash to only trigger every 15 seconds
  const onClickEvent = useCallback(() => fetch('/api/refresh-msca'), [])
  const throttledOnClickEvent = useMemo(
    () => throttle(onClickEvent, 15000, { trailing: false }),
    [onClickEvent]
  )

  useEffect(() => {
    window.addEventListener('click', throttledOnClickEvent)
    //Remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('click', throttledOnClickEvent)
    }
  }, [throttledOnClickEvent])

  return (
    <div id="homeContent" data-testid="profileContent-test">
      <Heading id="my-dashboard-heading" title={props.content.pageName} />
      <p className="text-lg mt-2 font-body">{props.content.heading}</p>
      {props.content.list.map((program, index) => {
        return (
          <ProfileTasks
            key={index}
            acronym={acronym(program.title)}
            programTitle={program.title}
            tasks={program.tasks}
            data-testID="profile-task-group-list"
            openModal={props.openModal}
            data-cy="task"
            refPageAA={props.aaPrefix}
          />
        )
      })}
      <PageLink
        lookingForText={props.content.lookingFor.title}
        accessText={props.content.lookingFor.subText[0]}
        linkText={props.content.lookingFor.subText[1]}
        href={props.content.lookingFor.link}
        linkID="link-id"
        dataCy="access-security-page-link"
        buttonHref={props.content.backToDashboard.btnLink}
        buttonId="back-to-dashboard-button"
        buttonLinkText={props.content.backToDashboard.btnText}
        refPageAA={props.aaPrefix}
      ></PageLink>
    </div>
  )
}

export async function getServerSideProps({ res, locale }) {
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
   */
  const popupContentNA = await getBetaPopupNotAvailableContent().catch(
    (error) => {
      logger.error(error)
      // res.statusCode = 500
      throw error
    }
  )

  const authModals = await getAuthModalsContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })

  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/profil' : '/profile'

  const t = locale === 'en' ? en : fr

  const breadCrumbItems =
    locale === 'en'
      ? content.en.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })
      : content.fr.breadcrumb?.map(({ link, text }) => {
          return { text, link: '/' + locale + '/' + link }
        })

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'Profile - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Profil - Mon dossier Service Canada',
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
      content: locale === 'en' ? content.en : content.fr,
      meta,
      breadCrumbItems,
      bannerContent: locale === 'en' ? bannerContent.en : bannerContent.fr,
      popupContent: locale === 'en' ? popupContent.en : popupContent.fr,
      popupContentNA: locale === 'en' ? popupContentNA.en : popupContentNA.fr,
      aaPrefix: `ESDC-EDSC:${content.en?.heading || content.en?.title}`,
      popupStaySignedIn:
        locale === 'en'
          ? authModals.mappedPopupStaySignedIn.en
          : authModals.mappedPopupStaySignedIn.fr,
      popupYouHaveBeenSignedout:
        locale === 'en'
          ? authModals.mappedPopupSignedOut.en
          : authModals.mappedPopupSignedOut.fr,
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
