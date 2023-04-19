import * as React from "react"

const SvgIconMobile = (props) => (
  <svg
    width={9}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.235 0h-5.47A.946.946 0 0 0 .82.947v11.107c0 .522.423.946.946.946h5.47a.946.946 0 0 0 .946-.946V.947A.947.947 0 0 0 7.235 0ZM3.15.575h2.7c.069 0 .124.102.124.228s-.055.228-.123.228h-2.7c-.07 0-.124-.102-.124-.228s.055-.228.123-.228Zm1.35 11.49a.605.605 0 1 1 .002-1.21.605.605 0 0 1-.002 1.21Zm2.972-2.07H1.528V1.599h5.944v8.398Z"
      fill={props?.fill || "#808A94"}
    />
  </svg>
)

export default SvgIconMobile
