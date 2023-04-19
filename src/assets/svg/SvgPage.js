import * as React from "react"
import { memo } from "react"

const SvgComponent = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.5 8H11V2.5A1.5 1.5 0 0 0 9.5 1h-7A1.5 1.5 0 0 0 1 2.5v10A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5v-3A1.5 1.5 0 0 0 13.5 8ZM2 12.5v-10a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v10a2.46 2.46 0 0 0 .5 1.5h-7A1.5 1.5 0 0 1 2 12.5Zm12 0a1.5 1.5 0 1 1-3 0V9h2.5a.5.5 0 0 1 .5.5v3Z"
      fill="#414141"
    />
    <path
      d="M3.5 4h2a.5.5 0 1 0 0-1h-2a.5.5 0 1 0 0 1ZM8.5 6.5h-5a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1ZM8.5 8.5h-5a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1Z"
      fill="#414141"
    />
    <path d="M8.5 10.5H6a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 0-1Z" fill="#000" />
  </svg>
)

const SvgPage = memo(SvgComponent)
export default SvgPage
