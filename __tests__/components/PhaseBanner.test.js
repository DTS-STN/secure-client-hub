import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import PhaseBanner from '../../components/PhaseBanner'

expect.extend(toHaveNoViolations)

describe('PhaseBanner', () => {
  const popupContent = {
    scId: 'beta-popup-exit',
    scHeadingEn: 'Exiting beta version',
    scHeadingFr: 'Vous quittez la version bêta',
    scContentEn:
      'Thank you for trying the beta version. You are now returning to My Service Canada Account home page.',
    scContentFr:
      "Merci d'avoir essayé la version bêta. Nous vous redirigeons vers la page d’accueil de Mon dossier Service Canada.",
    scFragments: [
      {
        scId: 'stay-on-beta-version',
        // scLinkTextAssistiveEn: "Stay on beta version",
        // scLinkTextAssistiveFr: "Rester sur la version bêta",
        scLinkTextEn: 'Stay on beta version',
        scLinkTextFr: 'Rester sur la version bêta',
      },
      {
        scId: 'exit-beta-version',
        // scLinkTextAssistiveEn: 'Continue to page',
        // scLinkTextAssistiveFr: 'Continuer vers la page',
        scLinkTextEn: 'Exit Beta version',
        scLinkTextFr: 'Quitter la version beta',
      },
    ],
  }
  it('renders PhaseBanner', () => {
    render(
      <PhaseBanner
        bannerBoldText={'bannerBoldText'}
        bannerText={'bannerText'}
        bannerSummaryTitle={'bannerSummaryTitle'}
        bannerSummaryContent={'bannerSummaryContent'}
        bannerButtonText={'bannerButtonText'}
        bannerButtonLink={'bannerButtonLink'}
        popupContent={{
          popupId: 'popup id',
          popupTitle: 'pop up title',
          popupDescription: 'pop up desc',
          popupPrimaryBtn: { id: 'Test Primary Id', text: 'Test Primary Text' },
          popupSecondaryBtn: { id: 'Test secont Id', text: 'Test second Text' },
        }}
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
        bannerSummaryTitle={'bannerSummaryTitle'}
        bannerSummaryContent={'bannerSummaryContent'}
        bannerButtonText={'bannerButtonText'}
        bannerButtonLink={'bannerButtonLink'}
        popupContent={{
          popupId: 'popup id',
          popupTitle: 'pop up title',
          popupDescription: 'pop up desc',
          popupPrimaryBtn: { id: 'Test Primary Id', text: 'Test Primary Text' },
          popupSecondaryBtn: { id: 'Test secont Id', text: 'Test second Text' },
        }}
      ></PhaseBanner>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
