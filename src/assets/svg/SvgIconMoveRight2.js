import * as React from "react"

const SvgIconMoveRight = (props) => (
  <svg
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.43 9.21h12.442l-2.331 2.331c-.67.67.335 1.674 1.004 1.005l2.123-2.127L16.086 9a.708.708 0 0 0 0-.999l-3.54-3.544a.708.708 0 0 0-.514-.215.708.708 0 0 0-.491 1.22l2.337 2.33H1.393c-.982.049-.91 1.467.036 1.418Z"
      fill={props?.fill ?? "#414141"}
    />
  </svg>
)

export default SvgIconMoveRight
