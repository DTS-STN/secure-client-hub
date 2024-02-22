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

const ap = (addressContent: string | undefined, append: string): string => {
  return addressContent ? addressContent + append : ''
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
            {items.map((rowItem, i) => (
              <div
                className="col-span-2 md:col-span-1 py-3 select-text cursor-default"
                key={i}
              >
                <strong className="prose prose-strong:text-xl prose-strong:font-display prose-p:text-xl prose-p:font-display">
                  <Markdown>{`${ap(rowItem.content, ' ')}`}</Markdown>
                </strong>

                <Markdown>{`${ap(rowItem.recipient, '\n\n')}${ap(
                  rowItem.program,
                  '\n\n'
                )}${ap(rowItem.poBox, ' ')} ${ap(rowItem.station, ' ')} ${ap(
                  ' ',
                  '\n\n'
                )} ${ap(rowItem.city, ' ')} ${ap(rowItem.province, ' ')} ${ap(
                  rowItem.postal,
                  ' \n\n'
                )} ${ap(rowItem.country, ' ')}`}</Markdown>
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    )
  )
}
