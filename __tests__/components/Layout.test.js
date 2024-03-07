//Skipping tests for now as they need a full re-write

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// the code below is to avoid the following error:
//    "An update to Link inside a test was not wrapped in act(...)"
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => (
    <children.type {...children.props} href={href} />
  ),
}))

jest.mock('../../utils/fonts', () => ({
  lato: {
    style: {
      fontFamily: 'Lato',
    },
  },
  notoSans: {
    style: {
      fontFamily: '"Noto Sans"',
    },
  },
}))

// Children must be passed to test Adobe Analytics through the design system

const aaChildrenProps = (
  <div content={{ main: '' }} id="__next" data-reactroot />
)

expect.extend(toHaveNoViolations)

describe('Layout with default text', () => {
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Canada.ca',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Canada.ca',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC-SCH',
      creator: 'Emploi et Développement social Canada',
      accessRights: '1',
    },
  }
  const display = { hideBanner: true }
  const popupContentNA = {
    popupId: '',
    popupTitle: '',
    popupDescription: '',
    popupPrimaryBtn: '',
  }

  useRouter.mockImplementation(() => ({
    pathname: '/',
    asPath: '/',
  }))

  it.skip('Layout contains Symbol of GoC', () => {
    render(
      <Layout
        locale="en"
        meta={meta}
        display={display}
        // children={aaChildrenProps}
        popupContentNA={popupContentNA}
      />,
    )
    expect(screen.getByAltText('Government of Canada')).toBeInTheDocument()
  })

  it.skip('Layout contains a Main tag', () => {
    render(
      <Layout
        locale="en"
        meta={meta}
        display={display}
        // children={aaChildrenProps}
        popupContentNA={popupContentNA}
      />,
    )
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  // it('Layout renders header', () => {
  //   render(<Layout locale="en" meta={meta} />)
  //   expect(screen.getByTestId('design-system-header')).toBeInTheDocument()
  // })

  // it('Layout renders footer', () => {
  //   render(<Layout locale="en" meta={meta} />)
  //   expect(screen.getByTestId('design-system-footer')).toBeInTheDocument()
  // })

  it.skip('Layout contains no a11y violations', async () => {
    const { container } = render(
      <Layout
        locale="en"
        meta={meta}
        display={display}
        // children={aaChildrenProps}
        popupContentNA={popupContentNA}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
