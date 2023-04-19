import * as React from "react"

const SvgProductCombo = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.242 4.996v5.997a1.24 1.24 0 0 1-1.238 1.239H9.413V8.787c0-1.213-.987-2.2-2.2-2.2H3.768V4.996a1.24 1.24 0 0 1 1.24-1.239h5.996a1.24 1.24 0 0 1 1.239 1.239Z"
      fill="#F2B7BC"
    />
    <path
      d="M16 1.239v5.997a1.24 1.24 0 0 1-1.239 1.238h-1.58V4.996a2.18 2.18 0 0 0-2.177-2.177H7.526V1.24A1.24 1.24 0 0 1 8.764 0h5.997A1.24 1.24 0 0 1 16 1.239Z"
      fill="#F2B7BC"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.261 7.525h5.952c.696 0 1.261.566 1.261 1.262v5.951c0 .696-.565 1.262-1.26 1.262H1.26A1.263 1.263 0 0 1 0 14.738V8.787c0-.696.566-1.262 1.261-1.262Z"
      fill="#BE1E2D"
    />
  </svg>
)

export default SvgProductCombo
