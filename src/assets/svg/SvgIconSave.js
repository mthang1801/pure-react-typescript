import * as React from "react"
import { memo } from "react"

const SvgComponent = (props) => (
  <svg
    width={21}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.153 4.784 16.216.847a.656.656 0 0 0-.466-.19h-1.313v5.25a1.313 1.313 0 0 1-1.312 1.312h-5.25a1.313 1.313 0 0 1-1.313-1.313V.656H2.626A1.969 1.969 0 0 0 .656 2.625v15.75a1.969 1.969 0 0 0 1.969 1.969h1.313v-5.907a1.969 1.969 0 0 1 1.968-1.968h9.188a1.969 1.969 0 0 1 1.969 1.969v5.906h1.312a1.969 1.969 0 0 0 1.969-1.969V5.25a.657.657 0 0 0-.19-.466Z"
      fill="#fff"
    />
    <path
      d="M7.875.656h5.25v5.25h-5.25V.656ZM15.094 13.781H5.906a.656.656 0 0 0-.656.656v5.907h10.5v-5.907a.656.656 0 0 0-.656-.656Z"
      fill="#fff"
    />
  </svg>
)

const SvgIconSave = memo(SvgComponent)
export default SvgIconSave
