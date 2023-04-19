import * as React from "react";

const SvgPrint = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M16.111 19.523H8.89a.833.833 0 0 0 0 1.667h7.222a.833.833 0 0 0 0-1.667zm0-2.628H8.89a.833.833 0 0 0 0 1.666h7.222a.833.833 0 0 0 0-1.666z"
    />
    <path
      fill="#000"
      d="M23.056 6.538h-2.652V1.715a.833.833 0 0 0-.833-.833H5.429a.833.833 0 0 0-.833.833v4.823H1.944A1.947 1.947 0 0 0 0 8.483v8.384c0 1.072.872 1.944 1.944 1.944h2.652v4.474c0 .46.373.833.833.833h14.142c.46 0 .833-.373.833-.833V18.81h2.652A1.947 1.947 0 0 0 25 16.867V8.483a1.947 1.947 0 0 0-1.944-1.945zM6.263 2.548h12.474v3.99H6.263v-3.99zm12.474 19.903H6.263v-6.818h12.474v6.818zm.834-11.02h-2.122a.833.833 0 0 1 0-1.666h2.122a.833.833 0 1 1 0 1.667z"
    />
  </svg>
);

export default SvgPrint;
