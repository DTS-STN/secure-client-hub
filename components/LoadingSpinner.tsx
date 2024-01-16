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
      className="loading-spinners flex flex-col md:flex-row align-middle"
      data-testid="loading-spinner"
    >
      <div className="relative loading-spinners justify-center mr-0 p-9 ">
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
      </div>
      <div className={'text-center text-xl font-display md:pl-2'}>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default LoadingSpinner
