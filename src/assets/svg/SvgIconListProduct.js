
import * as React from "react"

const SvgIconListProduct = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M15.86 20H4.14a1.76 1.76 0 0 1-1.757-1.758V5.86h4.101a1.76 1.76 0 0 0 1.758-1.757V0h7.617c.97 0 1.758.789 1.758 1.758v16.484A1.76 1.76 0 0 1 15.86 20ZM13.515 8.242H6.484a.586.586 0 1 0 0 1.172h7.032a.586.586 0 1 0 0-1.172Zm0 2.344H6.484a.586.586 0 1 0 0 1.172h7.032a.586.586 0 1 0 0-1.172Zm0 2.344H6.484a.586.586 0 1 0 0 1.172h7.032a.586.586 0 1 0 0-1.172Zm0 2.343H8.828a.586.586 0 1 0 0 1.172h4.688a.586.586 0 1 0 0-1.172Z"
        // fill="#414141"
      />
      <path
        d="M6.484 4.688H2.726L7.07.343v3.759a.586.586 0 0 1-.586.585Z"
        // fill="#000"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path 
        // fill="#fff"
         transform="matrix(-1 0 0 1 20 0)" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgIconListProduct
