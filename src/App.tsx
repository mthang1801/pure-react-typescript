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
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Form } from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./app.css";
import Main from "./components/layout/Main";
import { notifyError } from "./components/notification";
import PosScreen from "./pages/\bposScreen";
import BillsEdit from "./pages/billManager/edit";
import BillList from "./pages/billManager/list";
import Catalogs from "./pages/catalogs/list";
import CategoryCreate from "./pages/category/create";
import CategoryEdit from "./pages/category/edit";
// import CategoryCreate from "./pages/category/create";
// import CategoryEdit from "./pages/category/edit";
import CateList from "./pages/category/list";
import CODEdit from "./pages/cod/edit";
import CODList from "./pages/cod/list";
import PlatformEdit from "./pages/configPlatform/edit";
import PlatformList from "./pages/configPlatform/list";
import CronFuntionList from "./pages/cronFuntion/list";
import CustomersCreate from "./pages/customers/create";
import CustomersEdit from "./pages/customers/edit";
import CustomersList from "./pages/customers/list";
import Dashboard from "./pages/dashboard/Dashboard";
import FeaturesCreate from "./pages/features/create";
import FeaturesEdit from "./pages/features/edit";
import FeaturesList from "./pages/features/list";
import InstallStoreCreate from "./pages/installStore/create";
import InstallStoreEdit from "./pages/installStore/edit";
import InstallStoreList from "./pages/installStore/list";
import InventoryReceiptsEdit from "./pages/inventory-receipts/edit";
import InventoryReceiptsCreate from "./pages/inventory-receipts/create";
import InventoryReceiptsList from "./pages/inventory-receipts/list";
import ModuleFunctionsEdit from "./pages/moduleFunction/edit";
import ModuleFunctionsList from "./pages/moduleFunction/list";
import OrdersCreate from "./pages/orders/create";
import OrdersEdit from "./pages/orders/edit";
import OrdersList from "./pages/orders/list";
import ProductCreate from "./pages/product/create";
import ProductEdit from "./pages/product/edit";
import ProductList from "./pages/product/list";
import SchedulerList from "./pages/scheduler/list";
import ShippingList from "./pages/shipping/list";
import SignIn from "./pages/signIn";
import StoreEdit from "./pages/store/edit";
import StoreList from "./pages/store/list";
import SupplierList from "./pages/supplier/list";
import { API_URL } from "./services/api/config";
import { useAuth } from "./services/authorRouter";
import { AppState } from "./types";
import routerNames from "./utils/data/routerName";
import { useIsMount } from "./utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "./utils/localStorage";
import UserGroupList from "./pages/user-groups/list";
import UserGroupEdit from "./pages/user-groups/edit";
import UserSystemList from "./pages/user-system/list";
import UserSystemEdit from "./pages/user-system/edit";
import CodCreate from "./pages/cod/create";
import ConfigSettingList from "./pages/configSetting/list";
import ProfileUser from "./pages/profiles";
import PackageList from "./pages/packageManger/list";
import PackageCreate from "./pages/packageManger/create";
import PackageEdit from "./pages/packageManger/edit";
import TransportOverview from "./pages/transportOverview";
import { SellerProvider } from "./context/sellerContext";
import PointPage from "./pages/point";
import CouponList from "./pages/coupon/list";
import CouponCreate from "./pages/coupon/create";
import CouponEdit from "./pages/coupon/edit";
import UpdatePassword from "./pages/updatePassword";
import SaleList from "./pages/saleManage/list";
import SaleCreate from "./pages/saleManage/create";
import SaleEdit from "./pages/saleManage/edit";
function App() {
	const [signInForm] = Form.useForm();

	const auth = useAuth();
	const dispatch = useDispatch();
	const isMount = useIsMount();
	let history = useHistory();
	const [seller, setSeller] = useState<any>(undefined);
	/****************************START**************************/
	/*                         Life Cycle                      */

	// useEffect(() => {
	//   function checkAuthor() {
	//     let token = localGetToken();
	//     let account = localGetAccount();
	//     const _rootPathname = pathname.split("/");
	//     if (token && account) {
	//       dispatch(putSignIn(true));
	//       auth.signIn(token, account, () => {
	//         if (pathname === "/" || pathname === routerNames.SIGN_IN)
	//           history.push(routerNames.DASHBOARD);
	//         else history.push(pathname);
	//       });
	//     } else if (
	//       _rootPathname[1] &&
	//       routerNotAuth.includes(`/${_rootPathname[1]}`)
	//     ) {
	//       history.push(pathname);
	//     } else {
	//       history.push({
	//         pathname: routerNames.SIGN_IN,
	//       });
	//     }
	//   }
	//   checkAuthor(); // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// useEffect(() => {
	//   if (isMount) return;
	//   const { success } = stateSignIn;
	//   if (success) {
	//     dispatch(putSignIn(true));
	//   }
	// }, [stateSignIn.isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
	// useEffect(() => {
	//   let _formLogin = localGetFormLogin();
	//   if (!phone && !email && _formLogin) {
	//     let _dataUser = JSON.parse(_formLogin);
	//     signInForm.setFieldsValue({
	//       username: _dataUser.username,
	//       // password: _dataUser.password
	//     });
	//   }
	// }, []);
	useEffect(() => {
		const getPaymentMethods = async () => {
			let headers: any = {
				"Content-Type": "application/json,text/plain, */*"
			};
			let token = localGetToken();
			let uuid = localGetAuthUUID();
			if (token) {
				headers.Authorization = token;
				headers["x-auth-uuid"] = uuid;
			}
			try {
				const { data } = await axios.get(`${API_URL}/auth/verify-token`, {
					headers: headers
				});
				if (data) {
				}
			} catch (error: any) {
				if (error?.response?.data?.statusCode === 408 || error?.response?.data?.statusCode === 409) {
					localStorage.clear();
					history.push("/sign-in");
				}
			}
		};
		const check = localStorage.getItem("ACCOUNT") ? JSON.parse(localStorage.getItem("ACCOUNT") || "") : undefined;
		if (history.location.pathname === "/recovery-account") {
			return;
		}
		if (!check) {
			localStorage.clear();
			history.push("/sign-in");
		} else {
			setSeller(localStorage.getItem("ACCOUNT") ? JSON.parse(localStorage.getItem("ACCOUNT") || "") : undefined);
		}
		if (history.location.pathname !== "/sign-in") {
			getPaymentMethods();
		}
	}, [history.location.pathname, localStorage]);
	return (
		<GoogleOAuthProvider clientId="1078820425477-bfod3v81p4h793tave67bmal6jd838c4.apps.googleusercontent.com">
			<div className="App">
				<SellerProvider>
					<Switch>
						<Route path={routerNames.SIGN_IN} exact component={SignIn} />
						<Route path={"/recovery-account"} exact component={UpdatePassword} />

						<Route path={routerNames.POS} exact component={PosScreen} />
						<Main>
							<Route exact path={routerNames.DASHBOARD} component={Dashboard} />
							<Route exact path={routerNames.TRANSPORT_OVERVIEW} component={TransportOverview} />
							<Route exact path={routerNames.POINT} component={PointPage} />
							<Route exact path={routerNames.COUPON} component={CouponList} />
							<Route exact path={routerNames.SALE} component={SaleList} />
							<Route exact path={`${routerNames.SALE}/create`} component={SaleCreate} />
							<Route exact path={`${routerNames.SALE}/edit/:id`} component={SaleEdit} />

							<Route exact path={`${routerNames.COUPON}/create`} component={CouponCreate} />
							<Route exact path={`${routerNames.COUPON}/edit/:id`} component={CouponEdit} />

							<Route exact path={routerNames.PACKAGES} component={PackageList} />
							<Route exact path={`${routerNames.PACKAGES}/edit/:id`} component={PackageEdit} />

							{/* <Route exact path={routerNames.PACKAGES_CREATE} component={PackageCreate} /> */}

							<Route exact path={routerNames.PROFILES} component={ProfileUser} />

							<Route exact path={routerNames.CONFIG} component={ConfigSettingList} />

							<Route exact path={routerNames.SCHEDULER} component={SchedulerList} />

							<Route exact path={routerNames.CATALOGS} component={Catalogs} />
							<Route exact path={routerNames.CATEGORIES} component={CateList} />
							<Route exact path={`${routerNames.CATEGORIES_EDIT}/:id`} component={CategoryEdit} />
							<Route exact path={routerNames.CATEGORIES_CREATE} component={CategoryCreate} />

							<Route exact path={routerNames.SHIPPING} component={ShippingList} />

							<Route exact path={routerNames.CRON} component={CronFuntionList} />

							<Route exact path={routerNames.COD} component={CODList} />
							<Route exact path={routerNames.COD_CREATE} component={CodCreate} />

							<Route exact path={`${routerNames.COD_EDIT}/:id`} component={CODEdit} />

							<Route exact path={routerNames.BILL} component={BillList} />

							<Route exact path={`${routerNames.BILL_EDIT}/:id`} component={BillsEdit} />

							<Route exact path={routerNames.MODULE_FUNCTIONS} component={ModuleFunctionsList} />

							<Route exact path={`${routerNames.MODULE_FUNCTIONS_EDIT}/:id`} component={ModuleFunctionsEdit} />

							<Route exact path={routerNames.STORE} component={StoreList} />
							<Route exact path={`${routerNames.STORE_EDIT}/:id`} component={StoreEdit} />

							<Route exact path={routerNames.FEATURES} component={FeaturesList} />
							<Route exact path={routerNames.FEATURES_CREATE} component={FeaturesCreate} />
							<Route exact path={`${routerNames.FEATURES_EDIT}/:id`} component={FeaturesEdit} />

							<Route exact path={routerNames.INVENTORY_RECEIPTS} component={InventoryReceiptsList} />
							<Route exact path={routerNames.INVENTORY_RECEIPTS_CREATE} component={InventoryReceiptsCreate} />
							<Route exact path={`${routerNames.INVENTORY_RECEIPTS_EDIT}/:id`} component={InventoryReceiptsEdit} />

							<Route exact path={routerNames.PRODUCT} component={ProductList} />
							<Route exact path={`${routerNames.PRODUCT_EDIT}/:id`} component={ProductEdit} />

							<Route exact path={routerNames.PRODUCT_CREATE} component={ProductCreate} />
							<Route exact path={routerNames.SUPPLIER} component={SupplierList} />

							<Route exact path={routerNames.INSTALL_STORE} component={InstallStoreList} />
							<Route exact path={routerNames.INSTALL_STORE_CREATE} component={InstallStoreCreate} />
							<Route exact path={`${routerNames.INSTALL_STORE_EDIT}/:id`} component={InstallStoreEdit} />

							<Route exact path={routerNames.CUSTOMERS} component={CustomersList} />
							<Route exact path={routerNames.CUSTOMERS_CREATE} component={CustomersCreate} />
							<Route exact path={`${routerNames.CUSTOMERS_EDIT}/:id`} component={CustomersEdit} />

							<Route exact path={routerNames.ORDERS} component={OrdersList} />
							<Route exact path={routerNames.ORDERS_CREATE} component={OrdersCreate} />

							<Route exact path={`${routerNames.ORDERS_EDIT}/:id`} component={OrdersEdit} />
							<Route exact path={routerNames.USER_GROUPS} component={UserGroupList} />
							<Route exact path={`${routerNames.USER_SYSTEM}/:id`} component={UserGroupEdit} />
							<Route exact path={routerNames.USER_SYSTEM} component={UserSystemList} />
							<Route exact path={`${routerNames.USER_GROUPS}/:id`} component={UserSystemEdit} />
							<Route exact path={routerNames.PLATFORM} component={PlatformList} />
							<Route exact path={`${routerNames.PLATFORM_EDIT}/:id`} component={PlatformEdit} />
						</Main>
					</Switch>
				</SellerProvider>
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
