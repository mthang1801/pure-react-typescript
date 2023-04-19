import * as React from "react";

const SvgDocument = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" {...props}>
		<path
			fill={props?.fill ? props.fill : "#000"}
			d="M21.653 6.247c-.38.012-1.211.003-3.32.003a2.5 2.5 0 0 1-2.5-2.5c0-2.108-.009-2.94.003-3.32a.417.417 0 0 0-.417-.43H4.583c-.92 0-1.667.747-1.667 1.667v21.666c0 .92.747 1.667 1.667 1.667h15.833c.92 0 1.667-.746 1.667-1.667V6.663a.417.417 0 0 0-.43-.416zM6.354 4.897h3.698a.417.417 0 0 1 0 .832H6.354a.417.417 0 0 1 0-.833zm0 2.603h5.781a.417.417 0 0 1 0 .834H6.354a.417.417 0 0 1 0-.834zm12.708 12.292c0 .23-.187.416-.417.416H6.354a.417.417 0 0 1-.417-.416V11.25c0-.23.187-.416.417-.416h12.291c.23 0 .417.186.417.416v8.542zm-4.687-3.248H7.187a.417.417 0 0 1-.416-.417v-1.212c0-.23.186-.417.416-.417h7.188c.23 0 .416.187.416.417v1.212c0 .23-.186.417-.416.417zm1.666-4.877h1.771c.23 0 .417.186.417.417v1.164c0 .23-.187.417-.417.417h-1.77a.417.417 0 0 1-.417-.417v-1.164c0-.23.186-.417.416-.417zm-9.27 1.581v-1.164c0-.23.186-.417.416-.417h7.188c.23 0 .416.186.416.417v1.164c0 .23-.186.417-.416.417H7.187a.417.417 0 0 1-.416-.417zm11.041 3.296h-1.77a.417.417 0 0 1-.417-.417v-1.212c0-.23.186-.417.416-.417h1.771c.23 0 .417.187.417.417v1.212c0 .23-.187.417-.417.417zm-3.437 2.831H7.187a.417.417 0 0 1-.416-.417v-1.164c0-.23.186-.417.416-.417h7.188c.23 0 .416.187.416.417v1.164c0 .23-.186.417-.416.417zm3.854-1.581v1.164c0 .23-.187.417-.417.417h-1.77a.417.417 0 0 1-.417-.417v-1.164c0-.23.186-.417.416-.417h1.771c.23 0 .417.187.417.417zm3.437-12.377h-3.333a1.669 1.669 0 0 1-1.667-1.667V.417c0-.37.448-.557.712-.295l4.583 4.584a.417.417 0 0 1-.295.711z"
		/>
	</svg>
);

export default SvgDocument;