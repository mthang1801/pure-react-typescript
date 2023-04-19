import * as React from "react";

const SvgBannerBin = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill={props?.fill ? props.fill : "#ADB4BB"}
      d="M15.2 2.4H.8A.8.8 0 0 0 .8 4h1.6v9.6A2.4 2.4 0 0 0 4.8 16h6.4a2.401 2.401 0 0 0 2.4-2.4V4h1.6a.8.8 0 1 0 0-1.6zm-8 8.8a.8.8 0 1 1-1.6 0v-4a.8.8 0 1 1 1.6 0v4zm3.2 0a.8.8 0 1 1-1.6 0v-4a.8.8 0 0 1 1.6 0v4zm-4-9.6h3.2a.8.8 0 1 0 0-1.6H6.4a.8.8 0 1 0 0 1.6z"
    />
  </svg>
);

export default SvgBannerBin;
