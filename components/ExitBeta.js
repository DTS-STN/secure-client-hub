import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function ExitBeta(props) {
  return (
    <div className="m-24 w-full p-8 bg-white">
      <p className="text-3xl font-display font-bold">Exit Beta version</p>
      <FontAwesomeIcon onClick={props.closeModal} icon={solid('x')} />
      <p>
        This page is not yet available in the beta version. You will be
        transferred to the current My Service Canada Account to view this page.
      </p>
      <button onClick={props.closeModal}>Stay on bet version</button>
      <button>Continue to page</button>
    </div>
  )
}
