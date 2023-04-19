import * as React from "react"

const SvgIconStar = (props) => (
  <svg
    width={16}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.956 5.877 11.84 8.913l.736 4.288a.5.5 0 0 1-.726.527L8 11.704l-3.85 2.024a.5.5 0 0 1-.725-.527l.735-4.288-3.115-3.036a.5.5 0 0 1 .277-.853L5.626 4.4 7.551.5c.169-.342.729-.342.897 0l1.925 3.9 4.305.625a.501.501 0 0 1 .277.853Z"
      fill={props?.fill || "#F2994A"}
    />
  </svg>
)

export default SvgIconStar
