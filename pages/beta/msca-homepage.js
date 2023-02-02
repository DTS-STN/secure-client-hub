import en from '../../locales/en'
import fr from '../../locales/fr'
import { Button } from '@dts-stn/service-canada-design-system'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import BackToButton from '../../components/BackToButton'
import MetaData from '../../components/MetaData'
import Router from 'next/router'

import React from 'react'

export default function MscaHomepage(props) {
  const t = props.locale === 'en' ? en : fr

  return (
    <div role="main" className=" mx-auto">
      <MetaData language={props.locale} data={props.meta}></MetaData>
      <div className="bg-brighter-blue-medium">
        <div
          className=" ds-container py-4 md:flex md:justify-between"
          data-cy="topBanner"
        >
          <div className="pb-4 md:pb-0">
            <p
              role="alert"
              className="pb-2 md:pb-7 font-body text-xl"
              data-cy="learnMoreAbtBeta"
            >
              <span className="font-bold">{t.betaBanner.bannerBoldText} </span>
              {t.betaBanner.bannerText}
            </p>
            <a
              href={t.betaBanner.bannerLinkHref}
              className="font-body text-xl text-deep-blue-dark hover:text-blue-hover"
            >
              <span className="mr-2 underline">{t.betaBanner.bannerLink}</span>
              <FontAwesomeIcon
                width="14"
                icon={solid('arrow-up-right-from-square')}
              ></FontAwesomeIcon>
            </a>
          </div>
          <Button
            id="bannerButton"
            styling="primary"
            text={t.betaBanner.bannerButtonText}
            className="font-body text-xl whitespace-nowrap max-h-11 my-auto w-full justify-center px-auto sm:w-auto"
            onClick={() =>
              Router.push(
                props.locale === 'en' ? '/my-dashboard' : '/fr/my-dashboard'
              )
            }
          ></Button>
        </div>
      </div>
      <div className="flex flex-col  items-center m-auto">
        <h1 className="sr-only">service.canada.ca-digital-center</h1>
        {/* <img src='/beta/Status_updates.svg' alt='next' /> */}
        <div className="mx-auto sm:hidden">
          {props.locale === 'en' ? (
            <img src="/beta/MSCA_mobile_EN.png" alt="next" />
          ) : (
            <img src="/beta/MSCA_mobile_FR.png" alt="next" />
          )}
        </div>

        <div className="sm:block hidden">
          {props.locale === 'en' ? (
            <img src="/beta/MSCA_desktop_EN.png" alt="next" />
          ) : (
            <img src="/beta/MSCA_desktop_FR.png" alt="next" />
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

MscaHomepage.getLayout = function PageLayout(page) {
  return <>{page}</>
}

export async function getServerSideProps({ locale }) {
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
    props: {
      locale,
      meta,
    },
  }
}
