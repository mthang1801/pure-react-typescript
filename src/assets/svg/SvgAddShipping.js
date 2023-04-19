import * as React from "react"

const SvgAddShipping = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#FFA000"
      d="M0 1.28C0 .573.573 0 1.28 0h13.44C15.427 0 16 .573 16 1.28v13.44A1.28 1.28 0 0 1 14.72 16H1.28A1.28 1.28 0 0 1 0 14.72V1.28z"
    />
    <path
      fill="#F8F8F8"
      d="M8.96 3.522a.96.96 0 0 0-1.92 0v3.52H3.52a.96.96 0 1 0 0 1.92h3.52v3.52a.96.96 0 1 0 1.92 0v-3.52h3.52a.96.96 0 1 0 0-1.92H8.96v-3.52z"
    />
  </svg>
)

export default SvgAddShipping
