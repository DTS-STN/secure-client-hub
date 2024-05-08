import Image from 'next/legacy/image'
import Link from 'next/link'
import MetaData from '../components/MetaData'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'

interface Data {
  title: string
  desc: string
  author: string
  keywords: string
  service: string
  creator: string
  accessRights: string
}

interface IndexProps {
  locale: string
  meta: {
    data_en: Data
    data_fr: Data
  }
}

const Index = (props: IndexProps) => {
  return (
    <div
      role="main"
      className="mx-auto h-screen bg-splash-page bg-cover bg-center p-12 px-6"
    >
      <MetaData language="en" data={props.meta}></MetaData>
      <div className="m-auto flex flex-col items-center justify-center">
        <div className="z-10 h-auto w-[18.75rem] bg-white xl:w-[31.25rem]">
          <h1 className="sr-only">service.canada.ca-digital-center</h1>

          <div className="mx-auto h-auto w-64 pt-6 xl:mx-0 xl:w-2/3 xl:px-6">
            <Image
              src="/sig-blk-en.svg"
              alt="Government of Canada / Gouvernement du Canada logo"
              width={10}
              height={1}
              layout="responsive"
              objectFit="scale-down"
            ></Image>
          </div>
          <div className="container mx-auto flex w-max py-11 font-display">
            <div className="grid grid-cols-2 gap-2 xl:gap-6">
              <Link
                href="/en/my-dashboard"
                className="grid place-items-center whitespace-pre rounded border border-deep-blue-medium bg-deep-blue-medium px-10 py-2 text-center font-display text-white hover:bg-bright-blue-dark focus:ring-1 focus:ring-black focus:ring-offset-2 active:bg-deep-blue-active"
                role="button"
                draggable="false"
                lang="en"
                id="english-button"
              >
                English
              </Link>

              <Link
                href="/fr/mon-tableau-de-bord"
                className="grid place-items-center whitespace-pre rounded border border-deep-blue-medium bg-deep-blue-medium px-10 py-2 text-center font-display text-white hover:bg-bright-blue-dark focus:ring-1 focus:ring-black focus:ring-offset-2 active:bg-deep-blue-active"
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

        <div className="text-p relative flex h-auto w-[18.75rem] min-w-[18.75rem] justify-between bg-gray-light p-6 py-8 xl:w-[31.25rem] xl:items-center">
          <div className="xl:text-p w-28 text-base text-bright-blue-dark xl:w-max">
            <Link
              href="https://www.canada.ca/en/transparency/terms.html"
              className="splash-a mr-0 inline-block w-28 text-lg hover:underline xl:w-max"
              lang="en"
              data-cy="terms"
            >
              Terms &amp; conditions
            </Link>
            <span> • </span>
            <Link
              href="https://www.canada.ca/fr/transparence/avis.html"
              className="inline-block text-lg hover:underline"
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

Index.getLayout = function PageLayout(page: JSX.Element) {
  return <>{page}</>
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  locale,
}) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: `/${locale}/my-dashboard`,
        permanent: false,
      },
    }
  }

  /* Place-holder Meta Data Props */
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

  return {
    props: {
      locale,
      meta,
    },
  }
}
export default Index
