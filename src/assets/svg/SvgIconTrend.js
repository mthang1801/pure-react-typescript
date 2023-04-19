import * as React from "react"

const SvgIconTrend = (props) => (
  <svg
    width={19}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.21 6.142a.595.595 0 0 1-.683-.223l-.78-1.106-4.712 6.634a.6.6 0 0 1-.837.142L7.04 8.636l-4.169 5.87a.602.602 0 0 1-.836.142l-1.223-.87a.603.603 0 0 1-.142-.836L6.055 5.36a.6.6 0 0 1 .837-.142l4.158 2.953 3.496-4.922-1.302-.372a.6.6 0 0 1-.013-1.15L17.679.345a.6.6 0 0 1 .778.552l.16 4.656a.596.596 0 0 1-.408.589Z"
      fill={props?.fill || "#414141"}
    />
  </svg>
)

export default SvgIconTrend
