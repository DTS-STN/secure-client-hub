import Markdown from 'markdown-to-jsx'
import ContactProvinceRow from './ContactProvinceRow'

interface Item {
  content: string
  recipient: string
  program: string
  poBox: string
  station: string
  city: string
  province: string
  postal: string
  country: string
}

interface ContactProvinceProps {
  title: string
  intro: string
  id: string
  i: number
  details: { label: string; id: string; items: Item[] }[]
}

const ContactProvince = ({
  title,
  intro,
  id,
  details,
}: ContactProvinceProps) => {
  return (
    <div className="max-w-4xl pb-2 md:pb-4" id={id}>
      <h2 className="py-4 md:py-6 text-4xl text-gray-darker font-display font-bold">
        {title}
      </h2>
      <div className="[&_ul]:list-inside [&_ul]:ml-4 [&_ul]:list-disc pb-4 text-xl text-gray-darker">
        <Markdown>{intro}</Markdown>
      </div>
      {/* Ensure provinces are sorted alphabetically regardless of language */}
      {details
        .sort(function (a, b) {
          return a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        })
        .map((item, i) => (
          <ContactProvinceRow {...item} key={i} />
        ))}
    </div>
  )
}

export default ContactProvince
