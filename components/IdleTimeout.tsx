import { useCallback, useEffect, useId, useState } from 'react'
import { useRouter } from 'next/router'
import { IIdleTimerProps, useIdleTimer } from 'react-idle-timer'
import Modal from 'react-modal'
import { FocusOn } from 'react-focus-on'
import Button from './Button'
import en from '../locales/en'
import fr from '../locales/fr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../lib/loadIcons'

export interface IdleTimeoutProps
  extends Pick<IIdleTimerProps, 'promptBeforeIdle'>,
    Pick<IIdleTimerProps, 'timeout'> {
  locale: string
  refPageAA?: string
}

const IdleTimeout = ({
  promptBeforeIdle,
  timeout,
  locale,
  refPageAA = 'mscaPlaceholder',
}: IdleTimeoutProps) => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState({
    seconds: '0',
    minutes: 0,
  })
  const t = locale === 'en' ? en : fr
  const id = useId()

  const handleOnIdle = () => {
    router.push('/auth/logout')
  }

  const handleOnIdleContinueSession = () => {
    setModalOpen(false)
    reset()
  }

  const { reset, getRemainingTime } = useIdleTimer({
    onIdle: handleOnIdle,
    onPrompt: () => setModalOpen(true),
    promptBeforeIdle: promptBeforeIdle ?? 5 * 60 * 1000, //5 minutes
    timeout: timeout ?? 15 * 60 * 1000, //15 minutes
  })

  const tick = useCallback(() => {
    const minutes = Math.floor(getRemainingTime() / 60000)
    const seconds = Math.floor((getRemainingTime() / 1000) % 60).toFixed(0)
    setTimeRemaining({ seconds, minutes })
  }, [getRemainingTime])

  useEffect(() => {
    setInterval(tick, 1000)
  }, [tick])

  return (
    <Modal
      className="flex h-full justify-center bg-black/75"
      isOpen={modalOpen}
      onRequestClose={handleOnIdleContinueSession}
      contentLabel={t.bannerHeading}
      id={`${id}-timeout-modal`}
    >
      <FocusOn enabled={modalOpen}>
        <div
          className="m-8 h-fit rounded bg-white p-4 sm:mx-24 sm:mt-24 md:p-16"
          data-cy="timeOutModal"
          data-testid="modal"
          aria-describedby={`${id}-timeout-modal-header`}
        >
          <div className="flex justify-between pb-5">
            <div
              className="font-display text-3xl font-bold"
              role="heading"
              aria-level={1}
              id={`${id}-timeout-modal-header`}
            >
              {t.bannerHeading}
            </div>
            <button
              data-cy="x-button"
              type="button"
              aria-label={'Close Modal'}
              onClick={handleOnIdleContinueSession}
              data-gc-analytics-customclick={`${refPageAA}:Close-Fermer`}
            >
              <FontAwesomeIcon
                aria-hidden="true"
                icon={icon['xmark']}
                size="xl"
              />
            </button>
          </div>

          <div className="flex">
            <div className="items-top flex flex-none justify-center pr-3">
              <FontAwesomeIcon
                icon={icon['triangle-exclamation']}
                size="lg"
                color="orange"
              />
            </div>
            <div className="flex-auto" id={`${id}-timeout-modal-desc`}>
              <p className="mr-6">{t.bannerContent.notActive}</p>
              <p className="mr-6 font-bold">
                {t.bannerContent.signOut} {timeRemaining.minutes}
                {t.bannerMinutesAnd} {timeRemaining.seconds} {t.bannerSeconds}.
              </p>
            </div>
          </div>

          <div className="flex pt-10 md:space-x-12">
            <Button
              id="sign-out"
              text={t.signOutLinkText}
              onClick={handleOnIdle}
              style="secondary"
              className="mr-3"
              refPageAA={refPageAA}
            />
            <Button
              id="stay-signed-in"
              text={t.staySignedInLinkText}
              onClick={handleOnIdleContinueSession}
              style="primary"
              className="mr-3"
              refPageAA={refPageAA}
            />
          </div>
        </div>
        )
      </FocusOn>
    </Modal>
  )
}

export default IdleTimeout
