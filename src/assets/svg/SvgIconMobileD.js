import * as React from "react"
import { memo } from "react"

const SvgComponent = (props) => (
  <svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M19.89 0H8.11a2.038 2.038 0 0 0-2.038 2.04v23.922c0 1.125.91 2.038 2.038 2.038h11.78a2.038 2.038 0 0 0 2.038-2.038V2.04A2.04 2.04 0 0 0 19.891 0Zm-8.797 1.239h5.816c.147 0 .267.22.267.49 0 .272-.12.492-.267.492h-5.816c-.148 0-.265-.22-.265-.492 0-.27.117-.49.265-.49Zm2.908 24.748a1.3 1.3 0 1 1 0-2.602 1.3 1.3 0 0 1 0 2.602Zm6.4-4.458H7.6V3.442h12.802v18.087Z"
        // fill="#ADB4BB"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h28v28H0z" />
      </clipPath>
    </defs>
  </svg>
)

const SvgIconMobileD = memo(SvgComponent)
export default SvgIconMobileD
