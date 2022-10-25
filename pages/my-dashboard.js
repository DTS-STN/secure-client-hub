import PropTypes from 'prop-types'
import { Heading } from '@dts-stn/service-canada-design-system'
import en from '../locales/en'
import fr from '../locales/fr'
import Card from '../components/Card'
import { getMyDashboardContent } from '../graphql/mappers/my-dashboard'
import logger from '../lib/logger'
import { AuthIsDisabled, AuthIsValid, Redirect } from '../lib/auth'

export default function MyDashboard(props) {
  /* istanbul ignore next */
  const t = props.locale === 'en' ? en : fr

  return (
    <div id="myDashboardContent" data-testid="myDashboardContent-test">
      <Heading id="my-dashboard-heading" title={props.content.heading} />

      {props.content.cards.map((card) => {
        return (
          <Card
            key={card.id}
            programUniqueId={card.id}
            locale={props.locale}
            cardTitle={card.title}
            viewMoreLessCaption={t.viewMoreLessButtonCaption}
            taskGroups={card.lists}
            mostReq={true}
          />
        )
      })}
    </div>
  )
}

export async function getServerSideProps({ req, res, locale }) {
  if (!AuthIsDisabled() && !(await AuthIsValid(req))) return Redirect()
  const content = await getMyDashboardContent().catch((error) => {
    logger.error(error)
    res.statusCode = 500
    throw error
  })

  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/my-dashboard' : '/my-dashboard'

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
    props: {
      locale,
      langToggleLink,
      content: locale === 'en' ? content.en : content.fr,
      meta,
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
