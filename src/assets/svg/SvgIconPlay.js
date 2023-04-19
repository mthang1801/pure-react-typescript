import * as React from "react"

const SvgIconPlay = (props) => (
  <svg
    width={11}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.155 8.85 2.08 14.38c-.373.255-.75.39-1.061.39-.604 0-.978-.485-.978-1.296V1.524C.04.714.413.23 1.016.23c.313 0 .682.135 1.056.391l8.08 5.53c.52.355.808.835.808 1.35 0 .514-.284.993-.805 1.349Z"
      fill={props.fill || "#fff"}
    />
  </svg>
)

export default SvgIconPlay
