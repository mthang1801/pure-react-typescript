import * as React from "react"
import { memo } from "react"

const SvgComponent = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)" fill="#414141">
      <path d="M14.871 4.031H13.08V1.105a.484.484 0 0 0-.484-.484h-9.19a.484.484 0 0 0-.484.484v2.926H1.129A1.13 1.13 0 0 0 0 5.16v6.207a1.13 1.13 0 0 0 1.129 1.128H2.92v2.4c0 .267.217.484.484.484h9.19a.484.484 0 0 0 .484-.484v-2.4h1.792A1.13 1.13 0 0 0 16 11.367V5.16A1.13 1.13 0 0 0 14.87 4.03ZM3.888 1.59h8.223V4.03H3.888V1.59Zm8.223 12.822H3.888V9.612h8.223v4.8Zm2.921-3.044a.164.164 0 0 1-.16.16h-1.793V9.129a.484.484 0 0 0-.484-.483h-9.19a.484.484 0 0 0-.484.483v2.4H1.129a.163.163 0 0 1-.161-.162V5.16c0-.088.073-.161.16-.161H14.872c.088 0 .161.073.161.16v6.208Z" />
      <path d="M12.595 7.51a.688.688 0 1 0 0-1.376.688.688 0 0 0 0 1.376ZM10.2 10.567H5.8a.484.484 0 1 0 0 .967h4.4a.484.484 0 1 0 0-.967ZM10.2 12.489H5.8a.484.484 0 1 0 0 .967h4.4a.484.484 0 1 0 0-.967Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

const SvgIconPrinter = memo(SvgComponent)
export default SvgIconPrinter
