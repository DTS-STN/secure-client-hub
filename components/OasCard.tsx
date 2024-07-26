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
                      ? 'https://srv113-s.sade.hrdc-drhc.gc.ca/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2Fecas-seca%2FBenefits%2Faccount&appCode=CURAM-OAS&Lang=eng'
                      : 'https://srv113-s.sade.hrdc-drhc.gc.ca/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2Fecas-seca%2FBenefits%2Faccount&appCode=CURAM-OAS&Lang=fra',
                  icon: '',
                  betaPopUp: false,
                },
                {
                  id:
                    locale === 'en'
                      ? 'Old-Age-Security-Payments'
                      : 'Sécurité-de-la-vieillesse-Payments',
                  title: locale === 'en' ? 'Payments' : 'Paiements',
                  areaLabel: locale === 'en' ? 'Payments' : 'Paiements',
                  link:
                    locale === 'en'
                      ? 'https://srv113-s.sade.hrdc-drhc.gc.ca/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2Fecas-seca%2FBenefits%2FPayments&appCode=CURAM-OAS&Lang=eng'
                      : 'https://srv113-s.sade.hrdc-drhc.gc.ca/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2Fecas-seca%2FBenefits%2FPayments&appCode=CURAM-OAS&Lang=fra',
                  icon: '',
                  betaPopUp: false,
                },
                {
                  id:
                    locale === 'en'
                      ? 'Old-Age-Security-Tax-Info'
                      : 'Sécurité-de-la-vieillesse-Tax-Info',
                  title:
                    locale === 'en'
                      ? 'Tax information'
                      : 'Informations fiscales',
                  areaLabel:
                    locale === 'en'
                      ? 'Tax information'
                      : 'Informations fiscales',
                  link:
                    locale === 'en'
                      ? 'https://srv113-s.sade.hrdc-drhc.gc.ca/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2Fecas-seca%2FBenefits%2Fbdm-tax-information&appCode=CURAM-OAS&Lang=eng'
                      : 'https://srv113-s.sade.hrdc-drhc.gc.ca/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2Fecas-seca%2FBenefits%2Fbdm-tax-information&appCode=CURAM-OAS&Lang=fra',
                  icon: '',
                  betaPopUp: false,
                },
                {
                  id:
                    locale === 'en'
                      ? 'Old-Age-Security-Benefits'
                      : 'Sécurité-de-la-vieillesse-Benefits',
                  title: locale === 'en' ? 'Benefits' : 'Avantages',
                  areaLabel: locale === 'en' ? 'Benefits' : 'Avantages',
                  link:
                    locale === 'en'
                      ? 'https://srv113-s.sade.hrdc-drhc.gc.ca/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2Fecas-seca%2FBenefits%2Fbenefits&appCode=CURAM-OAS&Lang=eng'
                      : 'https://srv113-s.sade.hrdc-drhc.gc.ca/ecas-seca/rascl_iv/Curam/SAMLIdentityProvider.aspx?link=%2Fecas-seca%2FBenefits%2Fbenefits&appCode=CURAM-OAS&Lang=fra',
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
