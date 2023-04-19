import * as React from "react";

const SvgAddStickers = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={377}
    height={384}
    fill="none"
    {...props}
  >
    <rect
      width={376}
      height={383}
      x={0.5}
      y={0.5}
      fill="url(#a)"
      stroke="#DFE2E4"
      rx={4.5}
    />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use transform="translate(.005 -.02) scale(.00163)" />
      </pattern>
    </defs>
  </svg>
);

export default SvgAddStickers;
