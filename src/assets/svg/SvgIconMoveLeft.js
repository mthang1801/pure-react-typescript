import * as React from "react"

const SvgComponent = (props) => (
  <svg
    width={9}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M.43 7.5c0-.257.098-.512.293-.708l6.14-6.14a1 1 0 1 1 1.414 1.415L2.844 7.499l5.433 5.433a1 1 0 0 1-1.414 1.414l-6.14-6.14A.997.997 0 0 1 .43 7.5Z"
      fill={props?.fill || "#fff"}
    />
  </svg>
)

export default SvgComponent
