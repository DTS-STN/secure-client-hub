/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Custom500 from '../../pages/500'
import { getStaticProps } from '../../pages/500'

// 'Mock' call to fetchContent
jest.mock('../../lib/cms', () => ({
  fetchContent: () => {
    return {}
  },
}))

describe('500', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      AUTH_DISABLED: false,
    }
  })

  it('renders 500 without crashing', () => {
    render(<Custom500 locale="en" isAuth={false} />)
    expect(screen.getByText('Error 500')).toBeInTheDocument()
  })

  it('Test getStaticProps', async () => {
    const props = await getStaticProps({ locale: 'en', isAuth: false })

    expect(props).toEqual({
      props: {
        locale: 'en',
        langToggleLink: '/fr/500',
        meta: {
          data_en: {
            title: 'My Service Canada Account - 500',
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Employment and Social Development Canada',
            accessRights: '1',
          },
          data_fr: {
            title: 'Mon dossier Service Canada - 500',
            desc: 'Français',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Emploi et Développement social Canada',
            accessRights: '1',
          },
        },
        hideBanner: true,
        isAuth: false,
      },
    })
  })
})
