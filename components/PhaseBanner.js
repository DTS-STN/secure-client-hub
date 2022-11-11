import propTypes from 'prop-types'
import { Button } from '@dts-stn/service-canada-design-system'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../lib/loadIcons'
import Modal from 'react-modal'
import React from 'react'
import ExitBeta from './ExitBetaModal'

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
          <p role="alert" className="pb-2 md:pb-7" data-cy="learnMoreAbtBeta">
            <span className="font-medium">{props.bannerBoldText} </span>
            {props.bannerText}
          </p>
          <a
            href={props.bannerLinkHref}
            className="text-deep-blue-dark hover:text-blue-hover"
          >
            <span className="mr-2 underline">{props.bannerLink}</span>
            <FontAwesomeIcon icon={icon[props.icon]}></FontAwesomeIcon>
          </a>
        </div>
        <a
          href={'#'}
          className="max-h-11 my-auto w-full justify-center px-auto sm:w-auto"
        >
          <Button
            id="bannerButton"
            styling="primary"
            text={props.bannerButtonText}
            className="text-sm"
            onClick={(e) => {
              e.preventDefault()
              openModal(props.bannerButtonLink)
            }}
          ></Button>
        </a>
      </div>

      <Modal
        className="flex justify-center bg-black/75 h-full"
        isOpen={openModalWithLink.isOpen}
        onRequestClose={closeModal}
        contentLabel={'Lorem Upsum Text'}
      >
        <ExitBeta
          closeModal={closeModal}
          closeModalAria={'Lorem Upsum Text'}
          continueLink={openModalWithLink.activeLink}
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
   * Icon Text
   */
  icon: propTypes.string,
}
