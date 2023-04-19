import * as React from "react";

const Svg101 = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" {...props}>
		<path
			fill={props.fill ? props.fill : "#000"}
			d="M21.337 3.663c-4.884-4.884-12.79-4.884-17.674 0s-4.884 12.79 0 17.674 12.79 4.884 17.674 0 4.884-12.79 0-17.674zM12.5 22.944c-5.759 0-10.444-4.685-10.444-10.444C2.056 6.741 6.74 2.056 12.5 2.056c5.759 0 10.444 4.685 10.444 10.444 0 5.759-4.685 10.444-10.444 10.444z"
		/>
	</svg>
);

export default Svg101;
