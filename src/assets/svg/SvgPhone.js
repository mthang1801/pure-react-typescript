import * as React from "react"
import { memo } from "react"

const SvgComponent = (props) => (
  <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M17.76 0H7.24a1.82 1.82 0 0 0-1.819 1.821v21.36c0 1.004.813 1.819 1.82 1.819h10.518a1.82 1.82 0 0 0 1.82-1.82V1.822A1.82 1.82 0 0 0 17.758 0ZM9.903 1.106h5.193c.131 0 .238.196.238.438s-.107.44-.238.44H9.904c-.132 0-.236-.198-.236-.44s.104-.438.236-.438Zm2.597 22.097a1.162 1.162 0 1 1 0-2.323 1.162 1.162 0 0 1 0 2.323Zm5.715-3.98H6.786V3.072h11.43v16.15Z"
        fill="#2D9CDB"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h25v25H0z" />
      </clipPath>
    </defs>
  </svg>
)

const SvgPhone = memo(SvgComponent)
export default SvgPhone
