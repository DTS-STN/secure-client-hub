import PropTypes from 'prop-types'
import React from 'react'
import { TopNav } from './TopNav'
import { Menu } from './Menu'
import Image from 'next/image'
import logoFile from '../public/sig-blk-en.svg'
import logoFileFR from '../public/sig-blk-fr.svg'
import Language from './Language'
import { Breadcrumb } from './Breadcrumb'

export function Header(props) {
  const {
    id,
    lang,
    locale,
    linkPath,
    menuProps,
    breadCrumbItems,
    topnavProps,
    dataGcAnalyticsCustomClickInstitutionVariable,
  } = props

  return (
    <div className="font-display" id={id} data-testid="header">
      <TopNav
        lang={lang}
        skipToMainPath={topnavProps.skipToMainPath}
        skipToAboutPath={topnavProps.skipToAboutPath}
        switchToBasicPath={topnavProps.switchToBasicPath}
        displayAlternateLink={topnavProps.displayAlternateLink}
      />
      <header>
        <div className={`sch-container flex flex-col sm:flex-row md:pb-3.5`}>
          <div className="flex flex-row sm:pt-3">
            <div className="pt-1.5">
              <Image
                className={`${
                  lang === 'en'
                    ? 'md:max-h-[34px] max-h-[19px]'
                    : 'md:max-h-[35px] max-h-[20px]'
                } md:max-w-[360px] max-w-[206px]`}
                src={lang === 'en' ? logoFile : logoFileFR}
                alt={
                  lang === 'en'
                    ? 'Government of Canada'
                    : 'Governement du Canada'
                }
                width={819}
                height={76}
              />
            </div>
            <div className="sm:hidden ml-auto pb-2.5">
              <Language
                id="lang2"
                lang={lang}
                path={linkPath}
                locale={locale}
                abbr={lang === 'en' ? 'FR' : 'EN'}
                dataGcAnalyticsCustomClick={
                  dataGcAnalyticsCustomClickInstitutionVariable
                }
              />
            </div>
          </div>
          <div className="pb-2.5 sm:pb-3.5 md:pb-0 hidden sm:ml-auto sm:flex sm:pt-2.5 md:ds-pt-4.5">
            <Language
              id="lang1"
              lang={lang}
              path={linkPath}
              locale={locale}
              dataGcAnalyticsCustomClick={
                dataGcAnalyticsCustomClickInstitutionVariable
              }
            />
          </div>
        </div>
        {!menuProps.hasNoMenu && (
          <Menu
            lang={lang}
            menuList={menuProps.menuList}
            onSignOut={menuProps.onSignOut}
            dataGcAnalyticsCustomClickInstitutionVariable={
              dataGcAnalyticsCustomClickInstitutionVariable
            }
          />
        )}
        {breadCrumbItems && (
          <div className="sch-container">
            <Breadcrumb items={breadCrumbItems} />
          </div>
        )}
      </header>
    </div>
  )
}

Header.defaultProps = {
  lang: 'en',
  id: Math.random(),
  searchProps: {
    onChange: () => {},
    onSubmit: () => {},
  },
  menuProps: {
    onSignOut: () => {},
    menuList: [
      { key: 'dashKey', value: 'My dashboard', path: '/' },
      { key: 'securityKey', value: 'Security Settings', path: '/' },
      { key: 'profileKey', value: 'Profile', path: '/' },
      { key: 'outKey', value: 'Sign out', path: '/' },
    ],
    hasNoMenu: false,
  },
  topnavProps: {
    skipToMainPath: '#wb-cont',
    skipToAboutPath: '#wb-info',
    switchToBasicPath: 'basic-en.html',
    displayAlternateLink: false,
  },
}

Header.propTypes = {
  /**
   * Component ID
   */
  id: PropTypes.string,

  /**
   * Switch between english and french header. Pass in "en" or "fr"
   */
  lang: PropTypes.string,

  /**
   * Language toggle redirection link
   */
  linkPath: PropTypes.string,

  /**
   * Search Props:
   *
   * onChange: can add function for when typing in the search bar
   *
   * onSubmit: can add function for when submitting a search query
   */
  searchProps: PropTypes.shape({
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  }),

  /**
   * Menu items
   *
   * profilePath: href path, which redirects to the profile page
   *
   * securityPath: href path, which redirects to the security settings page
   *
   * dashboardPath: href path, which redirects to the dashboard page
   *
   * signOutPath: href path, which the signout button will redirect to
   *
   * onSignOut: On change function used for the signout button on the browser screen
   *
   */
  menuProps: PropTypes.shape({
    onSignOut: PropTypes.func,
    menuList: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string,
        path: PropTypes.string,
      })
    ),
    hasNoMenu: PropTypes.bool,
  }),

  /**
   * TopNav items
   *
   * skipToMainPath: href anchor, which navigates to the H1 of the page
   *
   * skipToAboutPath: href anchor, which navigates to the Footer Id
   *
   * switchToBasicPath: href path, which redirects to the alternate HTML only page
   *
   * displayAlternateLink: Bool to display or not the alternate page link
   */
  topnavProps: PropTypes.shape({
    skipToMainPath: PropTypes.string,
    skipToAboutPath: PropTypes.string,
    switchToBasicPath: PropTypes.string,
    displayAlternateLink: PropTypes.bool,
  }),

  /**
   * Breadcrumb items
   *
   * items: set of object in breadcrumb list, give text and link for object
   */
  breadCrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      link: PropTypes.string,
    })
  ),

  /**
   * Prefix for Adobe Analytics tag
   */
  dataGcAnalyticsCustomClickInstitutionVariable: PropTypes.string,

  /**
   * Test id for unit test
   */
  dataTestId: PropTypes.string,

  /**
   * For tracking click events analytics
   */
  analyticsTracking: PropTypes.bool,
}
