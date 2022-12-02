import Markdown from 'markdown-to-jsx'
import { Collapse } from '@dts-stn/service-canada-design-system'

const ContactProvince = ({
  province,
  contentDocuments,
  contentEi,
  id,
  locale,
}) => {
  const header = {
    en: {
      ei: 'For Employment Insurance',
      documents: 'For Supporting Documents',
    },
    fr: {
      ei: "Pour l'Assurance Emploi",
      documents: 'Pour les Documents Justificatifs',
    },
  }

  const headers = locale === 'en' ? header.en : header.fr
  return (
    <div className="py-2" key={id}>
      <Collapse title={province}>
        <div className="grid text-base font-sans grid-cols-2">
          <div className="col-span-1">
            <p>
              <b>{headers.ei}</b>
            </p>
            <Markdown>{contentEi}</Markdown>
          </div>
          <div className="col-span-1">
            <p>
              <b>{headers.documents}</b>
            </p>
            <Markdown>{contentDocuments}</Markdown>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default ContactProvince
