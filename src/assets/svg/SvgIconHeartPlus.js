import * as React from "react"

const SvgIconHeartPlus = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m7.008 16.876 1.116.982.008.007 1.274 1.1a.908.908 0 0 0 1.189 0l1.274-1.1a.557.557 0 0 0 .008-.007c2.522-2.23 4.413-3.938 5.78-5.603C19.257 10.31 20 8.55 20 6.72 20 3.407 17.405.812 14.093.812c-1.489 0-2.96.561-4.093 1.533A6.346 6.346 0 0 0 5.907.812C2.595.812 0 3.407 0 6.72c0 4.004 2.788 6.452 7.008 10.156Zm-.645-8.695h2.425V5.756h2.424v2.425h2.425v2.425h-2.425v2.425H8.788v-2.425H6.363V8.181Z"
      fill={props?.fill || "#414141"}
    />
  </svg>
)

export default SvgIconHeartPlus
