import CONFIG_ICON from "./configIcon";
import { typeIconUI } from "./typesIcon";

const renderIcon = (icon: typeIconUI, fill?: string) => {
  return CONFIG_ICON(icon, fill)[icon];
};

export function IconUI(
  this: any,
  data: { icon: typeIconUI, fill?: string }
) {
  this.icon = data.icon;
  this.fill = data.fill;
  this.renderIcon = function () {
    let _icon: typeIconUI = this?.icon || 'default';
    let _fill: string | undefined = this?.fill || undefined;
    return renderIcon(_icon, _fill);
  }
}