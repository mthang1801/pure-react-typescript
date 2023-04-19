import * as React from "react"

const SvgIconDisplay = (props) => (
  <svg
    width={21}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.5 13.735a3.233 3.233 0 1 0 0-6.466 3.233 3.233 0 0 0 0 6.466Z"
      fill={props.fill || "#ADB4BB"}
    />
    <path
      d="M20.678 9.606C18.193 6.603 14.43 3.712 10.5 3.712c-3.932 0-7.694 2.893-10.178 5.894a1.406 1.406 0 0 0 0 1.791c.625.755 1.934 2.211 3.682 3.484 4.403 3.205 8.58 3.212 12.992 0 1.749-1.273 3.058-2.73 3.682-3.484.428-.518.43-1.27 0-1.79ZM10.5 5.976a4.531 4.531 0 0 1 4.526 4.526 4.531 4.531 0 0 1-4.526 4.526 4.531 4.531 0 0 1-4.526-4.526A4.531 4.531 0 0 1 10.5 5.975Z"
      fill={props.fill || "#ADB4BB"}
    />
  </svg>
)

export default SvgIconDisplay