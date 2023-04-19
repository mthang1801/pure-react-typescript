import * as React from "react"

const SvgIconGroupBy = (props) => (
  <svg
    width={21}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.477.506v13.578l1.127-1.125 1.232 1.232-3.23 3.23-3.23-3.23 1.232-1.232 1.127 1.125V.506h1.742Zm7.842 13.07v1.742H7.962v-1.743h4.357Zm2.613-4.357v1.743h-6.97V9.219h6.97Zm2.614-4.356v1.742H7.962V4.863h9.584ZM20.16.506V2.25H7.962V.506H20.16Z"
      fill={props?.fill || "#414141"}
    />
  </svg>
)

export default SvgIconGroupBy
