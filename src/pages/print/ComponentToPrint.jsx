import { forwardRef } from "react";
import "./stylesPrint.scss";
const ComponentToPrint = forwardRef((props, ref) => {
  return <div ref={ref}>{props.children}</div>;
});
export default ComponentToPrint;
