import Markdown from 'markdown-to-jsx'
import ContactProvinceRow from './ContactProvinceRow'

const ContactProvince = ({ title, intro, id, i, details }) => {
  return (
    <div className="max-w-3xl" id={id}>
      <h2 className="py-4 md:py-9 md:mt-2 text-4xl font-display font-bold">
        {title}
      </h2>
      <div className="[&_ul]:list-inside [&_ul]:ml-4 [&_ul]:list-disc pb-4">
        <Markdown>{intro}</Markdown>
      </div>
      {details.map((item, i) => (
        <ContactProvinceRow {...item} key={i} />
      ))}
    </div>
  )
}

export default ContactProvince
