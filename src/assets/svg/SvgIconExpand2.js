import * as React from "react"

const SvgIconExpand2 = (props) => (
  <svg
    width={16}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 11.1a.76.76 0 0 1-.539-.222L2.783 6.2a.762.762 0 1 1 1.078-1.078L8 9.262l4.14-4.14A.762.762 0 0 1 13.216 6.2l-4.678 4.678A.76.76 0 0 1 8 11.1Z"
      fill={props.fill || "#BE1E2D"}
    />
    <path
      d="M8 17.1a.76.76 0 0 1-.539-.222L2.783 12.2a.762.762 0 0 1 1.078-1.078L8 15.262l4.14-4.14a.762.762 0 1 1 1.077 1.078l-4.678 4.678A.76.76 0 0 1 8 17.1Z"
      fill={props.fill || "#BE1E2D"}
    />
  </svg>
)

export default SvgIconExpand2
