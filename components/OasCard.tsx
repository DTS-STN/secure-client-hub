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
                      ? 'Old-Age-Security-Account'
                      : 'Sécurité-de-la-vieillesse-Account',
                  title: locale === 'en' ? 'Account' : 'Compte',
                  areaLabel: locale === 'en' ? 'Account' : 'Compte',
                  link:
                    locale === 'en'
                      ? 'https://srv2140-i4.services.gc.qat/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2Fecas-seca%2FBenefits%2Faccount&Lang=eng&appCode=CURAM-OAS'
                      : 'https://srv2140-i4.services.gc.qat/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2Fecas-seca%2FBenefits%2Faccount&Lang=fra&appCode=CURAM-OAS',
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
