import propTypes from 'prop-types'
import { Button } from '@dts-stn/service-canada-design-system'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../lib/loadIcons'
import Modal from 'react-modal'
import React from 'react'
import ExitBetaModal from './ExitBetaModal'

/**
 * Displays the PhaseBanner on the page
 */

export default function PhaseBanner(props) {
  const [openModalWithLink, setOpenModalWithLink] = React.useState({
    isOpen: false,
    activeLink: '/',
  })

  function openModal(link) {
    setOpenModalWithLink({ isOpen: true, activeLink: link })
  }

  function closeModal() {
    setOpenModalWithLink({ isOpen: false, activeLink: '/' })
  }

  return (
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
            <span className="font-bold">{props.bannerBoldText || ''} </span>
            {props.bannerText}
          </p>
          <a
            href={props.bannerLinkHref}
            className="font-body text-xl text-deep-blue-dark hover:text-blue-hover"
            target={props.bannerButtonExternalLink ? '_blank' : undefined}
            rel={
              props.bannerButtonExternalLink ? 'noopener noreferrer' : undefined
            }
            data-gc-analytics-customclick={`ESDC-EDSC:${props.refPageAA}:${props.bannerButtonExternalText}`}
          >
            <span className="mr-2 underline">{props.bannerLink}</span>
            {props.bannerButtonExternalLink && (
              <span className="sr-only">{props.bannerButtonExternalText} </span>
            )}
            <FontAwesomeIcon
              width="14"
              icon={icon[props.icon]}
            ></FontAwesomeIcon>
          </a>
        </div>
        <Button
          id="bannerButton"
          styling="primary"
          text={props.bannerButtonText}
          className="font-body text-xl whitespace-nowrap max-h-11 my-auto w-full justify-center px-auto sm:w-auto"
          onClick={(e) => {
            e.preventDefault()
            openModal(props.bannerButtonLink)
          }}
        ></Button>
      </div>

      <Modal
        className="flex justify-center bg-black/75 h-full"
        isOpen={openModalWithLink.isOpen}
        onRequestClose={closeModal}
        contentLabel={'Modal'}
      >
        <ExitBetaModal
          closeModal={closeModal}
          closeModalAria={props.bannerButtonText}
          continueLink={openModalWithLink.activeLink}
          popupId={props.popupContent.popupId}
          popupTitle={props.popupContent.popupTitle}
          popupDescription={props.popupContent.popupDescription}
          popupPrimaryBtn={props.popupContent.popupPrimaryBtn}
          popupSecondaryBtn={props.popupContent.popupSecondaryBtn}
          refPageAA={props.refPageAA}
        />
      </Modal>
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
  /**
   * Phasebanner Button Href
   */
  bannerButtonHref: propTypes.string,
  /**
   * Boolean to determine if the button in the banner links to an external page
   */
  bannerButtonExternalLink: propTypes.bool,
  /**
   * Screen reader only external link text
   */
  bannerButtonExternalText: propTypes.string,
  /**
   * Icon Text
   */
  icon: propTypes.string,
  /**
   * Popup content
   */
  popupContent: propTypes.shape({
    popupId: propTypes.string.isRequired,
    popupTitle: propTypes.string.isRequired,
    popupDescription: propTypes.string.isRequired,
    popupPrimaryBtn: propTypes.shape({
      id: propTypes.string.isRequired,
      text: propTypes.string.isRequired,
    }),
    popupSecondaryBtn: propTypes.shape({
      id: propTypes.string.isRequired,
      text: propTypes.string.isRequired,
    }),
  }),
}
