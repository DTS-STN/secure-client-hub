import Card from '../components/Card'
import MostReqTasks from '../components/MostReqTasks'

interface EiCardProps {
  locale: string
}

const EiCard = ({ locale }: EiCardProps) => {
  return (
    <div>
      <Card
        key={'employment-insurance'}
        programUniqueId={'employment-insurance'}
        locale={locale}
        cardTitle={
          locale === 'en' ? 'Employment Insurance' : 'Assurance-emploi'
        }
        viewMoreLessCaption={
          locale === 'en'
            ? 'Most requested actions'
            : 'Actions les plus demandées'
        }
        acronym={locale === 'en' ? 'EI' : 'AE'}
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
                      ? 'Employment-Insurance-Account'
                      : 'Assurance-emploi-Account',
                  title: locale === 'en' ? 'Account' : 'Compte',
                  areaLabel: locale === 'en' ? 'Account' : 'Compte',
                  link:
                    locale === 'en'
                      ? 'http://srv2140-i4.services.gc.qat/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2FCBC%2FBenefits&appCode=CURAM-EI&Lang=eng'
                      : 'http://srv2140-i4.services.gc.qat/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2FCBC%2FBenefits&appCode=CURAM-EI&Lang=fra',
                  icon: '',
                  betaPopUp: false,
                },
              ],
            }}
            dataCy="most-requested"
            acronym={locale === 'en' ? 'EI' : 'AE'}
            refPageAA={`ESDC-EDSC:`}
          />
        </div>
      </Card>
    </div>
  )
}

export default EiCard
