import Markdown from 'markdown-to-jsx'
import {
  ContactProvinceRow,
  ContactProvinceRowProps,
} from './ContactProvinceRow'

export interface ContactProvinceProps {
  title: string
  intro: string
  id: string
  details: ContactProvinceRowProps[]
}

export const ContactProvince = ({
  title,
  intro,
  id,
  details,
}: ContactProvinceProps) => {
  return (
    <div className="max-w-4xl pb-2 md:pb-4" id={id}>
      <h2 className="py-4 font-display text-4xl font-bold text-gray-darker md:py-6">
        {title}
      </h2>
      <div className="pb-4 text-xl text-gray-darker [&_ul]:ml-4 [&_ul]:list-inside [&_ul]:list-disc">
        <Markdown>{intro}</Markdown>
      </div>
      {/* Ensure provinces are sorted alphabetically regardless of language */}
      {details
        .sort(function (a, b) {
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        })
        .map((item) => (
          <ContactProvinceRow
            key={item.id}
            id={item.id}
            items={item.items}
            title={item.title}
          />
        ))}
    </div>
  )
}
