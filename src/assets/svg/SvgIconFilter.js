import * as React from "react"

const SvgIconFilter = (props) => (
  <svg
    width={16}
    height={16}
    fill="red"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.267 1.044a.667.667 0 0 0-.6-.377H1.333a.667.667 0 0 0-.52 1.083L6 8.234v6.433a.666.666 0 0 0 1.138.471l2.667-2.667a.667.667 0 0 0 .195-.47V8.233l5.187-6.484a.667.667 0 0 0 .08-.706Z"
      fill={props?.fill || "#ADB4BB"}
    />
  </svg>
)

export default SvgIconFilter
