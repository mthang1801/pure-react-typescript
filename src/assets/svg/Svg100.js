import * as React from "react";

const Svg100 = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" {...props}>
		<path
			fill={props.fill ? props.fill : "#000"}
			d="M12.5 1.042A11.458 11.458 0 1 0 23.958 12.5 11.472 11.472 0 0 0 12.5 1.042zM3.125 12.5a9.32 9.32 0 0 1 2.057-5.845l13.163 13.163A9.364 9.364 0 0 1 3.125 12.5zm16.693 5.845L6.655 5.182a9.364 9.364 0 0 1 13.163 13.163z"
		/>
	</svg>
);

export default Svg100;
