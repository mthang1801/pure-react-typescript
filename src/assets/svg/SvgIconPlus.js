import * as React from "react"

const SvgIconPlus = (props) => (
  <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 5.5a1.5 1.5 0 0 0-3 0V11H5.5a1.5 1.5 0 0 0 0 3H11v5.5a1.5 1.5 0 0 0 3 0V14h5.5a1.5 1.5 0 0 0 0-3H14V5.5Z"
      fill={props.fill || "#fff"}
    />
  </svg>
)

export default SvgIconPlus
