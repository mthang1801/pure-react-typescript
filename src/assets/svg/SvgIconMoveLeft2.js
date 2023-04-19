import * as React from "react"

const SvgComponent = (props) => (
  <svg
    width={20}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.319 6.837H3.679L6.423 9.58c.788.787-.393 1.969-1.181 1.181L2.743 8.26 1.076 6.59a.833.833 0 0 1 0-1.176l4.165-4.17a.833.833 0 0 1 .604-.252c.75 0 1.118.914.577 1.434L3.673 5.17h14.689c1.155.057 1.069 1.725-.043 1.668Z"
      fill={props?.fill || "#414141"}
    />
  </svg>
)

export default SvgComponent
