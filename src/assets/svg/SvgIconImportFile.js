import * as React from "react"

const SvgIconImportFile = (props) => (
  <svg
    width={21}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)" fill={props?.fill ? props.fill : "#414141"}>
      <path d="m5.412 10.276 4.594 5.25a.659.659 0 0 0 .494.224.659.659 0 0 0 .493-.224l4.594-5.25a.655.655 0 0 0-.493-1.088h-2.625V.655A.656.656 0 0 0 11.812 0H9.187a.656.656 0 0 0-.656.656v8.531H5.906a.655.655 0 0 0-.494 1.089Z" />
      <path d="M17.719 14.438v3.937H3.28v-3.938H.656v5.25c0 .726.588 1.313 1.313 1.313H19.03c.726 0 1.313-.587 1.313-1.313v-5.25h-2.625Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h21v21H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgIconImportFile
