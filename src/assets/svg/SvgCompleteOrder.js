import * as React from "react";

const SvgCompleteOrder = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={26} height={25} fill="none" {...props}>
		<path
			fill={props?.fill ?? "#fff"}
			d="M9.04 24.555a.551.551 0 0 1-.475-.273C6.503 20.77 1.009 13.294.953 13.22a.552.552 0 0 1 .057-.72l1.69-1.669a.552.552 0 0 1 .704-.06l5.523 3.856c3.672-4.717 7.084-7.972 9.327-9.89 2.514-2.151 4.112-3.117 4.18-3.157a.551.551 0 0 1 .283-.08h2.732a.552.552 0 0 1 .367.964c-4.05 3.608-8.262 9.34-11.081 13.513a143.99 143.99 0 0 0-5.214 8.3.552.552 0 0 1-.476.278h-.003z"
		/>
	</svg>
);

export default SvgCompleteOrder;
