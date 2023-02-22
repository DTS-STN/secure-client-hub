/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Custom503 from '../../pages/503'
import { getStaticProps } from '../../pages/503'

// 'Mock' call to fetchContent
jest.mock('../../lib/cms', () => ({
  fetchContent: () => {
    return {}
  },
}))

describe('503', () => {
  beforeEach(() => {
    process.env = {
      ...process.env,
      AUTH_DISABLED: false,
    }
  })

  it('renders 503 without crashing', () => {
    render(<Custom503 locale="en" isAuth={false} />)
    expect(screen.getByText('Error 503')).toBeInTheDocument()
  })

  it('Test getStaticProps', async () => {
    const props = await getStaticProps({ locale: 'en' })

    expect(props).toEqual({
      props: {
        locale: 'en',
        langToggleLink: '/fr/503',
        meta: {
          data_en: {
            title: '503 - My Service Canada Account',
            desc: 'English',
            author: 'Service Canada',
            keywords: '',
            service: 'ESDC-EDSC_MSCA-MSDC',
            creator: 'Employment and Social Development Canada',
            accessRights: '1',
          },
          data_fr: {
            title: '503 - Mon dossier Service Canada',
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
