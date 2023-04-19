import * as React from "react";

const SvgExport = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <g fill={props.fill ? props.fill : "#000"}>
      <path d="M18.556 6.517 13.088.267A.784.784 0 0 0 12.5 0a.784.784 0 0 0-.587.267l-5.47 6.25a.78.78 0 0 0 .588 1.295h3.125V17.97c0 .431.35.781.782.781h3.125c.43 0 .78-.35.78-.781V7.812h3.126a.78.78 0 0 0 .587-1.295z" />
      <path d="M21.094 17.188v4.687H3.906v-4.688H.781v6.25c0 .865.7 1.563 1.563 1.563h20.312c.864 0 1.563-.698 1.563-1.563v-6.25h-3.125z" />
    </g>
  </svg>
);

export default SvgExport;
