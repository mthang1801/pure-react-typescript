import React from "react";
interface Action {
  text?: string;
  action?: any;
  svg?: any;
  scale?: any;
  plus?: any;
}

interface ActionsHeader {
  actions?: Action[];
  header?: any;
  padding?: any;
  border?: any;
  borderRadius?: any;
}

const ActionsHeader = ({
  border,
  padding,
  actions,
  header,
  borderRadius,
}: ActionsHeader) => {
  const styleProps = {
    padding: padding,
    border: border,
    borderRadius: borderRadius,
  };
  return (
    <div className="actionsHeader">
      <h4>{header || " "}</h4>
      <div className="actionsHeader__actions">
        {actions &&
          actions.length > 0 &&
          actions.map((action, index) => (
            <div
              style={styleProps}
              onClick={action.action}
              key={index}
              className={`actionsHeader__actions__action ${
                action.scale ? "scaleSvg" : ""
              } ${action.plus ? "plusSvg" : ""}`}
            >
              {action.svg} {action.text}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ActionsHeader;
