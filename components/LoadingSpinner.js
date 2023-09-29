// import "../styles/LoadingSpinner.css";
import PropTypes from 'prop-types'

const Spoke = () => {
  return (
    <svg
      width="6"
      height="16"
      viewBox="0 0 6 16"
      fill="none"
      className="animate-waving-hand bg-lime-600  h-5 w-5 mr-3 "
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

export default function LoadingSpinner(props) {
  return (
    <div className="flex align-middle flex-col justify-center bg-yellow-200 p-10">
      {/* <div className="bg-slate-200 flex transform origin-top translate-x-9 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] " > */}
      <div className="relative w-20 h-20 bg-slate-200  ">
        <svg
          width="6"
          height="16"
          viewBox="0 0 6 16"
          fill="none"
          className="animate-spoke  bg-red-500 h-5 w-20 mr-3 "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 13V2.5"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
        <Spoke />
      </div>
      <div className={`bg-pink-300 p-28`}>
        <span>{props.text}</span>
      </div>

      <div class="text-center"></div>

      <div className="bg-blue-100 flex flex-col justify-center text-center">
        <div className="relative w-24 h-24 bg-fuchsia-500 ">
          {/* start */}
          <div className="absolute top-2 left-1/2 animate-spoke rotate-0 translate-y-[4px] block delay-0 ">
            <svg
              width="6"
              height="16"
              viewBox="0 0 6 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13V2.5"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>

          {/* end */}
          <div className="absolute top-3 right-6 animate-spoke rotate-45 translate-y-[6px] block delay-75 ">
            <svg
              width="6"
              height="16"
              viewBox="0 0 6 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13V2.5"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>

          {/* end */}
          <div className="absolute top-2 right-6 animate-spoke translate-x-1/2 rotate-90 translate-y-6 delay-100 ">
            <svg
              width="6"
              height="16"
              viewBox="0 0 6 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13V2.5"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>

          <div className="absolute top-9 right-6 animate-spoke -translate-x-8 -rotate-45 -translate-y-6 delay-150">
            <svg
              width="6"
              height="16"
              viewBox="0 0 6 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13V2.5"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>

          <div className="absolute top-2 left-6 animate-spoke translate-x-1/2 rotate-90 translate-y-6 delay-200">
            <svg
              width="6"
              height="16"
              viewBox="0 0 6 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13V2.5"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>

          <div className="absolute bottom-6 left-1/2 animate-spoke rotate-0 translate-y-[8px] block delay-[2500ms]">
            <svg
              width="6"
              height="16"
              viewBox="0 0 6 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13V2.5"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>

          <div className="absolute bottom-6 right-8 animate-spoke -rotate-45 -translate-y-[8px] block delay-[3000ms]">
            <svg
              width="6"
              height="16"
              viewBox="0 0 6 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13V2.5"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>

          <div className="absolute bottom-6 left-8 animate-spoke rotate-45 -translate-y-[8px] block delay-[3500ms]">
            <svg
              width="6"
              height="16"
              viewBox="0 0 6 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13V2.5"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <div class="ds-loading-spinner__text">
          <span>
            Please wait while we gather your account information. Thank you.
          </span>
        </div>
      </div>
    </div>
  )
}

LoadingSpinner.propTypes = {
  /**
   * text
   */
  text: PropTypes.string,
}
