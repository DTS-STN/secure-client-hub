import PropTypes from 'prop-types'
import { Heading } from '@dts-stn/service-canada-design-system'
import en from '../locales/en'
import fr from '../locales/fr'
import Card from '../components/Card'

import { TASK_GROUPS } from '../contents/BenefitTasksGroups'
import { getHomeContent } from '../graphql/mappers/home'
import logger from '../lib/logger'

export default function Home(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr

  const ei = TASK_GROUPS['ei'][props.locale]
  const cpp = TASK_GROUPS['cpp'][props.locale]
  const oas = TASK_GROUPS['oas'][props.locale]
  return (
    <div id="homeContent" data-testid="homeContent-test">
      <Heading id="my-dashboard-heading" title={t.pageHeading.title} />

      <Card
        programUniqueId={'ei'}
        locale={props.locale}
        cardTitle={ei.programTitle}
        viewMoreLessCaption={t.viewMoreLessButtonCaption}
        taskHeading={ei.taskHeadingKey}
        taskGroups={ei.tasksGroups}
      />
      <Card
        programUniqueId={'cpp'}
        locale={props.locale}
        cardTitle={cpp.programTitle}
        viewMoreLessCaption={t.viewMoreLessButtonCaption}
        taskHeading={cpp.taskHeadingKey}
        taskGroups={cpp.tasksGroups}
      />
      <Card
        programUniqueId={'oas'}
        locale={props.locale}
        cardTitle={oas.programTitle}
        viewMoreLessCaption={t.viewMoreLessButtonCaption}
        taskHeading={oas.taskHeadingKey}
        taskGroups={oas.tasksGroups}
      />
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const content = await getHomeContent().catch((error) => {
    logger.error(error)
    return res.status(500).end()
  })

  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/home' : '/home'

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Home',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Accueil',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: { locale, langToggleLink, content, meta },
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
