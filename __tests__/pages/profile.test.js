/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Profile from '../../pages/profile'
import Heading from '../../components/Heading'
import { getServerSideProps } from '../../pages/profile'

import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// mocks profile mapper
jest.mock('../../graphql/mappers/profile', () => ({
  getProfileContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({ en: {}, fr: {} })
    })
  },
}))

jest.mock('../../graphql/mappers/beta-banner-opt-out', () => ({
  getBetaBannerContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({ en: {}, fr: {} })
    })
  },
}))

jest.mock('../../graphql/mappers/beta-popup-exit', () => ({
  getBetaPopupExitContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({ en: {}, fr: {} })
    })
  },
}))

jest.mock('../../graphql/mappers/beta-popup-page-not-available', () => ({
  getBetaPopupNotAvailableContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({ en: {}, fr: {} })
    })
  },
}))

jest.mock('../../graphql/mappers/auth-modals', () => ({
  getAuthModalsContent: () => {
    return new Promise(function (resolve, reject) {
      resolve({
        mappedPopupStaySignedIn: { en: {}, fr: {} },
        mappedPopupSignedOut: { en: {}, fr: {} },
      })
    })
  },
}))

jest.mock('../../components/Heading')
// return props.title from Heading mock
Heading.mockImplementation((props) => props.title)

describe('My Profile page', () => {
  const content = {
    list: [
      {
        title: 'title',
        tasks: [
          {
            id: 'id',
            title: 'title',
            areaLabel: 'areaLabel',
            link: '/',
            icon: '',
            betaPopUp: false,
          },
        ],
      },
    ],
    lookingFor: {
      title: 'title',
      subText: ['text', 'text'],
      link: '/',
    },
    backToDashboard: {
      id: 'id',
      btnText: 'btnText',
      btnLink: '/',
    },
  }
  const popupContent = {}

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
  })

  it('should render the page in English', () => {
    render(
      <Profile
        heading={{
          id: 'my-dashboard-heading',
          title: 'pageName',
        }}
        locale="en"
        content={content}
        meta={{}}
        popupContent={popupContent}
        popupContentNA={popupContent}
        breadCrumbItems={[]}
        langToggleLink={''}
      />
    )
    const profileDiv = screen.getByTestId('profileContent-test')
    expect(profileDiv).toBeInTheDocument()
  })

  it('should render the page in French', () => {
    render(
      <Profile
        heading={{
          id: 'my-dashboard-headingFR',
          title: 'headingFR',
        }}
        locale="fr"
        content={content}
        meta={{}}
        popupContent={popupContent}
        popupContentNA={popupContent}
        breadCrumbItems={[]}
        langToggleLink={''}
      />
    )
    const profileDiv = screen.getByTestId('profileContent-test')
    expect(profileDiv).toBeInTheDocument()
  })

  it('Test getServerSideProps', async () => {
    const props = await getServerSideProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        content: {},
        bannerContent: {},
        breadCrumbItems: undefined,
        langToggleLink: '/fr/profil',
        locale: 'en',
        meta: {
          data_en: {
            title: 'Profile - My Service Canada Account',
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Employment and Social Development Canada',
            accessRights: '1',
          },
          data_fr: {
            title: 'Profil - Mon dossier Service Canada',
            desc: 'Français',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Emploi et Développement social Canada',
            accessRights: '1',
          },
        },
        popupContent: {},
        popupContentNA: {},
        popupYouHaveBeenSignedout: {},
        popupStaySignedIn: {},
        aaPrefix: 'ESDC-EDSC:undefined',
      },
    })
  })
})
