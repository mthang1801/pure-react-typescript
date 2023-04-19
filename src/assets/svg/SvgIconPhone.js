import * as React from "react"

const SvgIconPhone = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M14.207 0H5.793c-.806 0-1.456.653-1.456 1.457v17.088c0 .803.65 1.455 1.456 1.455h8.414c.804 0 1.456-.652 1.456-1.455V1.457C15.663.653 15.01 0 14.207 0ZM7.924.885h4.154c.105 0 .19.156.19.35 0 .194-.085.352-.19.352H7.924c-.106 0-.19-.158-.19-.352 0-.194.084-.35.19-.35ZM10 18.562a.93.93 0 0 1 0-1.858.929.929 0 0 1 0 1.858Zm4.572-3.184H5.428V2.458h9.145v12.92Z"
        // fill="#414141"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
        //  fill="#fff"
         d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgIconPhone
