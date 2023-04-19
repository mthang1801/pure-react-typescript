import * as React from "react";

const SvgCheck = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={19}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill ? props.fill : "#000"}
      d="M24.42 1.086a1.983 1.983 0 0 0-2.805 0l-12.62 12.62-5.61-5.608a1.983 1.983 0 1 0-2.804 2.804l7.011 7.011c.387.388.895.582 1.402.582.508 0 1.016-.194 1.403-.582L24.419 3.891a1.983 1.983 0 0 0 0-2.805z"
    />
  </svg>
);

export default SvgCheck;
