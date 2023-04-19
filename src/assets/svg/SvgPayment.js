import * as React from "react";

const SvgPayment = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M21 12.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0zm-14.96 0a6.46 6.46 0 1 0 12.92 0 6.46 6.46 0 0 0-12.92 0z"
    />
  </svg>
);

export default SvgPayment;
