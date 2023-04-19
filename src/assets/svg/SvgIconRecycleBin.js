import * as React from "react"

const SvgIconRecycleBin = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.2 2.4H.8A.8.8 0 0 0 .8 4h1.6v9.6A2.4 2.4 0 0 0 4.8 16h6.4a2.401 2.401 0 0 0 2.4-2.4V4h1.6a.8.8 0 1 0 0-1.6Zm-8 8.8a.8.8 0 1 1-1.6 0v-4a.8.8 0 1 1 1.6 0v4Zm3.2 0a.8.8 0 1 1-1.6 0v-4a.8.8 0 0 1 1.6 0v4ZM6.4 1.6h3.2a.8.8 0 1 0 0-1.6H6.4a.8.8 0 1 0 0 1.6Z"
      fill={props?.fill || "#E96C77"}
    />
  </svg>
)

export default SvgIconRecycleBin
