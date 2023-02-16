import Link from 'next/link'
import { getBetaPopupExitContent } from '../graphql/mappers/beta-popup-exit'
import { getBetaBannerContent } from '../graphql/mappers/beta-banner-opt-out'
import logger from '../lib/logger'

function CustomError({ statusCode }) {
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 items-center justify-center overflow-visible md:h-96 sm:h-screen mx-2 my-2 px-20">
      <div className="error-404">
        <h1 className="text-2xl">{"We couldn't find that Web page"}</h1>
        <h2>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </h2>
        <p>
          {
            "We're sorry you ended up here. Sometimes a page gets moved or deleted, but hopefully we can help you find what you're looking for. What next?"
          }
        </p>
        <ul>
          <li>
            Return to the{' '}
            <Link href="/">
              <a className="text-cyan-600 underline">home page</a>
            </Link>
            ;
          </li>
          <li>
            <Link href="https://www.canada.ca/en/contact.html">
              <a className="text-cyan-600 underline">Contact us</a>
            </Link>
            {" and we'll help you out."}
          </li>
        </ul>
      </div>
      <div className="error-404">
        <h1 className="text-2xl">Nous ne pouvons trouver cette page Web</h1>
        <h2>
          {statusCode
            ? `Erreur ${statusCode}`
            : 'Erreur produite sur le client'}
        </h2>
        <p>
          {
            "Nous sommes désolés que vous ayez abouti ici. Il arrive parfois qu'une page ait été déplacée ou supprimée. Heureusement, nous pouvons vous aider à trouver ce que vous cherchez. Que faire?"
          }
        </p>
        <ul>
          <li>
            Retournez à la{' '}
            <Link href="/">
              <a className="text-cyan-600 underline">page {"d'accueil;"}</a>
            </Link>
          </li>
          <li>
            <Link href="https://www.canada.ca/en/contact.html">
              <a className="text-cyan-600 underline">Communiquez avec nous</a>
            </Link>
            {" pour obtenir de l'aide."}
          </li>
        </ul>
      </div>
    </div>
  )
}

/* istanbul ignore next */
export async function getStaticProps({ res, err }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  const bannerContent = await getBetaBannerContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })
  const popupContent = await getBetaPopupExitContent().catch((error) => {
    logger.error(error)
    // res.statusCode = 500
    throw error
  })

  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: `My Service Canada Account - ${statusCode}.`,
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: `Mon dossier Service Canada - ${statusCode}.`,
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Emploi et Développement social Canada',
      accessRights: '1',
    },
  }
  return {
    props: {
      bannerContent: bannerContent.en,
      popupContent: popupContent.en,
      statusCode,
      meta,
    },
  }
}

export default CustomError
