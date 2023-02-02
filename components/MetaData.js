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
        <meta name="dcterms.title" content={d.title} />
        <meta
          name="dcterms.language"
          content={props.language === 'en' ? 'eng' : 'fra'}
        />
        <meta
          name="dcterms.creator"
          content={
            props.language === 'en'
              ? 'Employment and Social Development Canada'
              : 'Emploi et Développement social Canada'
          }
        />
        <meta name="dcterms.accessRights" content="1" />
        <meta
          name="dcterms.service"
          content={
            props.language === 'en'
              ? 'SDC-EDSC_MSCA-MDSC'
              : 'ESDC-EDSC_MSCA-MDSC'
          }
        />
        {/* eslint-disable */}
        <script
          src="//assets.adobedtm.com/be5dfd287373/9b9cb7867b5b/launch-cad75bf2f0d2-staging.min.js"
          data-nscript="afterInteractive"
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
