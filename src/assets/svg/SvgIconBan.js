import React from "react";

function SvgIconBan(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 23 23"
    >
      <path
        fill={props?.fill ? props.fill : "#000"}
        d="M11.5.042A11.458 11.458 0 1022.958 11.5 11.472 11.472 0 0011.5.042zM2.125 11.5a9.32 9.32 0 012.057-5.845l13.163 13.163A9.364 9.364 0 012.125 11.5zm16.693 5.845L5.655 4.182a9.364 9.364 0 0113.163 13.163z"
      ></path>
    </svg>
  );
}

export default SvgIconBan;
