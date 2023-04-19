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
    <circle cx={12.5} cy={7.5} r={1.5} fill="#ADB4BB" />
    <circle cx={12.5} cy={12.5} r={1.5} fill="#ADB4BB" />
    <circle cx={12.5} cy={17.5} r={1.5} fill="#ADB4BB" />
  </svg>
)

const SvgIcon3Dot = memo(SvgComponent)
export default SvgIcon3Dot
