import PropTypes from 'prop-types'
import { Heading } from '@dts-stn/service-canada-design-system'
import en from '../locales/en'
import fr from '../locales/fr'
import Card from '../components/Card'

import { TASK_GROUPS } from '../contents/BenefitTasksGroups'
import { fetchContent } from '../lib/cms'

export default function Home(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr

  const tasksGroups = TASK_GROUPS['ei'][props.locale]
  return (
    <div id="homeContent" data-testid="homeContent-test">
      <Heading id="my-dashboard-heading" title={t.pageHeading.title} />
      <p className="py-8">{props.content.paragraph}</p>

      <Card
        locale={props.locale}
        cardTitle={t.cardTitle}
        viewMoreLessCaption={t.viewMoreLessButtonCaption}
        taskHeading={tasksGroups.taskHeadingKey}
        taskGroups={tasksGroups.tasksGroups}
        // callout={MapCallout(value.statusCode, value.typeCode, t)}
      />

      {/* {allBenefits.map((benefits) => {
        return benefits.map((value, index) => {
          //if we don't have these, things break
          if (value.programCode) {
            const tasksGroups = TASK_GROUPS[value.programCode][props.locale]
            return (
              <Card
                key={index}
                locale={props.locale}
                cardTitle={t.cardTitle}
                viewMoreLessCaption={t.viewMoreLessButtonCaption}
                taskHeading={tasksGroups.taskHeadingKey}
                taskGroups={tasksGroups.tasksGroups}
                // callout={MapCallout(value.statusCode, value.typeCode, t)}
              />
            )
          }
        })
      })} */}
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const content = await fetchContent()

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
