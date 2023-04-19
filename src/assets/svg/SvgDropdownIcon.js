import * as React from "react";

const SvgDropdownIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.width}
      fill="none"
      {...props}
      viewBox={
        props.width &&
        `0 0 ${props.width / (props.width / 16)} ${
          props.width / (props.width / 16)
        }`
      }
    >
      <path
        fill={props?.fill ? props?.fill : "#ADB4BB"}
        d="m9.029 11.547 4.212-6.154c.195-.284.298-.57.298-.808 0-.46-.37-.745-.987-.745H3.447c-.618 0-.986.284-.986.743 0 .239.103.52.298.805l4.213 6.157c.271.396.636.615 1.028.615s.757-.217 1.029-.613z"
      />
    </svg>
  );
};

export default SvgDropdownIcon;
