import * as React from "react"

const SvgIconSitemaps = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M17.372 13.165v-3.44h-6.798v-2.89h4.389V1.368H5.036v5.467h4.388v2.89H2.627v3.44H0v5.467h7.34v-5.467H3.774v-2.292h12.449v2.292H12.66v5.467H20v-5.467h-2.628Z"
        // fill="#414141"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path 
        // fill="#fff" 
        d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgIconSitemaps
