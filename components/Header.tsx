import { TopNav } from './TopNav'
import Menu from './Menu'
import Image from 'next/image'
import logoFile from '../public/sig-blk-en.svg'
import logoFileFR from '../public/sig-blk-fr.svg'
import Language from './Language'
import Breadcrumb from './Breadcrumb'

interface SearchProps {
  onChange: () => void
  onSubmit: () => void
}

interface MenuProps {
  onSignOut: () => void
  menuList: MenuList[]
}

interface MenuList {
  id: string
  key: string
  value: string
  path: string
  showIcon: boolean
  onSignOut: () => void
}

interface TopNavProps {
  skipToMainPath: string
  skipToAboutPath: string
  switchToBasicPath: string
  displayAlternateLink: boolean
}

interface BreadcrumbItemProps {
  text: string
  link: string
}

interface HeaderProps {
  id: string
  lang: string
  linkPath: string
  searchProps: SearchProps
  menuProps: MenuProps
  topnavProps: TopNavProps
  breadCrumbItems: BreadcrumbItemProps[]
  refPageAA: string
  dataGcAnalyticsCustomClickInstitutionVariable: string
  dataGcAnalyticsCustomClickMenuVariable: string
}

const Header = ({
  id,
  lang,
  linkPath,
  menuProps,
  breadCrumbItems,
  refPageAA,
  topnavProps,
  dataGcAnalyticsCustomClickInstitutionVariable,
  dataGcAnalyticsCustomClickMenuVariable,
}: HeaderProps) => {
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
                    ? 'max-h-[19px] md:max-h-[34px]'
                    : 'max-h-[20px] md:max-h-[35px]'
                } max-w-[206px] md:max-w-[360px]`}
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
            <div className="ml-auto pb-2.5 sm:hidden">
              <Language
                id="lang2"
                lang={lang}
                path={linkPath}
                abbr={lang === 'en' ? 'FR' : 'EN'}
                dataGcAnalyticsCustomClick={
                  dataGcAnalyticsCustomClickInstitutionVariable
                }
              />
            </div>
          </div>
          <div className="md:ds-pt-4.5 hidden pb-2.5 sm:ml-auto sm:flex sm:pb-3.5 sm:pt-2.5 md:pb-0">
            <Language
              id="lang1"
              lang={lang}
              path={linkPath}
              dataGcAnalyticsCustomClick={
                dataGcAnalyticsCustomClickInstitutionVariable
              }
            />
          </div>
        </div>
        <Menu
          lang={lang}
          menuList={menuProps.menuList}
          dataGcAnalyticsCustomClick={dataGcAnalyticsCustomClickMenuVariable}
        />
        <div className="sch-container">
          <Breadcrumb items={breadCrumbItems} refPageAA={refPageAA} />
        </div>
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
  },
  topnavProps: {
    skipToMainPath: '#wb-cont',
    skipToAboutPath: '#wb-info',
    switchToBasicPath: 'basic-en.html',
    displayAlternateLink: false,
  },
}

export default Header
