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
      d="M3.986.661a.667.667 0 0 0-.459.202L.861 3.53a.667.667 0 0 0 0 .94l2.666 2.668a.668.668 0 0 0 .946-.945L2.948 4.668h10.388V6.71a.667.667 0 1 0 1.328 0V4.668c0-.727-.601-1.335-1.328-1.335H2.94l1.532-1.53A.667.667 0 0 0 3.986.661Zm8.006 7.998a.667.667 0 0 0-.462 1.146l1.53 1.53H2.667V9.354a.666.666 0 1 0-1.334 0v1.983a1.34 1.34 0 0 0 1.334 1.328H13.06l-1.53 1.531a.667.667 0 1 0 .94.944l2.667-2.666a.669.669 0 0 0 0-.946L12.47 8.861a.666.666 0 0 0-.478-.202Z"
      fill="#000"
    />
  </svg>
)

const SvgChangeStatus = memo(SvgComponent)
export default SvgChangeStatus
