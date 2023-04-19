import * as React from "react";

const SvgFilter = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill ? props.fill : "#000"}
      d="M22.854.631a1.042 1.042 0 0 0-.937-.59H1.084A1.042 1.042 0 0 0 .27 1.735l8.105 10.132v10.05a1.041 1.041 0 0 0 1.778.737l4.167-4.166c.195-.196.305-.46.305-.737v-5.884L22.73 1.734a1.041 1.041 0 0 0 .124-1.103z"
    />
  </svg>
);

export default SvgFilter;
