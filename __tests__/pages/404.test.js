/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Custom404 from '../../pages/404'
import { getStaticProps } from '../../pages/404'

// 'Mock' call to fetchContent
jest.mock('../../lib/cms', () => ({
  fetchContent: () => {
    return {}
  },
}))

describe('404', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      AUTH_DISABLED: false,
    }
  })

  it('renders 404 without crashing', () => {
    render(<Custom404 locale="en" isAuth={false} />)
    expect(screen.getByText('Error 404')).toBeInTheDocument()
  })

  it('Test getStaticProps', async () => {
    const props = await getStaticProps({ locale: 'en', isAuth: false })

    expect(props).toEqual({
      props: {
        locale: 'en',
        langToggleLink: '/fr/404',
        meta: {
          data_en: {
            title: 'My Service Canada Account - 404',
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Employment and Social Development Canada',
            accessRights: '1',
          },
          data_fr: {
            title: 'Mon dossier Service Canada - 404',
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
