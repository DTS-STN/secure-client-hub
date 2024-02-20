import Markdown from 'markdown-to-jsx'
import Collapse from '../Collapse'

export interface ContactProvinceRowItem {
  content?: string
  recipient?: string
  program?: string
  poBox?: string
  station?: string
  city?: string
  province?: string
  postal?: string
  country?: string
}

export interface ContactProvinceRowProps {
  title: string
  items: ContactProvinceRowItem[]
  id: string
}

const ap = (addresscontent: string | undefined, append: string): string => {
  return addresscontent ? addresscontent + append : ''
}

export const ContactProvinceRow = ({
  title,
  items,
  id,
}: ContactProvinceRowProps) => {
  return (
    items.length > 0 && (
      <div className="py-2" key={id} data-cy="provinceCards">
        <Collapse title={title} id={id} dataTestId={`dataTest`}>
          <div
            className="grid text-xl grid-cols-2"
            data-cy="mailContactDetails"
          >
            {items.map((rowitem, i) => (
              <div
                className="col-span-2 md:col-span-1 py-3 select-text cursor-default"
                key={i}
              >
                <strong className="prose prose-strong:text-xl prose-strong:font-display prose-p:text-xl prose-p:font-display">
                  <Markdown>{`${ap(rowitem.content, ' ')}`}</Markdown>
                </strong>

                <Markdown>{`${ap(rowitem.recipient, '\n\n')}${ap(
                  rowitem.program,
                  '\n\n'
                )}${ap(rowitem.poBox, ' ')} ${ap(rowitem.station, ' ')} ${ap(
                  ' ',
                  '\n\n'
                )} ${ap(rowitem.city, ' ')} ${ap(rowitem.province, ' ')} ${ap(
                  rowitem.postal,
                  ' \n\n'
                )} ${ap(rowitem.country, ' ')}`}</Markdown>
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    )
  )
}
