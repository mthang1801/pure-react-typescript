import * as React from "react";

const SvgTransport = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill ? props.fill : "#000"}
      d="m24.785 11.863-4.822-5.627a2.68 2.68 0 0 0-2.033-.935h-1.859c-.986 0-1.785.8-1.785 1.786v8.036c0 .493-.4.893-.893.893H0v2.678c0 .987.8 1.786 1.786 1.786h.893a3.575 3.575 0 0 0 3.571 3.57 3.575 3.575 0 0 0 3.571-3.571h4.465a3.575 3.575 0 0 0 3.571 3.571 3.575 3.575 0 0 0 3.572-3.571h1.785c.987 0 1.786-.8 1.786-1.786v-6.249a.898.898 0 0 0-.215-.582zM6.25 22.266a1.788 1.788 0 0 1-1.786-1.786c0-.901.768-1.786 1.786-1.786 1.013 0 1.786.882 1.786 1.786 0 .985-.801 1.786-1.786 1.786zm11.607 0a1.788 1.788 0 0 1-1.786-1.786c0-.901.768-1.786 1.786-1.786 1.014 0 1.786.882 1.786 1.786 0 .985-.801 1.786-1.786 1.786zm4.08-9.822h-4.973V7.98h1.572c.135 0 .263.062.348.168l3.197 3.996c.097.12.011.3-.144.3z"
    />
    <path
      fill={props.fill ? props.fill : "#000"}
      d="M12.5 2.623v10.714c0 .493-.4.893-.893.893H.893A.893.893 0 0 1 0 13.337V2.623c0-.493.4-.893.893-.893H3.57v5.803c0 .378.442.585.733.342l1.946-1.68 1.946 1.68a.446.446 0 0 0 .733-.342V1.73h2.678c.493 0 .893.4.893.893z"
    />
  </svg>
);

export default SvgTransport;
