import Image from 'next/image'
import Link from 'next/link'
import MetaData from '../components/MetaData'

export default function Index(props) {
  return (
    <div role="main" className="container mx-auto px-6 my-5 bg-slate-300 p-12">
      <MetaData language="en" data={props.meta}></MetaData>
      <div className="flex flex-col justify-center items-center m-auto">
        <div className="z-10 bg-white h-auto w-[18.75rem] xl:w-[31.25rem]">
          <h1 className="sr-only">service.canada.ca-digital-center</h1>

          <div className="h-auto w-64 mx-auto pt-6 xl:w-2/3 xl:mx-0 xl:px-6">
            <Image
              src="/sig-blk-en.svg"
              alt="Government of Canada / Gouvernement du Canada logo"
              width={10}
              height={1}
              layout="responsive"
              objectFit="scale-down"
            ></Image>
          </div>
          <div className="flex w-max container py-11 mx-auto font-display">
            <div className="grid grid-cols-2 gap-2 xl:gap-6">
              <Link
                href="/en/my-dashboard"
                className="font-display rounded focus:ring-1 focus:ring-black focus:ring-offset-2 py-2 px-10 whitespace-pre bg-deep-blue-medium text-white text-center border border-deep-blue-medium active:bg-deep-blue-active hover:bg-bright-blue-dark grid place-items-center"
                role="button"
                draggable="false"
                lang="en"
                id="english-button"
              >
                English
              </Link>

              <Link
                href="/fr/mon-tableau-de-bord"
                className="font-display rounded focus:ring-1 focus:ring-black focus:ring-offset-2 py-2 px-10 whitespace-pre bg-deep-blue-medium text-white text-center border border-deep-blue-medium active:bg-deep-blue-active hover:bg-bright-blue-dark grid place-items-center"
                role="button"
                draggable="false"
                lang="fr"
                id="french-button"
              >
                Français
              </Link>
            </div>
          </div>
        </div>

        <div className="relative py-8 bg-gray-light text-p h-auto min-w-[18.75rem] w-[18.75rem] flex justify-between p-6 xl:w-[31.25rem] xl:items-center">
          <div className="w-28 text-base xl:text-p xl:w-max font-body text-bright-blue-dark">
            <Link
              href="https://www.canada.ca/en/transparency/terms.html"
              className="inline-block w-28 xl:w-max mr-0 hover:underline splash-a text-lg"
              lang="en"
              data-cy="terms"
            >
              Terms &amp; conditions
            </Link>
            <span> • </span>
            <Link
              href="https://www.canada.ca/fr/transparence/avis.html"
              className="inline-block hover:underline font-body text-lg"
              lang="fr"
              data-cy="avis"
            >
              Avis
            </Link>
          </div>
          <img className="h-auto w-24 xl:w-28" src="/wmms-blk.svg" alt="" />
        </div>
      </div>
    </div>
  )
}

Index.getLayout = function PageLayout(page) {
  return <>{page}</>
}

export async function getServerSideProps({ locale }) {
  /* Place-holder Meta Data Props */
  const meta = {
    data_en: {
      title: 'My Service Canada Account - Canada.ca',
      desc: 'English',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Employment and Social Development Canada',
      accessRights: '1',
    },
    data_fr: {
      title: 'Mon dossier Service Canada - Canada.ca',
      desc: 'Français',
      author: 'Service Canada',
      keywords: '',
      service: 'ESDC-EDSC_MSCA-MSDC',
      creator: 'Emploi et Développement social Canada',
      accessRights: '1',
    },
  }

  return {
    props: {
      locale,
      meta,
    },
  }
}
