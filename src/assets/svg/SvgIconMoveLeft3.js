import * as React from "react"

const SvgIconMoveLeft3 = (props) => (
  <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path fill={props?.fill ?? "#BE1E2D"} d="M6 6h14v14H6z" />
      <path
        d="M12.5 25C19.393 25 25 19.393 25 12.5S19.393 0 12.5 0 0 5.607 0 12.5 5.607 25 12.5 25ZM8.639 11.764l5.208-5.209a1.039 1.039 0 0 1 1.473 0 1.04 1.04 0 0 1 0 1.473L10.848 12.5l4.472 4.472a1.04 1.04 0 1 1-1.473 1.473l-5.208-5.209a1.04 1.04 0 0 1 0-1.473Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h25v25H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgIconMoveLeft3
