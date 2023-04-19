import * as React from "react"
import { memo } from "react"

const SvgComponent = (props) => (
  <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 2a2 2 0 0 1 2-2h21a2 2 0 0 1 2 2v21a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Z"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23 1H2a1 1 0 0 0-1 1v21a1 1 0 0 0 1 1h21a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1ZM2 0a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h21a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z"
      fill="#BFC4C9"
    />
    <path
      d="M12.5 15.12a2.62 2.62 0 1 0 0-5.24 2.62 2.62 0 0 0 0 5.24Z"
      fill="#ADB4BB"
    />
    <path
      d="M20.747 11.776C18.734 9.342 15.685 7 12.5 7c-3.186 0-6.235 2.344-8.247 4.776a1.139 1.139 0 0 0 0 1.451c.506.611 1.566 1.792 2.983 2.823 3.568 2.597 6.952 2.603 10.528 0a17.052 17.052 0 0 0 2.983-2.823 1.14 1.14 0 0 0 0-1.451ZM12.5 8.834a3.672 3.672 0 0 1 3.668 3.667A3.672 3.672 0 0 1 12.5 16.17a3.672 3.672 0 0 1-3.668-3.668A3.672 3.672 0 0 1 12.5 8.834Z"
      fill="#ADB4BB"
    />
  </svg>
)

const SvgIconView = memo(SvgComponent)
export default SvgIconView
