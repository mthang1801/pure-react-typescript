import * as React from "react";

const SvgCopy = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M9.115 20.313a4.433 4.433 0 0 1-4.428-4.428V5.208H2.865A2.867 2.867 0 0 0 0 8.073v14.062A2.867 2.867 0 0 0 2.865 25h13.02a2.867 2.867 0 0 0 2.865-2.865v-1.823H9.115z"
    />
    <path
      fill="#000"
      d="M22.917 2.865A2.864 2.864 0 0 0 20.052 0H9.115A2.864 2.864 0 0 0 6.25 2.865v13.02a2.864 2.864 0 0 0 2.865 2.865h10.937a2.864 2.864 0 0 0 2.865-2.865V2.865z"
    />
  </svg>
);

export default SvgCopy;
