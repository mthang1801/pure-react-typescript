import * as React from "react"

const SvgIconMessage = (props) => (
  <svg
    width={19}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.25.792h-9.5A3.963 3.963 0 0 0 .792 4.75v6.333a3.965 3.965 0 0 0 3.166 3.88v2.454a.792.792 0 0 0 1.231.658l4.548-3.033h4.513a3.963 3.963 0 0 0 3.958-3.959V4.75A3.963 3.963 0 0 0 14.25.792Zm-1.583 9.5H6.333a.792.792 0 1 1 0-1.584h6.334a.792.792 0 0 1 0 1.584Zm1.583-3.167h-9.5a.792.792 0 0 1 0-1.583h9.5a.792.792 0 0 1 0 1.583Z"
      fill={props?.fill || "#000"}
    />
  </svg>
)

export default SvgIconMessage
