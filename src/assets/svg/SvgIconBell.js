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
        d="M16.683 20.746c0 2.181-1.866 3.95-4.167 3.95-2.301 0-4.166-1.769-4.166-3.95s1.865-3.95 4.166-3.95 4.167 1.769 4.167 3.95ZM12.516 4.95c-.575 0-1.041-.443-1.041-.988V1.987c0-.545.466-.987 1.041-.987s1.042.442 1.042.987v1.975c0 .545-.467.987-1.042.987Z"
        fill="#E87E04"
      />
      <path
        d="M22.286 17.697c-1.575-1.262-2.478-3.105-2.478-5.059V9.886c0-3.811-3.272-6.911-7.292-6.911s-7.291 3.1-7.291 6.91v2.753c0 1.954-.904 3.798-2.488 5.068a1.687 1.687 0 0 0-.637 1.312c0 .953.817 1.728 1.822 1.728H21.11c1.005 0 1.823-.775 1.823-1.728 0-.505-.232-.984-.647-1.32Z"
        fill="#FFA000"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(0 1)" d="M0 0h25v23.695H0z" />
      </clipPath>
    </defs>
  </svg>
)

const SvgIconBell = memo(SvgComponent)
export default SvgIconBell
