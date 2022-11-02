import propTypes from 'prop-types'
import { Button } from '@dts-stn/service-canada-design-system'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../lib/loadIcons'

/**
 * Displays the PhaseBanner on the page
 */

export default function PhaseBanner(props) {
  return (
    <div className="bg-brighter-blue-medium">
      <div
        className=" ds-container py-4 md:flex md:justify-between"
        data-cy="topBanner"
      >
        <div className="pb-4 md:pb-0">
          <p role="alert" className="pb-2 md:pb-7" data-cy="learnMoreAbtBeta">
            <span className="font-medium">{props.bannerBoldText} </span>
            {props.bannerText}
          </p>
          <a
            href={props.bannerLinkHref}
            className="text-deep-blue-dark hover:text-blue-hover"
          >
            <span className="mr-2 underline">{props.bannerLink}</span>
            <FontAwesomeIcon
              icon={icon['arrow-up-right-from-square']}
            ></FontAwesomeIcon>
          </a>
        </div>
        <Button
          styling="primary"
          text={props.bannerButtonText}
          className="max-h-11 my-auto text-sm w-full justify-center px-auto sm:w-auto"
        ></Button>
      </div>
    </div>
  )
}

PhaseBanner.propTypes = {
  /**
   * Phasebanner text Bold
   */
  bannerBoldText: propTypes.string,
  /**
   * Phasebanner text
   */
  bannerText: propTypes.string,
  /**
   * Phasebanner Link text
   */
  bannerLink: propTypes.string,
  /**
   * Phasebanner Link href
   */
  bannerLinkHref: propTypes.string,
  /**
   * Phasebanner Button Text
   */
  bannerButtonText: propTypes.string,
}
