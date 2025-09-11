import { useState } from 'react'
import { MessageEntity } from '../entities/entities/message.entity'
import MessageList from './MessageList'
import ReactPaginate from 'react-paginate'
import EN from '../locales/en'
import FR from '../locales/fr'
import React from 'react'
import { useEffect } from 'react'

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
  const localizedStrings = locale === 'en' ? EN : FR

  //TODO do pagination from scratch according to one of these? https://design-system.alpha.canada.ca/en/components/pagination/ or https://wet-boew.github.io/wet-boew-styleguide/design/pagination-en.html
  useEffect(() => {
    const paginationListElement = document.querySelector(
      "ul[aria-label='Pagination']",
    )
    if (paginationListElement && paginationListElement.children.length <= 3) {
      paginationListElement.setAttribute('style', 'display: none')
    } else {
      const previousLabel =
        localizedStrings.inbox.paginationText.previousAriaLabel
      const nextLabel = localizedStrings.inbox.paginationText.nextAriaLabel
      const currentLabel =
        localizedStrings.inbox.paginationText.currentPageAriaLabel
      paginationListElement?.removeAttribute('role')
      const paginationListElements = document.querySelectorAll(
        "ul[aria-label='Pagination']>li",
      )
      paginationListElements.forEach((element) => {
        element.className += ' inline-block px-4 py-2'
      })
      const paginationSelectedElement = document.querySelector(
        "ul[aria-label='Pagination']>li.selected",
      )
      const paginationSelectedLinkElement = document.querySelector(
        "ul[aria-label='Pagination']>li.selected>a",
      )
      if (paginationSelectedElement !== null) {
        paginationSelectedElement.className +=
          ' bg-[rgba(34,51,70,1)] text-white'
        const selectedElementNewAriaLabel =
          localizedStrings.inbox.paginationText.page +
          Array.prototype.indexOf.call(
            paginationListElements,
            paginationSelectedElement,
          ) +
          currentLabel
        console.log('aria label', selectedElementNewAriaLabel)
        paginationSelectedLinkElement?.setAttribute(
          'aria-label',
          selectedElementNewAriaLabel,
        )
      }

      const previousLinkElement = document.querySelector(
        "ul[aria-label='Pagination']>li:first-child a",
      )
      const nextLinkElement = document.querySelector(
        "ul[aria-label='Pagination']>li:last-child a",
      )
      const extraLinkClasses =
        ' flex items-center rounded-sm py-1 text-deep-blue-dark underline hover:text-blue-hover focus:outline-1 focus:outline-blue-hover'
      previousLinkElement
        ? (previousLinkElement.className += extraLinkClasses)
        : ''
      nextLinkElement ? (nextLinkElement.className += extraLinkClasses) : ''

      previousLinkElement?.setAttribute('aria-label', previousLabel)
      nextLinkElement?.setAttribute('aria-label', nextLabel)
    }
  })

  const language = locale === 'en' ? EN : FR

  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + messagesPerPage
  const currentItems = messageEntities.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(messageEntities.length / messagesPerPage)

  const handlePageClick = (selectedItem: { selected: number }) => {
    const pageSelected = selectedItem.selected
    const newOffset = pageSelected * messagesPerPage
    console.log('new offset' + newOffset)
    setItemOffset(newOffset)
  }

  return (
    <>
      <MessageList messageEntities={currentItems} locale={locale} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={language.inbox.paginationText.nextLink}
        previousLabel={language.inbox.paginationText.previousLink}
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default PaginatedMessages
