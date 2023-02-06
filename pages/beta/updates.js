import en from '../../locales/en'
import fr from '../../locales/fr'
import BackToButton from '../../components/BackToButton'
import MetaData from '../../components/MetaData'
export default function Updates(props) {
  const t = props.locale === 'en' ? en : fr

  return (
    <div role="main" className=" mx-auto">
      <MetaData language={props.locale} data={props.meta}></MetaData>
      <div className="flex flex-col  items-center m-auto">
        <h1 className="sr-only">service.canada.ca-digital-center</h1>
        {/* <img src='/beta/Status_updates.svg' alt='next' /> */}
        <div className="mx-auto sm:hidden">
          {props.locale === 'en' ? (
            <img src="/beta/Status_updates_mobile.svg" alt="next" />
          ) : (
            <img src="/beta/Status_updates_mobile_FR.svg" alt="next" />
          )}
        </div>

        <div className="sm:block hidden">
          {props.locale === 'en' ? (
            <img src="/beta/Status_updates.svg" alt="next" />
          ) : (
            <img src="/beta/Status_updates_FR.svg" alt="next" />
          )}
        </div>
        <BackToButton
          buttonHref={t.url_dashboard}
          buttonId="back-to-dashboard-button"
          buttonLinkText={t.backToDashboard}
        />
      </div>
    </div>
  )
}

Updates.getLayout = function PageLayout(page) {
  return <>{page}</>
}

export async function getStaticProps({ locale }) {
  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Canada.ca',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Canada.ca',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Emploi et Développement social Canada',
      accessRights: '1',
    },
  }

  return {
    props: { locale, meta },
  }
}
