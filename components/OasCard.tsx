import Card from '../components/Card'
import MostReqTasks from '../components/MostReqTasks'

interface OasCardProps {
  locale: string
}
const OasCard = ({ locale }: OasCardProps) => {
  return (
    <div>
      <Card
        key={'old-age-security'}
        programUniqueId={'old-age-security'}
        locale={locale}
        cardTitle={
          locale === 'en' ? 'Old Age Security' : 'Sécurité de la vieillesse'
        }
        viewMoreLessCaption={
          locale === 'en'
            ? 'Most requested actions'
            : 'Actions les plus demandées'
        }
        acronym={locale === 'en' ? 'OAS' : 'SIS'}
        refPageAA={`ESDC-EDSC:`}
        hasAlert={false}
      >
        <div className="bg-deep-blue-60d" data-cy="most-requested-section">
          <MostReqTasks
            locale={locale}
            taskListMR={{
              title: locale === 'en' ? 'Most requested' : 'En demande',
              tasks: [
                {
                  id:
                    locale === 'en'
                      ? 'Old-Age-Security'
                      : 'Sécurité-de-la-vieillesse',
                  title:
                    locale === 'en'
                      ? 'Old Age Security service centre'
                      : 'Centre de services de la Sécurité de la vieillesse',
                  areaLabel:
                    locale === 'en'
                      ? 'Old Age Security service centre'
                      : 'Voir mes lettres du Régime de soins dentaires du Canada',
                  link: locale === 'en' ? 'https://' : 'https://',
                  icon: '',
                  betaPopUp: false,
                },
              ],
            }}
            dataCy="most-requested"
            acronym={locale === 'en' ? 'OAS' : 'SIS'}
            refPageAA={`ESDC-EDSC:`}
          />
        </div>
      </Card>
    </div>
  )
}

export default OasCard
