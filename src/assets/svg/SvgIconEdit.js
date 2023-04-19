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
    <g clipPath="url(#a)" fill="#414141">
      <path d="M13.143 8a.571.571 0 0 0-.572.572v5.714a.571.571 0 0 1-.571.571H1.714a.571.571 0 0 1-.571-.571V2.857c0-.315.256-.571.571-.571h6.857a.571.571 0 1 0 0-1.143H1.714C.768 1.143 0 1.911 0 2.857v11.429C0 15.233.768 16 1.714 16H12c.947 0 1.714-.768 1.714-1.714V8.572A.571.571 0 0 0 13.143 8Z" />
      <path d="M15.36.641a2.187 2.187 0 0 0-3.094 0L4.739 8.168a.578.578 0 0 0-.138.223l-1.143 3.428a.571.571 0 0 0 .723.723L7.609 11.4a.571.571 0 0 0 .223-.138l7.527-7.526a2.188 2.188 0 0 0 0-3.094Zm-.809 2.286-7.428 7.428-2.22.742.74-2.217 7.43-7.428a1.045 1.045 0 0 1 1.478 1.475Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

const SvgIconEdit = memo(SvgComponent)
export default SvgIconEdit
