import * as React from "react"

const SvgArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={9}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M1.43 5.21h12.442l-2.331 2.331c-.67.67.335 1.674 1.004 1.005l2.123-2.127L16.086 5a.709.709 0 0 0 0-.999L12.546.457a.708.708 0 0 0-.514-.215.708.708 0 0 0-.491 1.22l2.337 2.33H1.392C.41 3.841.484 5.26 1.43 5.21z"
    />
  </svg>
)

export default SvgArrow
