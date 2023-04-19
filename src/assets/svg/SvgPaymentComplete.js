import * as React from "react";

const SvgPaymentComplete = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill="#38C173"
      d="M20 13.5a8.5 8.5 0 1 1-4.117-7.283l-1.018 1.692a6.526 6.526 0 1 0 3.16 5.591H20z"
    />
    <path
      fill="#38C173"
      d="M8.57 9.724a1.574 1.574 0 0 0-1.217 2.568l3.999 4.899a1.43 1.43 0 0 0 1.195.53 1.532 1.532 0 0 0 1.203-.713L22.056 3.63l.005-.007c.078-.12.052-.357-.108-.506a.441.441 0 0 0-.651.056l-8.378 9.465a.365.365 0 0 1-.516.028l-2.78-2.53a1.567 1.567 0 0 0-1.058-.412z"
    />
  </svg>
);

export default SvgPaymentComplete;
