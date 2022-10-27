import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@dts-stn/service-canada-design-system'

export default function ExitBeta(props) {
  return (
    <div className="m-8 sm:mx-24 sm:mt-24 p-16 bg-white rounded h-fit">
      <div className="flex justify-between">
        <p className="text-3xl font-display font-bold">Exit Beta version</p>
        <FontAwesomeIcon
          onClick={props.closeModal}
          icon={solid('xmark')}
          size="xl"
        />
      </div>
      <p className="text-xl font-display py-4">
        This page is not yet available in the beta version. You will be
        transferred to the current My Service Canada Account to view this page.
      </p>
      <div className="flex mt-8 space-x-12">
        <Button
          styling="secondary"
          onClick={props.closeModal}
          text="Stay on bet version"
        />
        <Button styling="primary" text="Continue to page" />
      </div>
    </div>
  )
}
