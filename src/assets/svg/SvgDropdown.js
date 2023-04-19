import * as React from "react"
import { memo } from "react"

const SvgComponent = (props) => (
  <svg
    width={10}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.643 7.217 8.276 3.37c.122-.178.186-.357.186-.505 0-.288-.23-.466-.617-.466h-5.69c-.387 0-.617.178-.617.465 0 .149.064.325.186.503l2.633 3.848c.17.247.398.384.643.384s.473-.135.643-.383Z"
      fill="#2D9CDB"
    />
  </svg>
)

const SvgDropdown = memo(SvgComponent)
export default SvgDropdown
