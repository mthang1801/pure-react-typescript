/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";
import { Row, Col, Empty, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import DIcon from "../icons/DIcon";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { change_alias } from "src/utils/helpers/functions/textUtils";
import SvgIconMoveRight from "src/assets/svg/SvgIconMoveRight";
import SvgIconCreateBill from "src/assets/svg/SvgIconCreateBill";
import SvgIconListProduct from "src/assets/svg/SvgIconListProduct";
import SvgIconCustomer from "src/assets/svg/SvgIconCustomer";
import SvgUserSetting from "src/assets/svg/SvgUseSetting";
import SvgGroupUser from "src/assets/svg/SvgGroupUser";
import SvgSetting from "src/assets/svg/SvgSetting";
import { useForm } from "antd/lib/form/Form";
import { API_URL_CDN } from "src/services/api/config";

function Sidenav(props: { color: any }) {
	const [inputSearch, setInputSearch] = useState<string>("");

	const isMount = useIsMount();
	const [formSearch] = useForm();
	const [haveMenu, setHaveMenu] = useState(false);
	const { pathname } = useLocation();
	// const page = pathname.replace("/", "");
	const page = pathname.split("/");
	const [dataMenu, setDataMenu] = useState<any[]>([]);

	/****************************START**************************/
	/*                         Life Cycle                      */
	// useEffect(() => {
	//   setDataMenu(listMenu)
	// },[typeRole])
	useEffect(() => {
		let _dataUser = localStorage.getItem("ACCOUNT") ? JSON.parse(localStorage.getItem("ACCOUNT") || "") : "";

		if (_dataUser?.menu) {
			console.log(_dataUser?.menu);
			let resultMenu = _dataUser?.menu?.map((e: any) => ({
				...e,
				showAll: false
			}));
			setDataMenu(resultMenu);
		}
	}, []);

	useEffect(() => {
		if (isMount) return;

		let _dataUser = JSON.parse(localStorage.getItem("ACCOUNT") || "");
		if (_dataUser?.menu) {
			let resultMenu = _dataUser?.menu?.map((e: any) => ({
				...e,
				showAll: false
			}));
			let arrMenu: any[] = [];
			resultMenu.forEach((e: any) => {
				if (change_alias(e.funct_name || "")?.search(change_alias(inputSearch)) !== -1) {
					arrMenu.push(e);
				} else {
					let childrenMenu = e?.children?.filter(
						(item: any) => change_alias(item?.funct_name || "")?.search(change_alias(inputSearch)) !== -1
					);
					if (childrenMenu?.length > 0) {
						let itemMenu = { ...e, children: [] };
						itemMenu.children = childrenMenu;
						arrMenu.push(itemMenu);
					}
				}
			});
			for (let i = 0; i < arrMenu.length; i++) {
				arrMenu[i].showAll = true;
			}
			setDataMenu(arrMenu);
		}
	}, [inputSearch]);
	/**************************** END **************************/

	/****************************START**************************/
	/*                          Function                       */
	useEffect(() => {
		if (dataMenu.length > 0) {
			setHaveMenu(true);
		}
	}, [dataMenu]);
	useEffect(() => {
		if (isMount) return;
		if (haveMenu) {
			let _listMenu = [...dataMenu];
			let check = _listMenu?.find((x: any) => x?.children?.find((y: any) => y.ui_route.split("/")[1] === page[1]));
			_listMenu = _listMenu.map((x: any) => (x.id === check?.id ? { ...x, showAll: true } : x));
			console.log(_listMenu);
			if (_listMenu.length > 0) {
				setDataMenu(_listMenu);
			}
		}
	}, [page[1], haveMenu]);
	const btnShowAll = (index: number) => {
		const _listMenu = [...dataMenu];
		_listMenu[index] = {
			..._listMenu[index],
			showAll: !_listMenu[index].showAll
		};
		setDataMenu(_listMenu);
	};
	const handleKeyDown = (e: any) => {
		if (e.key === "Enter") {
			formSearch.submit();
		}
	};
	const submitSearch = (values: any) => {
		if (values?.search !== undefined) {
			setInputSearch(values.search);
		}
	};
	/*const resizeAnimation = () => {
  const a = document.getElementById("siderStyled");
  if (window.innerWidth < 1401) {
    a?.classList.add("width0");
  } else {
    a?.classList.remove("width0");
  }
};
const handleCloseNav = () => {
  if (window.innerWidth < 1401) {
    const a = document.getElementById("siderStyled");
 
    a?.classList.add("width0");
  }
};
useEffect(() => {
  const a = document.getElementById("siderStyled");
  if (window.innerWidth < 1401) {
    a?.classList.add("width0");
  } else {
    a?.classList.remove("width0");
  }
  window.addEventListener("resize", resizeAnimation);
}, []);*/

	/**************************** END **************************/

	/****************************START**************************/
	/*                         Component                       */

	/**************************** END **************************/

	/****************************START**************************/
	/*                      Return Component                   */
	const renderIconMenu = (e: any) => {
		console.log(e);
		switch (e) {
			case "create-package-debt":
				return <SvgSetting fill="#fff" />;
			case "package-debt-list":
				return <SvgSetting fill="#fff" />;
			case "orders-create":
				return <SvgSetting fill="#fff" />;
			case "create-by-file":
				return <SvgSetting fill="#fff" />;
			case "orders":
				return <SvgSetting fill="#fff" />;
			case "customers":
				return <SvgSetting fill="#fff" />;
			case "user-system":
				return <SvgSetting fill="#fff" />;
			case "user-groups":
				return <SvgGroupUser fill="#fff" />;
			case "config-zones":
				return <SvgSetting fill="#fff" />;
			case "price-setting":
				return <SvgSetting fill="#fff" />;
			case "doi-xe":
				return <SvgSetting fill="#fff" />;
			case "ma-chuyen":
				return <SvgSetting fill="#fff" />;
			case "so-cont":
				return <SvgSetting fill="red" />;
			case "warehouse":
				return <SvgSetting fill="#fff" />;
			case "routing":
				return <SvgSetting fill="#fff" />;
			case "supplier":
				return <SvgSetting fill="#fff" />;
			case "reason":
				return <SvgSetting fill="#fff" />;
			case "listed-orders/import":
				return <SvgIconListProduct fill="#fff" />;
			case "listed":
				return <SvgSetting fill="#fff" />;
			case "listed-orders/export":
				return <SvgIconListProduct fill="#fff" />;
			case "get-statement":
				return <SvgSetting fill="#fff" />;
			case "export-bills":
				return <SvgSetting fill="#fff" />;
			case "delivery-bill":
				return <SvgSetting fill="#fff" />;
			case "inventory":
				return <SvgSetting fill="#fff" style={{ transform: "scale(1.2)" }} />;
			default:
				return null;
		}
	};
	return (
		<div id="sidenav" className="h-full sidenav bg-accent_color_5_6">
			<div style={{ padding: "10px 10px 0 10px" }}>
				<Form name="searchMenu" form={formSearch} onFinish={submitSearch}>
					<Form.Item name="search" style={{ margin: "0" }}>
						<Input
							placeholder="Tìm kiếm trang"
							onChange={(e) => {
								submitSearch({ search: e.target.value });
							}}
							onKeyDown={handleKeyDown}
							className="defaultInput"
						/>
					</Form.Item>
				</Form>
			</div>
			{dataMenu && dataMenu?.length > 0 ? (
				dataMenu.map((e, index) =>
					(e?.children?.length === 0 || !e?.children) && e?.ui_route?.length > 0 ? (
						<Link
							key={index}
							to={`/${e?.ui_route?.replace("/", "")}`}
							className={`dashboardLink ${pathname === "/dashboard" ? "activeLink" : ""}`}
						>
							<img
								alt={pathname.replace("/", "") === e?.ui_route?.replace("/", "") ? e?.active_icon : e?.ui_icon}
								src={`${API_URL_CDN}/${
									pathname.replace("/", "") === e?.ui_route?.replace("/", "") ? e?.active_icon : e?.ui_icon
								}`}
								style={{
									maxWidth: "30px",
									objectFit: "cover",
									background: "transparent"
								}}
							/>
							<span className="db-title">{e.funct_name}</span>
						</Link>
					) : (
						e?.children?.length !== 0 &&
						e.status && (
							<Col key={index}>
								<div
									className="button_navBar"
									onClick={(e) => {
										e.preventDefault();
										btnShowAll(index);
									}}
								>
									<Row align="middle" className="parent-menu">
										<span className="icon">
											<div
												className={`${
													!e.showAll ? " iconLeft" : e?.children?.length > 0 ? "iconLeft active" : "iconLeft"
												}`}
											>
												<img
													alt={
														pathname.replace("/", "") === e?.ui_route?.replace("/", "") ? e?.active_icon : e?.ui_icon
													}
													src={`${API_URL_CDN}/${
														pathname.replace("/", "") === e?.ui_route?.replace("/", "") ? e?.active_icon : e?.ui_icon
													}`}
													style={{
														maxWidth: "30px",
														objectFit: "cover",
														background: "transparent"
													}}
												/>
											</div>
											{/* {e.showAll ? (
                        <div className="iconLeft">
                          <SvgIconMoveRight />
                        </div>
                      ) : (
                        <div className="iconLeft">
                          <SvgIconDown />
                        </div>
                      )} */}
										</span>
										<span className="titleMenu">{e?.funct_name}</span>
									</Row>
								</div>

								{e?.showAll &&
									e?.children?.map(
										(item: any, indexItem: number) =>
											item.status && (
												<NavLink
													onClick={() => console.log("12312312", pathname, page, item?.ui_route?.replace("/", ""))}
													key={indexItem}
													to={`/${item?.ui_route.replace("/", "")}`}
												>
													<Row
														align="middle"
														className={`${
															page.length > 0 && page[1] === item?.ui_route?.replace("/", "")?.split("/")[0]
																? "child-menu-click"
																: "child-menu"
														}`}
														style={{ background: page === item?.ui_route?.replace("/", "") ? "red" : "" }}
													>
														<span className="icon">
															<div className="iconLeft">
																<img
																	alt={
																		page[1] === item?.ui_route?.replace("/", "")?.split("/")[0]
																			? item?.active_icon
																			: item?.ui_icon
																	}
																	src={`${API_URL_CDN}/${
																		page[1] === item?.ui_route?.replace("/", "")?.split("/")[0]
																			? item?.active_icon
																			: item?.ui_icon
																	}`}
																	style={{
																		maxWidth: "30px",
																		objectFit: "cover",
																		background: "transparent"
																	}}
																/>
															</div>
														</span>
														<span className="titleMenu">{item?.funct_name}</span>
													</Row>
												</NavLink>
											)
									)}
								{index === dataMenu.length - 1 && (
									<div style={{ marginTop: 50 }}>
										<div className="copyright flex justify-center"></div>
									</div>
								)}
							</Col>
						)
					)
				)
			) : (
				<div className="mt-10">
					<Empty />
				</div>
			)}
		</div>
	);

	/**************************** END **************************/
}

export default Sidenav;
