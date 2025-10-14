import { useState } from 'react'
import { MessageEntity } from '../entities/entities/message.entity'
import MessageList from './MessageList'
import ReactPaginate from 'react-paginate'
import EN from '../locales/en'
import FR from '../locales/fr'
import React from 'react'

interface PaginatedMessagesProps {
  messageEntities: MessageEntity[]
  locale: string
  messagesPerPage: number
  pageRangeDisplayed: number
}

const PaginatedMessages = ({
  messageEntities,
  locale,
  messagesPerPage,
  pageRangeDisplayed,
}: PaginatedMessagesProps) => {
  const language = locale === 'en' ? EN : FR

  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + messagesPerPage
  const currentItems = messageEntities.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(messageEntities.length / messagesPerPage)

  const handlePageClick = (selectedItem: { selected: number }) => {
    const pageSelected = selectedItem.selected
    const newOffset = pageSelected * messagesPerPage
    setItemOffset(newOffset)
  }

  return (
    <>
      <MessageList messageEntities={currentItems} locale={locale} />
      {pageCount > 1 ? (
        <ReactPaginate
          breakLabel="..."
          nextLabel={language.inbox.paginationText.nextLink}
          previousLabel={language.inbox.paginationText.previousLink}
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageRangeDisplayed}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName="flex space-x-1"
          pageLinkClassName="px-3 rounded-md py-1 cursor-pointer transition-all duration-200
                    underline underline-offset-4 decoration-gray-dark
                    hover:bg-brighter-blue-light hover:text-blue-hover
                    focus:outline-none focus:no-underline focus:bg-blue-hover focus:text-white focus:border 
                    focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-hover"
          previousLinkClassName="px-3 underline underline-offset-4 decoration-gray-dark"
          nextLinkClassName="px-3 underline underline-offset-4 decoration-gray-dark"
          activeLinkClassName="bg-deep-blue-dark no-underline no-hover text-white"
          disabledLinkClassName="text-gray-dark cursor-not-allowed"
        />
      ) : null}
    </>
  )
}

export default PaginatedMessages
