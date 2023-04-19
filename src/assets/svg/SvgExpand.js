import * as React from "react";

const SvgExpand = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" {...props}>
		<path
			fill={props?.fill ? props.fill : "rgb(163,171,178)"}
			d="m14.108 18.042 6.582-9.615c.304-.444.465-.891.465-1.263 0-.72-.577-1.164-1.543-1.164H5.386c-.965 0-1.54.444-1.54 1.161 0 .373.16.813.465 1.258l6.583 9.62c.424.618.994.961 1.607.961.612 0 1.183-.338 1.607-.958z"
		/>
	</svg>
);

export default SvgExpand;
