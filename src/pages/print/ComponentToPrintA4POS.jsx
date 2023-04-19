import { forwardRef } from "react";
import "./stylesPrintA4POS.scss";
const ComponentToPrintA4POS = forwardRef((props, ref) => {
	return <div ref={ref}>{props.children}</div>;
});
export default ComponentToPrintA4POS;
