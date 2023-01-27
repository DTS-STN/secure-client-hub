import React from 'react'
import Head from 'next/head'

export default function MetaData(props) {
  const d = props.language === 'en' ? props.data.data_en : props.data.data_fr

  return (
    <>
      <Head>
        <title>{d.title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={d.desc} />
        <meta name="author" content={d.author} />
        <meta name="keywords" content={d.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="dcterms.title" content="My Service Canada Account" />
        <meta name="dcterms.language" content="eng" />
        <meta name="dcterms.creator" content="Service Canada" />
        <meta name="dcterms.accessRights" content="2" />
        <meta
          name="dcterms.service"
          content="ESDC-
EDSC_MSCA-MSDC"
        />
        {/* eslint-disable */}
        <script
          src="https://assets.adobedtm.com/be5dfd287373/8cdb3d539c44/launch-
dfa8abb35555-staging.min.js"
        ></script>
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
