import Heading from './../components/Heading'
import EN from '../locales/en'
import FR from '../locales/fr'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

interface Data {
  title: string
  desc: string
  author: string
  keywords: string
  service: string
  creator: string
  accessRights: string
}

interface MaintenanceProps {
  locale: string
  hidebanner: boolean
  langToggleLink: string
  meta: {
    data_en: Data
    data_fr: Data
  }
}

const Maintenance = (props: MaintenanceProps) => {
  const language = props.locale === 'en' ? EN : FR
  return (
    <div className="container">
      <div data-testid={'pageHead-maintenance'}>
        <Heading
          id={'pageHead-maintenance'}
          title={language.maintenanceTitle}
        />
        <p className="text-20px text-gray-darker mt-2">
          {language.maintenanceText}
        </p>
        <br />
        <p className="font-bold text-gray-darker sm:text-black text-[20px]">
          {language.errorPageNextText}
        </p>
        <h2 className="sr-only">{language.errorPageNextText}</h2>
        <ul id={'maintenace-next-list'}>
          <li className={'text-20px text-gray-darker pl-3'}>
            {language.error503TextLink}
          </li>
          <li className="text-20px text-gray-darker pl-3">
            {language.errorTextLinkCommon}
            <Link
              className="underline text-deep-blue-dark font-body text-20px hover:text-blue-hover focus:text-blue-hover"
              id="accountpage-maintenance"
              href={
                props.locale === 'en'
                  ? 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=eng'
                  : 'https://srv136.services.gc.ca/sc/msca-mdsc/portal-portail/pro/home-accueil?Lang=fra'
              }
            >
              {language.errorTextLinkCommon_2}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  /* istanbul ignore next */
  const langToggleLink = locale === 'en' ? '/fr/maintenance' : '/en/maintenance'

  const meta = {
    data_en: {
      title:
        'This service is currently unavailable - My Service Canada Account',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title:
        'Le service est actuellement indisponible - Mon dossier Service Canada',
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
      meta,
      hideBanner: true,
    },
  }
}
export default Maintenance
