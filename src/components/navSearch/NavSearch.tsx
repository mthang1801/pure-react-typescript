import React from "react";

const NavSearch = ({ open, children }: any) => {
	return <div className={open ? "navSearch active" : "navSearch"}>{children}</div>;
};

export default NavSearch;
