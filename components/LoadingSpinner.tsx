interface LoadingSpinnerProps {
  text: string
}

const Spoke = () => {
  return (
    <svg
      width="6"
      height="16"
      viewBox="0 0 6 16"
      fill="none"
      className="spoke"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 13V2.5"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
const LoadingSpinner = ({ text }: LoadingSpinnerProps) => {
  return (
    <div
      className="loading-spinners flex flex-col align-middle md:flex-row"
      data-testid="loading-spinner"
    >
      <div className="loading-spinners relative mr-0 justify-center p-9 ">
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
      </div>
      <div className={'text-center font-display text-xl md:pl-2'}>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default LoadingSpinner
