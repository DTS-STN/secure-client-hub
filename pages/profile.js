import PropTypes from 'prop-types'
import { Heading } from '@dts-stn/service-canada-design-system'
import PageLink from '../components/PageLink'
import en from '../locales/en'
import fr from '../locales/fr'
import Card from '../components/Card'
import { TASK_GROUPS } from '../contents/BenefitTasksGroups'

import { fetchContent } from '../lib/cms'

export default function Home(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr
  const ei = TASK_GROUPS['ei'][props.locale]
  const cpp = TASK_GROUPS['cpp'][props.locale]
  const oas = TASK_GROUPS['oas'][props.locale]

  return (
    <div id="homeContent" data-testid="homeContent-test">
      <Heading id="my-dashboard-heading" title={t.pageHeading.profile} />
      <Card
        programUniqueId={'ei'}
        locale={props.locale}
        cardTitle={ei.programTitle}
        viewMoreLessCaption={t.viewMoreViewLessEI}
        taskHeading={ei.taskHeadingKey}
        taskGroups={ei.tasksGroups}
        mostReq={false}
      />
      <Card
        programUniqueId={'cpp'}
        locale={props.locale}
        cardTitle={cpp.programTitle}
        viewMoreLessCaption={t.viewMoreViewLessCPP}
        taskHeading={cpp.taskHeadingKey}
        taskGroups={cpp.tasksGroups}
        mostReq={false}
      />
      <Card
        programUniqueId={'oas'}
        locale={props.locale}
        cardTitle={oas.programTitle}
        viewMoreLessCaption={t.viewMoreViewLessOAS}
        taskHeading={oas.taskHeadingKey}
        taskGroups={oas.tasksGroups}
        mostReq={false}
      />
      <PageLink
        lookingForText={t.pageLinkSecurity}
        accessText={t.accessYourSecurityText}
        linkText={t.securityLinkText}
        href="/security"
        linkID="link-id"
        buttonHref={t.url_dashboard}
        buttonId="back-to-dashboard-button"
        buttonLinkText={t.backToDashboard}
      ></PageLink>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const content = await fetchContent()

  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/profile' : '/profile'

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
    props: { locale, langToggleLink, content, meta, breadCrumbItems },
  }
}

Home.propTypes = {
  /**
   * current locale in the address
   */
  locale: PropTypes.string,

  /*
   * Meta Tags
   */
  meta: PropTypes.object,
}
