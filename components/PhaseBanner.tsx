import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon as loadIcon } from '../lib/loadIcons'
import Markdown from 'markdown-to-jsx'
import Button from '../components/Button'

interface PhaseBannerProps {
  bannerBoldText?: string
  bannerText: string
  bannerLink: string
  bannerLinkHref: string
  bannerButtonExternalLink: boolean
  bannerButtonExternalText: string
  icon: string
  bannerSummaryTitle: string
  bannerSummaryContent: string
  bannerButtonText: string
  bannerButtonLink: string
  openModal: (link: string, modalId: string) => void
  refPageAA: string
  id: string
}

const PhaseBanner = ({
  bannerBoldText,
  bannerText,
  bannerLink,
  bannerLinkHref,
  bannerButtonExternalLink,
  bannerButtonExternalText,
  icon,
  bannerSummaryTitle,
  bannerSummaryContent,
  bannerButtonText,
  bannerButtonLink,
  openModal,
  refPageAA,
  id,
}: PhaseBannerProps) => {
  return (
    <div className="bg-brighter-blue-medium">
      <div className="sch-container py-4 " data-cy="topBanner">
        <div className="pb-4 md:pb-0" role="alert">
          <div className="pb-2 md:pb-6">
            <p className=" text-xl text-gray-darker" data-cy="learnMoreAbtBeta">
              <span className="font-bold">{bannerBoldText || ''} </span>
              {bannerText}
            </p>
            <a
              data-cy="send-feedback"
              href={bannerLinkHref}
              className="text-xl text-deep-blue-60d hover:text-blue-hover focus:underline focus:text-blue-hover"
              target={bannerButtonExternalLink ? '_blank' : undefined}
              rel={bannerButtonExternalLink ? 'noopener noreferrer' : undefined}
              data-gc-analytics-customclick={`ESDC-EDSC:${refPageAA}:${id}`}
            >
              <span className="mr-2 underline">{bannerLink}</span>
              {bannerButtonExternalLink && (
                <span className="sr-only">{bannerButtonExternalText} </span>
              )}
              <FontAwesomeIcon
                width="14"
                icon={loadIcon[icon as keyof typeof FontAwesomeIcon]}
              ></FontAwesomeIcon>
            </a>
          </div>

          <div className="md:flex sm:flex-row md:justify-between">
            <details
              key={id}
              id={id}
              className="mb-5px text-gray-darker text-20px font-body"
              data-testid="learn-more"
            >
              <summary
                key={`summary-${id}`}
                className=" text-deep-blue-60d hover:text-blue-hover hover:underline focus:underline focus:text-blue-hover px-0.5 py-5px cursor-pointer select-none outline-none"
              >
                {bannerSummaryTitle}
              </summary>
              <div
                data-gc-analytics-customclick={`ESDC-EDSC:${refPageAA}:${id}`}
              >
                <Markdown
                  options={{
                    overrides: {
                      p: {
                        props: {
                          className: 'px-2 mb-1',
                        },
                      },
                      ul: {
                        props: {
                          className:
                            'text-lg md:text-20px list-disc sm:px-2 mx-8 mb-3',
                        },
                      },
                    },
                  }}
                >
                  {bannerSummaryContent}
                </Markdown>
              </div>
            </details>
            <Button
              id="bannerButton"
              style="primary"
              text={bannerButtonText}
              className="whitespace-nowrap max-h-11 my-auto w-full justify-center px-auto xs:w-auto mt-4 sm:mt-0 "
              onClick={(e) => {
                e.preventDefault()
                openModal(bannerButtonLink, 'betaBannerModal')
              }}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhaseBanner
