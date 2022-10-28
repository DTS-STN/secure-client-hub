import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import PhaseBanner from './PhaseBanner'

expecextend(toHaveNoViolations)

describe('PhaseBanner', () => {
  it('renders PhaseBanner', () => {
    render(
      <PhaseBanner
        bannerBoldText={'bannerBoldText'}
        bannerText={'bannerText'}
        bannerLink={'bannerLink'}
        bannerLinkHref={'bannerLinkHref'}
        bannerButtonText={'bannerButtonText'}
      ></PhaseBanner>
    )
    const bannerBoldText = screen.getByText('bannerBoldText')
    const bannerText = screen.getByText('bannerText')
    const bannerLink = screen.getByText('bannerLink')
    const bannerButtonText = screen.getByText('bannerButtonText')
    expect(bannerBoldText).toBeInTheDocument()
    expect(bannerText).toBeInTheDocument()
    expect(bannerLink).toBeInTheDocument()
    expect(bannerButtonText).toBeInTheDocument()
  })

  it('has no a11y viollations', async () => {
    const { container } = render(
      <PhaseBanner
        bannerBoldText={'bannerBoldText'}
        bannerText={'bannerText'}
        bannerLink={'bannerLink'}
        bannerLinkHref={'bannerLinkHref'}
        bannerButtonText={'bannerButtonText'}
      ></PhaseBanner>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
