import throttle from 'lodash.throttle'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import en from '../locales/en'
import fr from '../locales/fr'
import { lato, notoSans } from '../utils/fonts'
import Footer from './Footer'
import Header, { BreadcrumbItemProps } from './Header'
import IdleTimeout from './IdleTimeout'
import MetaData, { Data } from './MetaData'
import { getRedisService } from '../pages/api/redis-service'

interface LayoutProps {
  locale?: 'en' | 'fr' | 'und'
  meta: Data
  langToggleLink?: string
  breadCrumbItems?: BreadcrumbItemProps[]
  display?: { hideBanner: boolean }
  refPageAA: string
  dataGcAnalyticsCustomClickMenuVariable: string
  title: string
  children: ReactElement
}

export default function Layout({
  locale = 'en',
  langToggleLink = '',
  breadCrumbItems = [],
  meta,
  refPageAA,
  children,
  dataGcAnalyticsCustomClickMenuVariable,
}: LayoutProps) {
  const t = locale === 'en' ? en : fr
  const [response, setResponse] = useState<Response>()
  const router = useRouter()
  const contactLink = locale === 'en' ? '/en/contact-us' : '/fr/contactez-nous'

  const validationResponse = useCallback(
    async () => setResponse(await fetch('/api/refresh-msca')),
    [],
  )
  //Event listener for click events that revalidates MSCA session, throttled using lodash to only trigger every 1 minute
  const throttledOnClickEvent = useMemo(
    () => throttle(validationResponse, 60000, { trailing: false }),
    [validationResponse],
  )
  //Event listener for visibility change events that revalidates MSCA session, throttled using lodash to only trigger every 15 seconds
  const throttledVisiblityChangeEvent = useMemo(
    () => throttle(validationResponse, 15000, { trailing: false }),
    [validationResponse],
  )

  //If session is valid, add event listeners to check for valid sessions on click and visibility change events
  useEffect(() => {
    window.addEventListener('visibilitychange', throttledVisiblityChangeEvent)
    window.addEventListener('click', throttledOnClickEvent)
    //If validateSession call indicates an invalid MSCA session, end next-auth session and redirect to login
    if (response?.status === 401) {
      async function deleteIdToken() {
        const redisService = await getRedisService()
        redisService.del('idToken')
      }
      deleteIdToken()
      router.push(`/${props.locale}/auth/login`)
    }
    //Remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('click', throttledOnClickEvent)
      window.removeEventListener(
        'visiblitychange',
        throttledVisiblityChangeEvent,
      )
    }
  }, [
    throttledOnClickEvent,
    throttledVisiblityChangeEvent,
    response,
    router,
    locale,
  ])

  return (
    <>
      <style jsx global>{`
        :root {
          --lato-font: ${lato.style.fontFamily};
          --noto-sans-font: ${notoSans.style.fontFamily};
        }
      `}</style>
      <MetaData language={locale} data={meta}></MetaData>
      <Header
        id="header"
        linkPath={langToggleLink}
        lang={locale}
        breadCrumbItems={breadCrumbItems}
        refPageAA={refPageAA}
        topnavProps={{
          skipToMainPath: '#mainContent',
          skipToAboutPath: '#page-footer',
          switchToBasicPath: '',
          displayAlternateLink: false,
        }}
        dataGcAnalyticsCustomClickInstitutionVariable={children.props.aaPrefix}
        dataGcAnalyticsCustomClickMenuVariable={
          dataGcAnalyticsCustomClickMenuVariable
        }
        menuProps={{
          menuList: [
            {
              key: 'dashKey',
              id: 'my-dashboard',
              value: t.menuItems.dashboard,
              path: `${
                locale === 'en' ? '/en/my-dashboard' : '/fr/mon-tableau-de-bord'
              }`,
            },
            {
              key: 'profileKey',
              id: 'profile',
              value: t.menuItems.profile,
              path: `${locale === 'en' ? '/en/profile' : '/fr/profil'}`,
            },
            {
              key: 'securityKey',
              id: 'security',
              value: t.menuItems.security,
              path: `${
                locale === 'en'
                  ? '/en/security-settings'
                  : '/fr/parametres-securite'
              }`,
            },
            {
              key: 'contactKey',
              id: 'contact',
              value: t.menuItems.contactUs,
              path: `${
                locale === 'en' ? '/en/contact-us' : '/fr/contactez-nous'
              }`,
            },
            {
              key: 'signOutKey',
              id: 'signOut',
              value: t.menuItems.signOut,
              path: '/auth/logout',
              showIcon: true,
            },
          ],
        }}
        searchProps={{
          onChange: function noRefCheck() {},
          onSubmit: function noRefCheck() {},
        }}
      />
      <main id="mainContent" className="sch-container grid gap-[30px]">
        {children}
      </main>
      <IdleTimeout locale={locale} refPageAA={refPageAA} />
      <Footer
        lang={locale}
        brandLinks={[
          {
            href:
              getConfig()?.publicRuntimeConfig.ENVIRONMENT === 'production'
                ? t.footerTermsAndConditionURL
                : t.footerTermsAndConditionDevURL,
            id: 'linkTC',
            text: t.footerTermsAndCondition,
          },
          {
            href:
              getConfig()?.publicRuntimeConfig.ENVIRONMENT === 'production'
                ? t.footerPrivacyURL
                : t.footerPrivacyDevURL,
            id: 'linkPR',
            text: t.footerPrivacy,
          },
        ]}
        contactLink={contactLink}
        btnLink="#top"
        id="page-footer"
      />
    </>
  )
}
