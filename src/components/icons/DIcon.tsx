import { IconUI } from "./IconPattern";
import { typeIconUI } from "./typesIcon";

interface IIconCustom {
  icon: typeIconUI;
  fill?: string;
  className?: string;
  onClick?: () => void;
}

const DIcon = (props: IIconCustom) => {
  const { icon, fill, className, onClick } = props;

  const renderIcon = (icon: typeIconUI, fill?: string) => {
    const item = new (IconUI as any)({ icon, fill });
    return item.renderIcon();
  };

  return (
    <div onClick={onClick} className={`${className ? className : ""}`}>
      {renderIcon(icon, fill)}
    </div>
  );
};

export default DIcon;
