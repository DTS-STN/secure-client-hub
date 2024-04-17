import PropTypes from 'prop-types'
import en from '../locales/en'
import fr from '../locales/fr'
import Card from '../components/Card'
import Heading from '../components/Heading'
import ContextualAlert from '../components/ContextualAlert'

import { getMyDashboardContent } from '../graphql/mappers/my-dashboard'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaPopupNotAvailableContent } from '../graphql/mappers/beta-popup-page-not-available'
import { getAuthModalsContent } from '../graphql/mappers/auth-modals'
import { getLogger } from '../logging/log-util'
import {
  AuthIsDisabled,
  AuthIsValid,
  ValidateSession,
  Redirect,
} from '../lib/auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import BenefitTasks from './../components/BenefitTasks'
import MostReqTasks from './../components/MostReqTasks'
import { acronym } from '../lib/acronym'
import ErrorPage from '../components/ErrorPage'
import { getToken } from 'next-auth/jwt'

export default function MyDashboard(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr

  const errorCode =
    props.content?.err ||
    props.bannerContent?.err ||
    props.popupContent?.err ||
    props.popupContentNA?.err ||
    props.authModals?.err
  if (errorCode !== undefined) {
    return (
      <ErrorPage
        lang={props.locale !== undefined ? props.locale : 'en'}
        errType={errorCode}
        isAuth={false}
        homePageLink={
          props.locale === 'en' ? '/en/my-dashboard' : '/fr/mon-tableau-de-bord'
        }
        accountPageLink={
          props?.locale === 'en'
            ? 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=eng'
            : 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=fra'
        }
      />
    )
  }
  return (
    <div
      className="pb-2"
      id="myDashboardContent"
      data-testid="myDashboardContent-test"
    >
      <Heading id="my-dashboard-heading" title={props.content.heading} />

      {props.content.pageAlerts.map((alert, index) => {
        const alertType = alert.type[0].split('/').pop()
        return (
          <ul className="mt-6 w-full sm:px-8 md:px-15" key={index}>
            <ContextualAlert
              id={alert.id}
              type={alertType}
              alertHeading={alert.alertHeading}
              alertBody={alert.alertBody}
              alert_icon_id={` alert-icon ${alert.id}`}
              alert_icon_alt_text={`${alertType} ${
                props.locale === 'fr' ? 'Icône' : 'icon'
              }`}
            />
          </ul>
        )
      })}
      <Card
        key={'canadian-dental-care-plan'}
        programUniqueId={'canadian-dental-care-plan'}
        locale={props.locale}
        cardTitle={
          props.locale === 'en'
            ? 'Canadian Dental Care Plan'
            : 'Régime canadien de soins dentaires'
        }
        viewMoreLessCaption={
          props.locale === 'en'
            ? 'Most requested actions'
            : 'Actions les plus demandées'
        }
        acronym={props.locale === 'en' ? 'CDCP' : 'RCSD'}
        refPageAA={`ESDC-EDSC:${props.content.heading}`}
        hasAlert={false}
      >
        <div className="bg-deep-blue-60d" data-cy="most-requested-section">
          <MostReqTasks
            locale={props.locale}
            taskListMR={{
              title: props.locale === 'en' ? 'Most requested' : 'En demande',
              tasks: [
                {
                  id:
                    props.locale === 'en'
                      ? 'cdcp-view-my-letters'
                      : 'RCSD-consulter-mes-lettres',
                  title:
                    props.locale === 'en'
                      ? 'View my letters'
                      : 'Consulter mes lettres',
                  areaLabel:
                    props.locale === 'en'
                      ? 'View my Canada Dental Care Plan Letters'
                      : 'Voir mes lettres du Régime de soins dentaires du Canada',
                  link:
                    props.locale === 'en'
                      ? 'https://cdcp-staging.dev-dp-internal.dts-stn.com/en/letters'
                      : 'https://cdcp-staging.dev-dp-internal.dts-stn.com/fr/letters',
                  icon: '',
                  betaPopUp: true,
                },
              ],
            }}
            dataCy="most-requested"
            acronym={props.locale === 'en' ? 'CDCP' : 'RCSD'}
            refPageAA={`ESDC-EDSC:${props.content.heading}`}
          />
        </div>
      </Card>
      {props.content.cards.map((card) => {
        const mostReq = card.lists[0]
        var tasks = card.lists.slice(1, card.lists.length)
        return (
          <Card
            key={card.id}
            programUniqueId={card.id}
            locale={props.locale}
            cardTitle={card.title}
            viewMoreLessCaption={card.dropdownText}
            acronym={acronym(card.title)}
            refPageAA={props.aaPrefix}
            cardAlert={card.cardAlerts}
          >
            <div className="bg-deep-blue-60d" data-cy="most-requested-section">
              <MostReqTasks
                locale={props.locale}
                taskListMR={mostReq}
                dataCy="most-requested"
                acronym={acronym(card.title)}
                refPageAA={props.aaPrefix}
              />
            </div>
            <div
              className="gap-x-[60px] pl-3 pt-8 sm:pl-8 md:columns-2 md:px-15"
              data-cy="task-list"
            >
              {tasks.map((taskList, index) => {
                return (
                  <div key={index} data-cy="Task">
                    <BenefitTasks
                      locale={props.locale}
                      acronym={acronym(card.title)}
                      taskList={taskList}
                      dataCy="task-group-list"
                      refPageAA={props.aaPrefix}
                    />
                  </div>
                )
              })}
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export async function getServerSideProps({ req, res, locale }) {
  const session = await getServerSession(req, res, authOptions)
  const token = await getToken({ req })

  if (!AuthIsDisabled() && !(await AuthIsValid(req, session)))
    return Redirect(locale)

  //If Next-Auth session is valid, check to see if ECAS session is and redirect to logout if not
  if (!AuthIsDisabled() && (await AuthIsValid(req, session))) {
    const sessionValid = await ValidateSession(
      process.env.CLIENT_ID,
      token?.sub,
    )
    if (!sessionValid) {
      return {
        redirect: {
          destination: `/${locale}/auth/logout`,
          permanent: false,
        },
      }
    }
  }

  //The below sets the minimum logging level to error and surpresses everything below that
  const logger = getLogger('my-dashboard')
  logger.level = 'error'

  const content = await getMyDashboardContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })
  const bannerContent = await getBetaBannerContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })
  const popupContent = await getBetaPopupExitContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })

  const popupContentNA = await getBetaPopupNotAvailableContent().catch(
    (error) => {
      logger.error(error)
      return { err: '500' }
    },
  )

  const authModals = await getAuthModalsContent().catch((error) => {
    logger.error(error)
    return { err: '500' }
  })

  if (locale === 'und') {
    locale = 'en'
  }
  /* istanbul ignore next */
  const langToggleLink =
    locale === 'en' ? '/fr/mon-tableau-de-bord' : '/en/my-dashboard'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My dashboard - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Mon tableau de bord - Mon dossier Service Canada',
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
      langToggleLink,
      content:
        content?.err !== undefined
          ? content
          : locale === 'en'
            ? content.en
            : content.fr,
      meta,

      bannerContent:
        bannerContent?.err !== undefined
          ? bannerContent
          : locale === 'en'
            ? bannerContent.en
            : bannerContent.fr,
      popupContent:
        popupContent?.err !== undefined
          ? popupContent
          : locale === 'en'
            ? popupContent.en
            : popupContent.fr,
      popupContentNA:
        popupContentNA?.err !== undefined
          ? popupContentNA
          : locale === 'en'
            ? popupContentNA.en
            : popupContentNA.fr,
      aaPrefix:
        content?.err !== undefined
          ? ''
          : `ESDC-EDSC:${content.en?.heading || content.en?.title}`,
      aaMenuPrefix: content?.err !== undefined ? '' : `ESDC-EDSC:Nav Menu`,
      popupStaySignedIn:
        authModals?.err !== undefined
          ? authModals
          : locale === 'en'
            ? authModals.mappedPopupStaySignedIn.en
            : authModals.mappedPopupStaySignedIn.fr,
      popupYouHaveBeenSignedout:
        authModals?.err !== undefined
          ? authModals
          : locale === 'en'
            ? authModals.mappedPopupSignedOut.en
            : authModals.mappedPopupSignedOut.fr,
    },
  }
}

MyDashboard.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
