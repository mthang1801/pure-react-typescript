import * as React from "react";

const SvgCloseIcon = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" {...props}>
		<g fill={props?.fill ? props?.fill : "#000"}>
			<path d="M2.37 24.843a2.368 2.368 0 0 1-1.681-.568 2.368 2.368 0 0 1 0-3.339L20.793.832a2.368 2.368 0 0 1 3.457 3.22L4.027 24.275a2.368 2.368 0 0 1-1.657.568z" />
			<path d="M22.45 24.843a2.368 2.368 0 0 1-1.657-.686L.69 4.052A2.368 2.368 0 0 1 4.027.713L24.25 20.818a2.368 2.368 0 0 1 0 3.457 2.368 2.368 0 0 1-1.8.568z" />
		</g>
	</svg>
);

export default SvgCloseIcon;
