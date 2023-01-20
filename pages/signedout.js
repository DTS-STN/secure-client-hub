import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

const bannerContent = {
  bannerBoldText: '',
  bannerText: '',
  bannerLink: '',
  bannerLinkHref: '',
}

const signedout = (props) => {
  const router = useRouter()

  //signIn('ecasProvider')
  useEffect(() => {
    if (!router.isReady) return
    if (!router.query.error) {
      signIn('ecasProvider')
    }
  }, [router.isReady])
  return <div>...authenticating...</div>
}

export async function getStaticProps({ locale }) {
  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Canada.ca',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Canada.ca',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
    },
  }

  return {
    props: { locale, meta, hideBanner: true },
  }
}

export default signedout
