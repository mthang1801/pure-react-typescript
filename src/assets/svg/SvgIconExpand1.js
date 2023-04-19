import * as React from "react"

const SvgIconExpand1 = (props) => (
  <svg
    width={22}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.1 8a.76.76 0 0 1-.222.539L6.2 13.217a.762.762 0 1 1-1.078-1.078L9.262 8l-4.14-4.14A.762.762 0 0 1 6.2 2.784l4.678 4.678a.76.76 0 0 1 .223.539Z"
      fill={props.fill || "#BE1E2D"}
    />
    <path
      d="M17.1 8a.76.76 0 0 1-.222.539L12.2 13.217a.762.762 0 0 1-1.078-1.078L15.262 8l-4.14-4.14A.762.762 0 1 1 12.2 2.784l4.678 4.678a.76.76 0 0 1 .223.539Z"
      fill={props.fill || "#BE1E2D"}
    />
  </svg>
)

export default SvgIconExpand1

