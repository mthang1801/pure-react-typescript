import * as React from "react";

const SvgImport = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <g fill={props.fill ? props.fill : "#000"}>
      <path d="m6.444 12.233 5.468 6.25a.784.784 0 0 0 .588.267.781.781 0 0 0 .587-.267l5.47-6.25a.78.78 0 0 0-.588-1.296h-3.125V.781A.782.782 0 0 0 14.062 0h-3.125a.782.782 0 0 0-.78.781v10.156H7.03a.78.78 0 0 0-.587 1.296z" />
      <path d="M21.094 17.188v4.687H3.906v-4.688H.781v6.25c0 .865.7 1.563 1.563 1.563h20.312c.864 0 1.563-.698 1.563-1.563v-6.25h-3.125z" />
    </g>
  </svg>
);

export default SvgImport;
