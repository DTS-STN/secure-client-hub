import PropTypes from 'prop-types'
import en from '../locales/en'
import fr from '../locales/fr'
import Card from '../components/Card'
import Heading from '../components/Heading'
import ContextualAlert from '../components/ContextualAlert'
import InfoMessage from '../components/InfoMessage'
import { getMyDashboardContent } from '../graphql/mappers/my-dashboard'
import { getAuthModalsContent } from '../graphql/mappers/auth-modals'
import { getLogger } from '../logging/log-util'
import {
  AuthIsDisabled,
  AuthIsValid,
  ValidateSession,
  Redirect,
  getIdToken,
} from '../lib/auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import BenefitTasks from './../components/BenefitTasks'
import MostReqTasks from './../components/MostReqTasks'
import { acronym } from '../lib/acronym'
import ErrorPage from '../components/ErrorPage'

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

      <InfoMessage
        id="dashboard-info-message"
        label={t.dashboardInfo.label}
        messageText={t.dashboardInfo.messageText}
        messageLinkText={t.dashboardInfo.messageLinkText}
        messageLinkHref={t.dashboardInfo.messageLinkHref}
        icon="arrow-up-right-from-square"
        refPageAA={`${props.aaPrefix}`}
        locale={props.locale}
      />

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

  if (!AuthIsDisabled() && !(await AuthIsValid(req, session)))
    return Redirect(locale)

  const token = await getIdToken(req)

  //If Next-Auth session is valid, check to see if ECAS session is. If not, clear session cookies and redirect to login
  if (!AuthIsDisabled() && (await AuthIsValid(req, session))) {
    const sessionValid = await ValidateSession(
      process.env.CLIENT_ID,
      token?.sid,
    )
    if (!sessionValid) {
      // Clear all session cookies
      const isSecure = req.headers['x-forwarded-proto'] === 'https'
      const cookiePrefix = `${isSecure ? '__Secure-' : ''}next-auth.session-token`
      const cookies = []
      for (const cookie of Object.keys(req.cookies)) {
        if (cookie.startsWith(cookiePrefix)) {
          cookies.push(
            `${cookie}=deleted; Max-Age=0; path=/ ${isSecure ? '; Secure ' : ''}`,
          )
        }
      }
      res.setHeader('Set-Cookie', cookies)
      return {
        redirect: {
          destination: `/${locale}/auth/login`,
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
      aaPrefix:
        content?.err !== undefined
          ? ''
          : `ESDC-EDSC_MSCA-MSDC-SCH:${content.en?.heading || content.en?.title}`,
      aaMenuPrefix:
        content?.err !== undefined ? '' : `ESDC-EDSC_MSCA-MSDC-SCH:Nav Menu`,
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
