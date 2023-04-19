import * as React from "react";

const SvgPrintFile1 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <rect width={25} height={25} fill="#001529" rx={12.5} />
    <path
      fill="#fff"
      d="M17.957 14.533a7.382 7.382 0 0 1-2.318-.37c-.363-.123-.81-.01-1.03.218l-1.462 1.104c-1.695-.905-2.74-1.95-3.632-3.632l1.07-1.423a1.05 1.05 0 0 0 .26-1.065 7.392 7.392 0 0 1-.371-2.322C10.474 6.468 10.006 6 9.43 6H7.043C6.468 6 6 6.468 6 7.043 6 13.636 11.364 19 17.957 19c.575 0 1.043-.468 1.043-1.043v-2.38c0-.576-.468-1.044-1.043-1.044z"
    />
  </svg>
);

export default SvgPrintFile1;
