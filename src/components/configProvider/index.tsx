import React from "react";
import { ConfigProvider } from "antd";
import "moment/locale/vi";
import locale from "antd/es/locale/vi_VN";

interface ConfigProps {
  children: JSX.Element[] | JSX.Element | string;
}

const Config: React.FC<ConfigProps> = ({ children }) => {
  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
};
export default Config;
