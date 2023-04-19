import * as React from "react"
import { memo } from "react"

const SvgComponent = (props) => (
  <svg
    width={7}
    height={7}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M6.837 1.144a.555.555 0 0 0-.785 0L2.52 4.678.948 3.108a.555.555 0 1 0-.785.785l1.963 1.963a.554.554 0 0 0 .785 0l3.926-3.927a.555.555 0 0 0 0-.785Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h7v7H0z" />
      </clipPath>
    </defs>
  </svg>
)

const SvgChecked = memo(SvgComponent)
export default SvgChecked
