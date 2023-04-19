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

import { Layout, Popover, Select } from "antd";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import IconAvatar from "src/assets/images/avatar.png";
import SvgLogoOMSx2 from "src/assets/svg/SvgLogoOMSx2";
import { signOut } from "src/services/actions/account.actions";
import { useAuth } from "src/services/authorRouter";
import { localGetAccount } from "src/utils/localStorage";
import SignOutIcon from "../../assets/images/SignOut.svg";
import UserIcon from "../../assets/images/UserIcon.svg";
import SvgIconExpand from "../../assets/svg/SvgIconExpand";
import Footer from "./Footer";
import Sidenav from "./Sidenav";
import SellerContext from "src/context/sellerContext";
import { API_URL_CDN } from "src/services/api/config";
const { Header: AntHeader, Content, Sider } = Layout;

function Main(props: { children: any }) {
	const { children } = props;
	const [visible, setVisible] = useState(false);
	const [placement, setPlacement] = useState("right");
	const [sidenavColor, setSidenavColor] = useState("#1890ff");
	const [sidenavType, setSidenavType] = useState("transparent");
	const [openNav, setOpenNav] = useState(true);
	const [fixed, setFixed] = useState(false);
	const [visiblePopover, setVisiblePopover] = useState(false);
	const [inputSearch, setInputSearch] = useState<string>("");
	const history = useHistory();
	const auth = useAuth();
	const dispatch = useDispatch();

	let { pathname } = useLocation();
	pathname = pathname.replace("/", "");
	const { sellerInfo, setSellerInfo } = useContext(SellerContext) as any;
	/****************************START**************************/
	/*                         Life Cycle                      */

	// useEffect(() => {
	//   if (pathname === "rtl") {
	//     setPlacement("left");
	//   } else {
	//     setPlacement("right");
	//   }
	// }, [pathname]);

	/**************************** END **************************/

	/****************************START**************************/
	/*                          Function                       */

	/**************************** END **************************/

	/****************************START**************************/
	/*                         Component                       */

	const _renderBody = () => {
		return (
			<Layout>
				{/* {fixed ? (
          <Affix offsetTop={0} >
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                placement={undefined}
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <div className={`mt-12 w-full`}>
            <Header
              placement={undefined}
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </div>
        )} */}
				{/* <Content className="content-ant" style={{marginTop:50}}>{children}</Content> */}
				<div className="mainBody">{children}</div>
				<Footer />
			</Layout>
		);
	};

	const _renderSideMenu = () => {
		return (
			<Sider
				collapsible
				collapsed={false}
				breakpoint="lg"
				collapsedWidth="0"
				onCollapse={(collapsed, type) => {}}
				trigger={null}
				width={230}
				theme="light"
				id="siderStyled"
				className={`sider-primary ant-layout-sider-primary  ${sidenavType === "#fff" ? "active-route" : ""} ${
					openNav ? "" : "closeNav"
				}`}
				style={{ background: sidenavType, padding: 0 }}
			>
				{openNav && <Sidenav color={sidenavColor} />}
			</Sider>
		);
	};

	const btnSignOut = () => {
		setVisiblePopover(false);
		dispatch(signOut({ history }));
	};
	const btnProfile = () => {
		setVisiblePopover(false);
		history.push("/profiles");
	};

	/**************************** END **************************/

	/****************************START**************************/
	/*                      Return Component                   */
	const content = () => {
		return (
			<div className="navbar-user">
				{/* <button
          onClick={btnChangePass}
          className="flex items-center justify-start my-1"
        >
          <SvgIconKey />
          <p className="text-14 px-2">Đổi mật khẩu</p>
        </button> */}
				{/* <button onClick={() => console.log(sellerInfo.avatar.search("://") !== -1)}> */}
				<button onClick={btnProfile}>
					<img src={UserIcon} alt="" />
					&nbsp;&nbsp;
					<p>Tài khoản</p>
				</button>
				<button onClick={btnSignOut}>
					<img src={SignOutIcon} alt="" />
					&nbsp;&nbsp;
					<p>Đăng xuất</p>
				</button>
			</div>
		);
	};
	const _renderProfile = () => {
		return (
			<div style={{ display: "flex", alignItems: "center" }}>
				{sellerInfo.user_type !== "admin" && (
					<div style={{ minWidth: "210px" }}>
						<Select
							value={sellerInfo?.catalog_id}
							options={sellerInfo?.catalogs_list}
							className="defaultSelect"
							style={{ marginTop: "6px" }}
							onChange={(e: any) => {
								setSellerInfo({ ...sellerInfo, catalog_id: e });
								history.push("/");
							}}
						/>
					</div>
				)}

				<Popover
					content={content}
					title=""
					trigger="click"
					open={visiblePopover}
					onOpenChange={(e) => setVisiblePopover(e)}
				>
					<button
						style={{
							display: "flex",
							alignItems: "center",
							padding: "4px 9px"
						}}
					>
						<img
							src={
								sellerInfo?.avatar?.search("://") !== -1
									? sellerInfo?.avatar
									: `${API_URL_CDN}${sellerInfo?.avatar}` ||
									  "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
							}
							referrerPolicy="no-referrer"
							alt="avatar"
							className="avatarHeader"
						/>
						&nbsp;&nbsp;
						<p style={{ margin: "0", fontWeight: "bold" }}>{sellerInfo?.user_name}</p>
					</button>
				</Popover>
			</div>
		);
	};
	return (
		<Layout
			className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""} ${
				pathname === "rtl" ? "layout-dashboard-rtl" : ""
			}`}
		>
			<div className="contentHeader" style={{ height: 48 }}>
				<div className="contentHeader-left">
					<div onClick={() => setOpenNav(!openNav)}>
						<SvgIconExpand />
					</div>
					<div style={{ transform: "scale(0.5)", marginLeft: "-3rem" }}>
						<SvgLogoOMSx2 />
					</div>
				</div>

				{_renderProfile()}
			</div>
			{_renderSideMenu()}
			{_renderBody()}
		</Layout>
	);

	/**************************** END **************************/
}

export default Main;
