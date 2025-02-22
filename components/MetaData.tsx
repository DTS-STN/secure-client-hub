import Head from 'next/head'

interface Content {
  title: string
  desc: string
  author: string
  keywords: string
  creator: string
  accessRights: string
  service: string
}

export interface Data {
  data_en: Content
  data_fr: Content
}

interface MetaDataProps {
  language: string
  data: Data
}

const MetaData = ({ language, data }: MetaDataProps) => {
  const d = language === 'en' ? data.data_en : data.data_fr

  return (
    <>
      <Head>
        <style jsx>
          {`
            html {
              animation: fouc-fix 0.001s steps(1);
            }
            @keyframes fouc-fix {
              0% {
                visibility: hidden;
              }
              100% {
                visibility: visible;
              }
            }
          `}
        </style>

        <title>{d.title}</title>

        <meta charSet="utf-8" />
        <meta name="description" content={d.desc} />
        <meta name="author" content={d.author} />
        <meta name="keywords" content={d.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="dcterms.title" content={d.title} />
        <meta
          name="dcterms.language"
          content={language === 'en' ? 'eng' : 'fra'}
        />
        <meta name="dcterms.creator" content={d.creator} />
        <meta name="dcterms.accessRights" content={d.accessRights} />
        <meta name="dcterms.service" content={d.service} />
      </Head>
    </>
  )
}

/* istanbul ignore next */
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: { locale },
  }
}

export default MetaData
