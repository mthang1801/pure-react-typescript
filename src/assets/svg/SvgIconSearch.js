import * as React from "react"

const SvgIconSearch = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m15.489 14.573-3.808-3.96a6.44 6.44 0 0 0 1.515-4.153A6.467 6.467 0 0 0 6.736 0a6.467 6.467 0 0 0-6.46 6.46 6.467 6.467 0 0 0 6.46 6.46 6.39 6.39 0 0 0 3.701-1.169l3.837 3.99c.16.167.376.259.608.259a.844.844 0 0 0 .607-1.427ZM6.736 1.685a4.78 4.78 0 0 1 4.775 4.775 4.78 4.78 0 0 1-4.775 4.775A4.78 4.78 0 0 1 1.962 6.46a4.78 4.78 0 0 1 4.774-4.775Z"
      fill={props?.fill || "#ADB4BB"}
    />
  </svg>
)

export default SvgIconSearch
