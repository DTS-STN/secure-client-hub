import React from 'react'
import Head from 'next/head'

export default function MetaData(props) {
  const d = props.language === 'en' ? props.data.data_en : props.data.data_fr

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
          content={props.language === 'en' ? 'eng' : 'fra'}
        />
        <meta name="dcterms.creator" content={d.creator} />
        <meta name="dcterms.accessRights" content={d.accessRights} />
        <meta name="dcterms.service" content={d.service} />
        {/* eslint-disable */}

        <script src="https://assets.adobedtm.com/be5dfd287373/9b9cb7867b5b/launch-cad75bf2f0d2-staging.min.js"></script>
        {/*eslint-enable */}
      </Head>
    </>
  )
}

/* istanbul ignore next */
export async function getStaticProps({ locale }) {
  return {
    props: { locale },
  }
}
