import { Checkbox, Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logoBackgroundOMS from "src/assets/images/logoBackgroundOMS.png";
import { registerAccount, signInAccount } from "../../services/actions/account.actions";
import { AppState } from "../../types";

import { useHistory } from "react-router-dom";
import SvgLogoLoginOMS from "src/assets/svg/SvgLogoLoginOMS";
import { notifyError, notifySuccess } from "src/components/notification";
import { useAuth } from "src/services/authorRouter";
import colors from "src/utils/colors";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import {
	localGetFormLogin,
	localSaveAccount,
	localSaveAuthUUID,
	localSaveFeatures,
	localSaveFormLogin,
	localSaveToken
} from "src/utils/localStorage";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
// import GoogleLogin from "react-google-login";
// import { useGoogleLogin } from "@react-oauth/google";
import SvgFacebookLogin from "src/assets/svg/SvgFacebookLogin";
import { IGoogleAuthentication } from "src/services/interfaces/auth.interface";
import { signInGoogle } from "../../services/actions/account.actions";
import SvgGoogleLogin from "src/assets/svg/SvgGoogleLogin";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_CATALOGS } from "src/services/api/url.index";
import { mailPattern, phonePattern, removeSign } from "src/utils/helpers/functions/textUtils";
import message from "src/constants/message";
import axios from "axios";
const SignIn = () => {
	const [formLogin] = Form.useForm();
	const [formLoginPlatform] = Form.useForm();
	const [getPasswordForm] = Form.useForm();
	const auth = useAuth();
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [type, setType] = useState(1);
	let history = useHistory();
	const { stateSignIn, stateRegister } = useSelector((state: AppState) => state.accountReducer);
	const [userInfo, setUserInfo] = useState<any>(undefined);
	const [selectedProvince, setSelectedProvince] = useState<any>(undefined);
	const [selectedDistrict, setSelectedDistrict] = useState<any>(undefined);
	const [visibleSetting, setVisibleSetting] = useState<any>(false);
	const [provinces, setProvinces] = useState<any[]>([]);
	const [districts, setDistricts] = useState<any[]>([]);
	const [wards, setWards] = useState<any[]>([]);
	/****************************START**************************/
	/*                         Life Cycle                      */

	useEffect(() => {
		let _formLogin = localGetFormLogin();
		if (_formLogin) {
			let _dataUser = JSON.parse(_formLogin);
			console.log(_dataUser);
			formLogin.setFieldsValue({
				username: _dataUser.username
			});
		}
	}, []);

	useEffect(() => {
		if (isMount) return;
		const { isLoading, success, message, error, data } = stateRegister;
		if (!isLoading) {
			if (success) {
				notifySuccess(message + "");
				formLogin.resetFields();
				setType(1);
			} else if (error) {
				return notifyError(message + "");
			}
		}
	}, [stateRegister.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { isLoading, success, message, error, data } = stateSignIn;
		if (!isLoading) {
			if (success) {
				localSaveAccount(JSON.stringify(data?.data));
				localSaveToken(data?.data?.token || "");
				localSaveFeatures(data?.data?.features || "");
				localSaveAuthUUID(data?.data?.uuid || "");
				localSaveFormLogin(
					JSON.stringify({
						username: data?.data?.user?.email
					})
				);
				auth.signIn(data?.data?.token || "", JSON.stringify(data?.data), () => {
					notifySuccess("Đăng nhập thành công");
					history.push({
						pathname: "/"
					});
				});
			} else if (error) {
				return notifyError(message + "");
			}
		}
	}, [stateSignIn.isLoading]);

	/**************************** END **************************/

	/****************************START**************************/
	/*                          Function                       */

	const btnSignIn = (values: any) => {
		let params;
		// email: 'maivthang95@gmail.com',
		// password: 'Aa@123456'
		if (values?.username?.search("@") !== -1) {
			params = {
				username: values?.username?.trim(),
				password: values?.password?.trim()
			};
		} else {
			params = {
				username: values.username.trim(),
				password: values.password.trim()
			};
		}

		dispatch(signInAccount(params));
	};
	const btnRegisterPlatform = (values: any) => {
		console.log("2341", values, userInfo);
		let params = {
			providerId: userInfo?.sub,
			familyName: userInfo?.familyName,
			givenName: userInfo?.givenName,
			imageUrl: userInfo?.picture,
			email: values?.email,
			phone: values?.phone,
			seller_name: values?.seller_name?.trim(),
			catalog_id: values?.catalog_id,
			province_id: values?.province_id,
			district_id: values?.district_id,
			ward_id: values?.ward_id,
			province_name: provinces.find((x: any) => x.value === values?.province_id)?.label,
			district_name: districts.find((x: any) => x.value === values?.district_id)?.label,
			ward_name: wards.find((x: any) => x.value === values?.ward_id)?.label
		};
		dispatch(signInGoogle(params));
	};
	const btnRegister = (values: any) => {
		let params;
		params = {
			fullname: values.fullname.trim(),
			email: values.email.trim(),
			phone: values.phone.trim(),
			password: values.password.trim(),
			seller_name: values?.seller_name?.trim(),
			catalog_id: values?.catalog_id,
			province_id: values?.province_id,
			district_id: values?.district_id,
			ward_id: values?.ward_id,
			province_name: provinces.find((x: any) => x.value === values?.province_id)?.label,
			district_name: districts.find((x: any) => x.value === values?.district_id)?.label,
			ward_name: wards.find((x: any) => x.value === values?.ward_id)?.label
		};
		dispatch(registerAccount(params));
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	/**************************** END **************************/

	/****************************START**************************/
	/*                         Component                       */

	/**************************** END **************************/

	/****************************START**************************/
	/*                        Return Page                      */
	const responseFacebook = async (response: any) => {
		if (response?.accessToken) {
			let userInfo = await response;
			const responseEmail = (await api.get(
				`https://graph.facebook.com/${userInfo.userID}?fields=name,gender,email,picture&access_token=${response?.accessToken}`
			)) as any;
			console.log("userInfo", responseEmail);
			try {
				if (!responseEmail?.email) {
					return notifyError("Tài khoản Facebook chưa liên kết email, hãy liên kết và quay lại!");
				}
				if (responseEmail?.email) {
					let params = {
						email: responseEmail?.email
					};
					const check = (await api.post(`${API_URL}/auth/check-exist`, params)) as any;
					if (check) {
						if (check.statusCode === 0) {
							setVisibleSetting(true);
							setUserInfo({
								sub: userInfo?.id,
								familyName: "",
								givenName: userInfo?.name,
								picture: userInfo?.picture?.data?.url,
								email: userInfo.data?.email
							});
						} else {
							const dataRequest: any = {
								providerId: userInfo?.id,
								familyName: "",
								givenName: userInfo?.name,
								imageUrl: userInfo?.picture?.data?.url,
								email: userInfo?.email
								// extra_data: userInfo.data?.name
							};
							dispatch(signInGoogle(dataRequest));
						}
						console.log(check);
					}
				}
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		}
	};

	const createOrGetUser = async (res: any) => {
		let userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
			headers: {
				Authorization: `Bearer ${res.access_token}`,
				Accept: "application/json"
			}
		});
		if (userInfo.data) {
			try {
				let params = {
					email: userInfo.data?.email
				};
				const check = (await api.post(`${API_URL}/auth/check-exist `, params)) as any;
				if (check) {
					if (check.statusCode === 0) {
						setVisibleSetting(true);
						setUserInfo({
							sub: userInfo.data?.sub,
							familyName: userInfo.data?.family_name,
							givenName: userInfo.data?.given_name,
							picture: userInfo.data?.picture,
							email: userInfo.data?.email
						});
					} else {
						const dataRequest: any = {
							providerId: userInfo.data?.sub,
							familyName: userInfo.data?.family_name,
							givenName: userInfo.data?.given_name,
							imageUrl: userInfo.data?.picture,
							email: userInfo.data?.email
							// extra_data: userInfo.data?.name
						};
						dispatch(signInGoogle(dataRequest));
					}
					console.log(check);
				}
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		}
	};

	// const login = useGoogleLogin({
	// 	onSuccess: (credentialResponse: any) => createOrGetUser(credentialResponse),
	// 	scope: "email"
	// });

	// const responseGoogle = (response: any) => {
	// 	console.log(response);
	// 	const { profileObj } = response;
	// 	const dataRequest: IGoogleAuthentication = {
	// 		providerId: profileObj["googleId"],
	// 		familyName: profileObj["familyName"],
	// 		givenName: profileObj["givenName"],
	// 		imageUrl: profileObj["imageUrl"],
	// 		email: profileObj["email"],
	// 		extra_data: profileObj["tokenObj"]
	// 	};
	// 	dispatch(signInGoogle(dataRequest));
	// };
	const [catalogs, setCatalogs] = useState<any[]>([]);
	const login = useGoogleLogin({
		onSuccess: (credentialResponse) => createOrGetUser(credentialResponse),
		scope: ""
	});

	useEffect(() => {
		const getCatalogs = async (params?: any) => {
			let paramsFilter = {
				limit: 10000,
				page: 1
			};
			try {
				const response = (await api.get(`${API_URL}/${API_CATALOGS}/all`, paramsFilter)) as any;
				let data = response["data"];
				let fakeArray = [];
				for (let i = 0; i < data?.length; i++) {
					fakeArray.push({
						value: data[i]?.id,
						label: data[i]?.catalog_name
					});
				}
				setCatalogs(fakeArray);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			getCatalogs();
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		const getCities = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/provinces`, params)) as any;
				const data = response.data;
				if (data) {
					let cities = data;
					let fakeCities = [];
					for (var i = 0; i < cities.length; i++) {
						fakeCities.push({
							label: cities[i]?.province_name,
							value: cities[i]?.id
						});
					}
					setProvinces(fakeCities);
				}
			} catch (error) {}
		};
		getCities();
	}, []);
	//district
	useEffect(() => {
		if (selectedProvince) {
			const getProvinces = async (params: any) => {
				try {
					const response = (await api.get(`${API_URL}/districts`, params)) as any;
					const data = response.data;
					if (data) {
						console.log(data);
						let districts = data;
						let fakeDistricts = [];
						for (var i = 0; i < districts.length; i++) {
							fakeDistricts.push({
								label: districts[i]?.district_name,
								value: districts[i]?.id
							});
						}
						setDistricts(fakeDistricts);
					}
				} catch (error) {}
			};

			getProvinces({ province_id: selectedProvince });
		}
	}, [selectedProvince]);
	//ward
	useEffect(() => {
		if (selectedDistrict) {
			const getWards = async (params: any) => {
				try {
					const response = (await api.get(`${API_URL}/wards`, params)) as any;
					const data = response.data;
					if (data) {
						let fakeWards = [];
						for (var i = 0; i < data?.length; i++) {
							fakeWards.push({
								label: data[i]?.ward_name,
								value: data[i]?.id
							});
						}
						setWards(fakeWards);
					}
				} catch (error) {}
			};

			getWards({ district_id: selectedDistrict });
		}
	}, [selectedDistrict]);

	const submitGetPassword = async (values: any) => {
		console.log("12312", values);
		try {
			const response = (await api.post(`${API_URL}/auth/recovery-account`, { email: values?.username })) as any;
			if (response.statusCode === 200) {
				notifySuccess(response?.message + "");
			} else {
				notifyError(response?.message + "");
			}
		} catch (error: any) {
			notifyError(error?.message + "");
		}
	};
	return (
		<Row align="middle" className="content_signIn">
			<Modal
				open={visibleSetting}
				title={"Thiết lập tài khoản lần đầu"}
				footer={null}
				centered
				maskClosable={false}
				onCancel={() => {
					setVisibleSetting(false);
					formLoginPlatform.resetFields();
					setSelectedProvince(undefined);
					setSelectedDistrict(undefined);
				}}
			>
				<Form
					layout="vertical"
					form={formLoginPlatform}
					id="formLoginPlatform"
					onFinish={btnRegisterPlatform}
					onFinishFailed={onFinishFailed}
					style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}
				>
					<Form.Item
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						name="catalog_id"
						label="Chọn ngành hàng kinh doanh"
						rules={[
							{
								required: true,
								message: "Vui lòng chọn ngành hàng"
							}
						]}
					>
						<Select
							filterOption={(input: any, option: any) => option.label.includes(input)}
							showSearch
							options={catalogs}
							className="defaultSelect"
							placeholder="Chọn ngành hàng"
						/>
					</Form.Item>

					<Form.Item
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						name="seller_name"
						label="Tên cửa hàng"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập tên cửa hàng "
							}
						]}
					>
						<Input
							className="defaultInput"
							id="form-username"
							placeholder="Nhập tên cửa hàng"
							disabled={stateSignIn.isLoading || undefined}
						/>
					</Form.Item>
					<Form.Item
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						name="email"
						label="Email:"
						rules={[
							{
								required: true,
								pattern: mailPattern,
								message: message.customer.inValidEmail
							}
						]}
					>
						<Input
							className="defaultInput"
							id="form-username"
							type="phoneAndEmail"
							placeholder="Nhập email"
							disabled={stateSignIn.isLoading || undefined}
						/>
					</Form.Item>
					<Form.Item
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						name="phone"
						label="Số điện thoại:"
						rules={[{ required: true, pattern: phonePattern, message: message.customer.inValidPhone }]}
					>
						<Input
							className="defaultInput"
							id="form-username"
							type="phoneAndEmail"
							placeholder="Nhập số điện thoại"
							disabled={stateSignIn.isLoading || undefined}
						/>
					</Form.Item>
					<Form.Item
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						name="province_id"
						label="Tỉnh/thành"
						rules={[
							{
								required: true,
								message: "Vui lòng chọn tỉnh/thành "
							}
						]}
					>
						<Select
							showSearch
							filterOption={(input: any, option: any) =>
								removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
							}
							options={provinces}
							placeholder="Tất cả"
							className="defaultSelect"
							onChange={(e: any) => {
								setSelectedProvince(e);
								setWards([]);
								formLogin.setFieldsValue({
									district_id: undefined,
									ward_id: undefined
								});
							}}
						/>
					</Form.Item>

					<Form.Item
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						name="district_id"
						label="Quận huyện"
						rules={[
							{
								required: true,
								message: "Vui lòng chọn quận/huyện"
							}
						]}
					>
						<Select
							showSearch
							filterOption={(input: any, option: any) =>
								removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
							}
							options={districts}
							placeholder="Tất cả"
							className="defaultSelect"
							onChange={(e: any) => {
								setSelectedDistrict(e);
								formLogin.setFieldsValue({
									ward_id: undefined
								});
							}}
						/>
					</Form.Item>

					<Form.Item
						style={{ width: "calc(50% - 4px)", margin: "0 0 20px 0" }}
						name="ward_id"
						label="Phường/xã"
						rules={[
							{
								required: true,
								message: "Vui lòng chọn phường/xã"
							}
						]}
					>
						<Select
							showSearch
							filterOption={(input: any, option: any) =>
								removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
							}
							options={wards}
							placeholder="Tất cả"
							className="defaultSelect"
						/>
					</Form.Item>

					<div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "8px" }}>
						<div
							onClick={() => {
								setVisibleSetting(false);
								formLoginPlatform.resetFields();
								setSelectedProvince(undefined);
								setSelectedDistrict(undefined);
							}}
							className="searchButton"
							style={{ marginRight: "8px" }}
						>
							Hủy bỏ
						</div>
						<div onClick={() => formLoginPlatform.submit()} className="defaultButton">
							Đăng nhập
						</div>
					</div>
				</Form>
			</Modal>
			<Col xs={0} sm={0} md={14} lg={14} xl={14}>
				<img
					style={{
						objectFit: "contain",
						width: "calc(100% - 40px)",
						maxHeight: "100vh"
					}}
					src={logoBackgroundOMS}
					// height={height}
					alt={logoBackgroundOMS}
				/>
			</Col>

			<Col
				xs={24}
				sm={24}
				md={10}
				lg={10}
				xl={10}
				style={{
					display: "flex",
					justifyContent: "center"
				}}
			>
				<div style={{ width: 550 }}>
					<div style={{ background: "rgb(237, 240, 243)", borderRadius: "5px", padding: "32px 24px" }}>
						<div style={{ width: "100%", display: "flex", justifyContent: "center" }} className="svgSmall">
							<SvgLogoLoginOMS />
						</div>
						{type === 1 ? (
							<Form
								layout="vertical"
								form={formLogin}
								id="formLogin"
								onFinish={btnSignIn}
								onFinishFailed={onFinishFailed}
							>
								<Form.Item
									label="Email/ phone:"
									style={{ margin: "8px 0px 13px 0px" }}
									name="username"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập email hoặc số điện thoại"
										}
									]}
								>
									<Input
										className="defaultInput"
										id="form-username"
										type="phoneAndEmail"
										placeholder="Số điện thoại/Email"
										disabled={stateSignIn.isLoading || undefined}
									/>
								</Form.Item>

								<Form.Item
									style={{ margin: " 0 0 13px 0" }}
									label="Mật khẩu"
									name="password"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập mật khẩu"
										}
									]}
								>
									<Input.Password
										id="form-password"
										placeholder="Mật khẩu"
										disabled={stateSignIn.isLoading || undefined}
										className="defaultInputPassword"
										type="password"
										autoComplete="off"
									/>
								</Form.Item>

								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between"
									}}
								>
									<Form.Item style={{ margin: "0" }}>
										<Checkbox>Lưu mật khẩu</Checkbox>
									</Form.Item>
									<div style={{ color: colors.accent_color_5_2, cursor: "pointer" }} onClick={() => setType(3)}>
										Quên mật khẩu
									</div>
								</div>

								<button
									form="formLogin"
									type="submit"
									style={{
										background: colors.primary_color_1_1,
										width: "100%",
										height: "41px",
										borderRadius: "5px",
										color: colors.neutral_color_1_2,
										fontWeight: "bold"
									}}
								>
									Đăng nhập
								</button>

								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										width: "100%",
										marginTop: "8px"
									}}
								>
									<div
										style={{
											marginRight: "8px",
											width: "30px",
											height: "1px",
											background: "rgb(190,195,199)"
										}}
									/>
									<div style={{ color: "rgb(160,165,169)" }}>hoặc đăng nhập với</div>
									<div
										style={{
											marginLeft: "8px",
											width: "30px",
											height: "1px",
											background: "rgb(190,195,199)"
										}}
									/>
								</div>
							</Form>
						) : type === 2 ? (
							<Form
								layout="vertical"
								form={formLogin}
								id="formLogin"
								onFinish={btnRegister}
								onFinishFailed={onFinishFailed}
								style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}
							>
								<Form.Item
									style={{ width: "calc(50% - 4px)", margin: "8px 0 13px 0" }}
									name="catalog_id"
									label="Chọn ngành hàng kinh doanh"
									rules={[
										{
											required: true,
											message: "Vui lòng chọn ngành hàng"
										}
									]}
								>
									<Select
										filterOption={(input: any, option: any) => option.label.includes(input)}
										showSearch
										options={catalogs}
										className="defaultSelect"
										placeholder="Chọn ngành hàng"
									/>
								</Form.Item>
								<Form.Item
									style={{ width: "calc(50% - 4px)", margin: "8px 0 13px 0" }}
									name="fullname"
									label="Họ và tên"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập họ và tên "
										}
									]}
								>
									<Input
										className="defaultInput"
										id="form-username"
										placeholder="Nhập họ và tên"
										disabled={stateSignIn.isLoading || undefined}
									/>
								</Form.Item>
								<Form.Item
									style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
									name="seller_name"
									label="Tên cửa hàng"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập tên cửa hàng "
										}
									]}
								>
									<Input
										className="defaultInput"
										id="form-username"
										placeholder="Nhập tên cửa hàng"
										disabled={stateSignIn.isLoading || undefined}
									/>
								</Form.Item>
								<Form.Item
									style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
									name="email"
									label="Email:"
									rules={[
										{
											required: true,
											pattern: mailPattern,
											message: message.customer.inValidEmail
										}
									]}
								>
									<Input
										className="defaultInput"
										id="form-username"
										type="phoneAndEmail"
										placeholder="Nhập email"
										disabled={stateSignIn.isLoading || undefined}
									/>
								</Form.Item>
								<Form.Item
									style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
									name="province_id"
									label="Tỉnh/thành"
									rules={[
										{
											required: true,
											message: "Vui lòng chọn tỉnh/thành "
										}
									]}
								>
									<Select
										showSearch
										filterOption={(input: any, option: any) =>
											removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
										}
										options={provinces}
										placeholder="Tất cả"
										className="defaultSelect"
										onChange={(e: any) => {
											setSelectedProvince(e);
											setWards([]);
											formLogin.setFieldsValue({
												district_id: undefined,
												ward_id: undefined
											});
										}}
									/>
								</Form.Item>
								<Form.Item
									style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
									name="phone"
									label="Số điện thoại:"
									rules={[{ required: true, pattern: phonePattern, message: message.customer.inValidPhone }]}
								>
									<Input
										className="defaultInput"
										id="form-username"
										type="phoneAndEmail"
										placeholder="Nhập số điện thoại"
										disabled={stateSignIn.isLoading || undefined}
									/>
								</Form.Item>
								<Form.Item
									style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
									name="district_id"
									label="Quận huyện"
									rules={[
										{
											required: true,
											message: "Vui lòng chọn quận/huyện"
										}
									]}
								>
									<Select
										showSearch
										filterOption={(input: any, option: any) =>
											removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
										}
										options={districts}
										placeholder="Tất cả"
										className="defaultSelect"
										onChange={(e: any) => {
											setSelectedDistrict(e);
											formLogin.setFieldsValue({
												ward_id: undefined
											});
										}}
									/>
								</Form.Item>
								<Form.Item
									style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
									name="password"
									label="Mật khẩu:"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập mật khẩu"
										}
									]}
								>
									<Input.Password
										id="form-password"
										placeholder="Mật khẩu"
										disabled={stateSignIn.isLoading || undefined}
										className="defaultInput"
										type="password"
									/>
								</Form.Item>
								<Form.Item
									style={{ width: "calc(50% - 4px)", margin: "0 0 20px 0" }}
									name="ward_id"
									label="Phường/xã"
									rules={[
										{
											required: true,
											message: "Vui lòng chọn phường/xã"
										}
									]}
								>
									<Select
										showSearch
										filterOption={(input: any, option: any) =>
											removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
										}
										options={wards}
										placeholder="Tất cả"
										className="defaultSelect"
									/>
								</Form.Item>
								<Form.Item
									style={{ width: "calc(50% - 4px)", margin: "0 0 20px 0" }}
									name="confirm"
									label="Nhập lại mật khẩu:"
									dependencies={["password"]}
									rules={[
										{
											required: true,
											message: "Vui lòng nhập password!"
										},
										({ getFieldValue }) => ({
											validator(_, value) {
												if (!value || getFieldValue("password") === value) {
													return Promise.resolve();
												}
												return Promise.reject(new Error("Nhập lại mật khẩu không khớp!"));
											}
										})
									]}
								>
									<Input.Password placeholder="Nhập lại mật khẩu" className="defaultInput" />
								</Form.Item>

								<div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
									<button
										form="formLogin"
										type="submit"
										style={{
											background: colors.primary_color_1_1,
											width: "60%",
											height: "33px",
											borderRadius: "5px",
											color: colors.neutral_color_1_2,
											fontWeight: "bold",
											cursor: "pointer"
										}}
									>
										Đăng ký
									</button>
								</div>
								<div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "8px" }}>
									<div onClick={() => setType(1)} className="defaultButton">
										Đăng nhập
									</div>
								</div>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										width: "100%",
										marginTop: "8px"
									}}
								>
									<div
										style={{
											marginRight: "8px",
											width: "30px",
											height: "1px",
											background: "rgb(190,195,199)"
										}}
									/>
									<div style={{ color: "rgb(160,165,169)" }}>hoặc đăng nhập với</div>
									<div
										style={{
											marginLeft: "8px",
											width: "30px",
											height: "1px",
											background: "rgb(190,195,199)"
										}}
									/>
								</div>
							</Form>
						) : (
							<div>
								<div
									style={{
										marginTop: "13px",
										display: "flex",
										justifyContent: "center",
										color: "rgb(1,21,40)",
										fontSize: "20px",
										fontWeight: "600"
									}}
								>
									Lấy lại mật khẩu
								</div>
								<Form
									layout="vertical"
									form={getPasswordForm}
									id="getPasswordForm"
									onFinish={submitGetPassword}
									onFinishFailed={onFinishFailed}
									style={{ display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "space-between" }}
								>
									<Form.Item
										style={{ width: "100%", margin: "0 0 20px 0" }}
										name="username"
										label="Email đăng ký:"
										rules={[
											{
												required: true,

												pattern: mailPattern,
												message: message.customer.inValidEmail
											}
										]}
									>
										<Input
											className="defaultInput"
											id="form-username"
											type="phoneAndEmail"
											placeholder="Nhập email"
											disabled={stateSignIn.isLoading || undefined}
										/>
									</Form.Item>
								</Form>
								<div className="defaultButton" onClick={() => getPasswordForm.submit()}>
									Tiếp tục
								</div>
							</div>
						)}
						{/* <div className="googleLogin">
            <div onClick={() => login()} className="googleLogin__buttonGoogle">
              <SvgGoogleLogin />
              &nbsp; &nbsp;&nbsp;Sign in with Google
            </div>
          </div> */}
						{type !== 3 && (
							<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
								{/* <GoogleLogin
									clientId="1078820425477-bfod3v81p4h793tave67bmal6jd838c4.apps.googleusercontent.com"
									onSuccess={(e: any) => responseGoogle(e)}
									onFailure={(e: any) => responseGoogle(e)}
									cookiePolicy={"single_host_origin"}
									buttonText=""
									prompt="select_account"
									className="googleLogin__buttonGoogle"
								/> */}
								<SvgGoogleLogin
									onClick={() => login()}
									clientId="1078820425477-bfod3v81p4h793tave67bmal6jd838c4.apps.googleusercontent.com"
									style={{ transform: "scale(1.8)", margin: "4px 30px 0 0", cursor: "pointer" }}
								/>

								<FacebookLogin
									appId="5314215728692310"
									cssClass="googleLogin__buttonFacebook"
									fields="name,email,picture"
									scope="public_profile,email"
									returnScopes
									callback={(e: any) => e?.accessToken && responseFacebook(e)}
									icon={<SvgFacebookLogin />}
									textButton=""
								/>
							</div>
						)}
						{type === 1 && (
							<div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
								<div
									onClick={() => setType(2)}
									style={{
										color: "rgb(122,176,202)",
										textDecorationStyle: "solid",
										textDecorationColor: "rgb(122,176,202)",
										textDecorationLine: "underline",
										fontStyle: "italic",
										cursor: "pointer"
									}}
								>
									Đăng ký tài khoản!
								</div>
							</div>
						)}
					</div>
				</div>
			</Col>
		</Row>
	);

	/**************************** END **************************/
};

export default SignIn;
