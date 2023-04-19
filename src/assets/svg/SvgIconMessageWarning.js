import * as React from "react"

const SvgIconMessageWarning = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="m19.807 17.988-3.324-2.58C21.03 9.545 16.665.738 9.223.801a9.092 9.092 0 1 0-.262 18.181c.168.012.337.012.506 0h9.988a.568.568 0 0 0 .352-.994ZM8.654 13.596a.568.568 0 1 1 1.136 0 .568.568 0 0 1-1.136 0ZM9.79 6.778v5.17a.568.568 0 1 1-1.136 0v-5.17A.568.568 0 1 1 9.79 6.75v.028Z"
        fill={props?.fill || "#414141"}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgIconMessageWarning
