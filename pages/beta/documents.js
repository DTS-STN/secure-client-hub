import en from '../../locales/en'
import fr from '../../locales/fr'
import BackToButton from '../../components/BackToButton'
import MetaData from '../../components/MetaData'
export default function Index(props) {
  const t = props.locale === 'en' ? en : fr

  return (
    <div role="main" className=" mx-auto">
      <MetaData language={props.locale} data={props.meta}></MetaData>
      <div className="flex flex-col  items-center m-auto">
        <h1 className="sr-only">service.canada.ca-digital-center</h1>
        {/* <img src='/beta/Status_updates.svg' alt='next' /> */}
        <div className="mx-auto bg-yellow-200 sm:hidden">
          {props.locale === 'en' ? (
            <img src="/beta/Submit_documents_mobile.svg" alt="next" />
          ) : (
            <img src="/beta/Submit_documents_mobile_FR.svg" alt="next" />
          )}
        </div>

        <div className="sm:block hidden">
          {props.locale === 'en' ? (
            <img src="/beta/Submit_documents.svg" alt="next" />
          ) : (
            <img src="/beta/Submit_documents_FR.svg" alt="next" />
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

Index.getLayout = function PageLayout(page) {
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
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Canada.ca',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: { locale, meta },
  }
}
