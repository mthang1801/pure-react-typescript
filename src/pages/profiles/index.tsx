import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import SvgIconExportFile from "src/assets/svg/SvgIconExportFile";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SvgUploadImageBlock from "src/assets/svg/SvgUploadImageBlock";
import { notifyError, notifySuccess } from "src/components/notification";
import { api } from "src/services/api/api.index";
import { API_END_POINT, API_URL, API_URL_CDN } from "src/services/api/config";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { convertToOnlyNumber, isValidPassword } from "src/utils/helpers/functions/textUtils";
import { removeSign } from "src/utils/helpers/functions/textUtils";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";

const ProfileUser = () => {
	const [infoForm] = Form.useForm();
	const [passwordForm] = Form.useForm();

	const [selectedProvince, setSelectedProvince] = useState<any>(undefined);
	const [selectedDistrict, setSelectedDistrict] = useState<any>(undefined);
	const [selectedBank, setSelectedBank] = useState<any>(undefined);
	const [provinces, setProvinces] = useState<any[]>([]);
	const [districts, setDistricts] = useState<any[]>([]);
	const [wards, setWards] = useState<any[]>([]);
	const [banks, setBanks] = useState<any[]>([]);
	const [loadingUpload, setLoadingUpload] = useState(false);
	const [overplay, setOverplay] = useState(false);
	const [visible, setVisible] = useState(false);
	const [modalPassword, setModalPassword] = useState(false);
	const [branchs, setBranchs] = useState<any[]>([]);
	const [metaImage, setMetaImage] = useState<any>("");
	useEffect(() => {
		const getShipping = async () => {
			try {
				const response = (await api.get(`${API_URL}/user-profiles`)) as any;
				let data = response?.data;
				infoForm.setFieldsValue({
					...data,
					role: data?.userRole?.role?.role_name,
					date_of_birth: data?.date_of_birth ? moment(data?.date_of_birth, "YYYY-MM-DD") : undefined
				});
				setMetaImage(data?.avatar);
				setSelectedProvince(data?.province_id);
				setSelectedDistrict(data?.district_id);
				setSelectedBank(data?.bank_id);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		getShipping();
	}, []);

	useEffect(() => {
		const getCities = async () => {
			console.log("selectedBank", selectedBank);
			try {
				let headers: any = {
					"Content-Type": "application/json,text/plain, */*"
				};
				let token = localGetToken();
				let uuid = localGetAuthUUID();
				if (token) {
					headers.Authorization = token;
					headers["x-auth-uuid"] = uuid;
				}
				const { data } = await axios.get(
					`${API_URL}/banks/branchs?bank_code=${banks.find((x: any) => selectedBank === x.id)?.bank_code}`,
					{
						headers: headers
					}
				);
				if (data) {
					let cities = data?.data;
					let fakeCities = [];
					for (var i = 0; i < cities.length; i++) {
						fakeCities.push({
							label: cities[i]?.branch_name,
							value: cities[i]?.id
						});
					}
					setBranchs(fakeCities);
				}
			} catch (error) {}
		};
		if (selectedBank && banks.length > 0) {
			getCities();
		}
	}, [selectedBank, banks]);

	useEffect(() => {
		const getCities = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/banks`, params)) as any;
				let data = response?.data;
				if (data) {
					let banks = data;
					let fakeBanks = [];
					for (var i = 0; i < banks.length; i++) {
						fakeBanks.push({
							...banks[i],
							label: banks[i]?.bank_name,
							value: banks[i]?.id
						});
					}
					setBanks(fakeBanks);
				}
			} catch (error) {}
		};
		getCities();
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

	const submitEditProfile = async (values: any) => {
		let params = {
			...values,
			avatar: metaImage,
			province_name: provinces.find((x: any) => x.value === values?.province_id)?.label,
			district_name: districts.find((x: any) => x.value === values?.district_id)?.label,
			ward_name: wards.find((x: any) => x.value === values?.ward_id)?.label
		};
		delete params.email;
		delete params.phone;
		delete params.role;

		try {
			const response = (await api.put(
				`${API_URL}/user-profiles
			`,
				params
			)) as any;
			const data = response;
			if (data.success) {
				notifySuccess("Cập nhập thông tin thành công");
				passwordForm.resetFields();
				setModalPassword(false);
			} else {
				notifyError(data.message);
			}
		} catch (error: any) {
			notifyError(error?.message + "");
		}
	};

	const pushImage = async (e: any) => {
		const files = e.target?.files[0];

		if (
			files &&
			(files.type === "image/png" ||
				files.type === "image/svg" ||
				files.type === "image/jpeg" ||
				files.type === "image/jpg" ||
				files.type === "image/gif" ||
				files.type === "image/ico")
		) {
			const bodyFormData = new FormData();
			bodyFormData.append("files", files);
			setLoadingUpload(true);

			try {
				const { data } = await axios.post(`${API_END_POINT}uploads`, bodyFormData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				});

				setMetaImage && setMetaImage(data?.data[0]);
				setLoadingUpload(false);
			} catch (error) {
				setLoadingUpload(false);
				let msg = getMessageV1(`Lỗi ${error}`);
				return notifyError(msg);
			}
		} else {
			let msg = getMessageV1("Vui lòng chọn đúng file ảnh jpg / jpeg / png / svg / gif / ico", ", ");
			return notifyError(msg);
		}
	};

	const submitEditPassword = async (values: any) => {
		let mainParams = infoForm.getFieldsValue();
		delete mainParams.email;
		delete mainParams.phone;
		delete mainParams.role;
		let params = {
			...mainParams,
			avatar: metaImage,
			new_password: values?.passwordNew,
			current_password: values?.password,
			province_name: provinces.find((x: any) => x.value === mainParams?.province_id)?.label,
			district_name: districts.find((x: any) => x.value === mainParams?.district_id)?.label,
			ward_name: wards.find((x: any) => x.value === mainParams?.ward_id)?.label
		};

		try {
			const response = (await api.put(
				`${API_URL}/user-profiles
			`,
				params
			)) as any;
			const data = response;
			if (data) {
				if (data.success) {
					notifySuccess("Cập nhập thông tin thành công");
					passwordForm.resetFields();
					setModalPassword(false);
				} else {
					notifyError(data.message);
				}
			}
		} catch (error: any) {
			notifyError(error?.message + "");
		}
	};
	return (
		<div className="mainPages">
			<Modal
				width={700}
				visible={modalPassword}
				title="Cập nhật mật khẩu"
				footer={null}
				onCancel={() => setModalPassword(false)}
			>
				<Form
					form={passwordForm}
					id="passwordForm"
					onFinish={submitEditPassword}
					style={{ justifyContent: "space-between", display: "flex", flexWrap: "wrap" }}
					layout="vertical"
				>
					<Form.Item
						rules={[
							() => ({
								validator(_: any, value: any) {
									if (value || value === "******") {
										return Promise.resolve();
									}
									return Promise.reject(new Error("Vui lòng nhập mật khẩu cũ"));
								}
							})
						]}
						style={{ width: "100%", margin: "0 0 13px 0" }}
						name="password"
						label="Mật khẩu cũ:"
					>
						<Input.Password id="form-password" placeholder="Mật khẩu" className="defaultInput" type="password" />
					</Form.Item>
					<Form.Item
						rules={[
							() => ({
								validator(_: any, value: any) {
									if (value === "******") {
										return Promise.resolve();
									}
									if (value !== "******" && isValidPassword(value)) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("Vui lòng nhập đúng định dạng password"));
								}
							})
						]}
						style={{ width: "100%", margin: "0 0 13px 0" }}
						name="passwordNew"
						label="Mật khẩu:"
					>
						<Input.Password id="form-password" placeholder="Mật khẩu" className="defaultInput" type="password" />
					</Form.Item>
					<Form.Item
						style={{ width: "100%", margin: "0 0 13px 0" }}
						name="confirm"
						label="Nhập lại mật khẩu:"
						dependencies={["password"]}
						rules={[
							{
								required: true,
								message: "Vui lòng nhập lại password!"
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("passwordNew") === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("Nhập lại mật khẩu không khớp!"));
								}
							})
						]}
					>
						<Input.Password placeholder="Nhập lại mật khẩu" className="defaultInput" />
					</Form.Item>
					<div className="center" style={{ width: "100%", marginTop: "8px", justifyContent: "flex-end" }}>
						<button type="submit" form="passwordForm" className="defaultButton">
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp; Lưu
						</button>
					</div>
				</Form>
			</Modal>
			<Form
				form={infoForm}
				id="infoForm"
				onFinish={submitEditProfile}
				style={{ justifyContent: "space-between", display: "flex" }}
				layout="vertical"
			>
				<div style={{ width: "calc(50% - 6.5px)" }}>
					<div
						style={{
							width: "100%",
							background: "#fff",
							borderRadius: "5px",
							padding: "16px",
							display: "flex",
							justifyContent: "space-between"
						}}
					>
						<div style={{ width: "160px" }} className="blockBannerImageProfiles">
							<div className="bannerImage-profiles">
								{loadingUpload ? (
									<Spin />
								) : metaImage ? (
									<div
										className="bannerImage-image"
										onMouseOver={() => setOverplay(true)}
										onMouseLeave={() => setOverplay(false)}
									>
										{overplay && (
											<div className="overplay">
												<div>
													<EyeOutlined
														onClick={() => {
															setVisible(true);
														}}
													/>
												</div>
												<div>
													<DeleteOutlined onClick={() => setMetaImage("")} />
												</div>
											</div>
										)}
										<img src={`${API_URL_CDN}${metaImage}`} alt="banner" />
									</div>
								) : (
									<>
										{" "}
										<SvgUploadImageBlock />
									</>
								)}
							</div>
							<label htmlFor="uploadImage" className="uploadImage">
								<SvgIconExportFile style={{ transform: "scale(0.8)" }} />
								&nbsp; Tải ảnh lên
							</label>
							<input type="file" id="uploadImage" onChange={(e) => pushImage(e)} style={{ display: "none" }} />
						</div>
						<div style={{ width: "calc(100% - 168px)" }}>
							<h4 style={{ margin: "0" }}>Thông tin chung</h4>
							<Form.Item name="fullname" label="Họ tên" style={{ margin: "0 0 13px 0" }}>
								<Input className="defaultInput" />
							</Form.Item>{" "}
							<Form.Item name="email" label="Email" style={{ margin: "0 0 13px 0" }}>
								<Input className="defaultInput" disabled />
							</Form.Item>{" "}
							<Form.Item name="role" label="Vai trò" style={{ margin: "0 0 13px 0" }}>
								<Input className="defaultInput" disabled />
							</Form.Item>{" "}
							<Form.Item name="phone" label="Số điện thoại" style={{ margin: "0 0 13px 0" }}>
								<Input className="defaultInput" disabled />
							</Form.Item>
							<Form.Item name="gender" label="Giới tính" style={{ margin: "0 0 13px 0" }}>
								<Select
									options={[
										{
											value: "Female",
											label: "Nữ"
										},
										{
											value: "Male",
											label: "Nam"
										},
										{
											value: "Others",
											label: "Khác"
										}
									]}
									className="defaultSelect"
								/>
							</Form.Item>
							<Form.Item name="date_of_birth" label="Ngày sinh" style={{ margin: "0 0 13px 0" }}>
								<DatePicker className="defaultDate" />
							</Form.Item>
							<div
								style={{
									display: "flex",
									justifyContent: "flex-end"
								}}
							>
								<div className="defaultButton" onClick={() => infoForm.submit()}>
									<SvgIconStorage style={{ transform: "scale(0.8)" }} />
									&nbsp;Cập nhật
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style={{ width: "calc(50% - 6.5px)" }}>
					<div style={{ width: "100%", background: "#fff", borderRadius: "5px", padding: "16px" }}>
						<h4 style={{ margin: "0" }}>Thông tin địa chỉ</h4>
						<Form.Item name="province_id" label="Tỉnh/thành" style={{ margin: "0 0 13px 0" }}>
							<Select
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
								options={provinces}
								className="defaultSelect"
								onChange={(e: any) => {
									infoForm.setFieldsValue({
										district_id: undefined,
										district_name: undefined,
										ward_id: undefined,
										ward_name: undefined
									});
									setSelectedDistrict(undefined);
									setSelectedProvince(e);
								}}
							/>
						</Form.Item>
						<Form.Item name="district_id" label="Quận/huyện" style={{ margin: "0 0 13px 0" }}>
							<Select
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
								options={districts}
								className="defaultSelect"
								onChange={(e: any) => {
									infoForm.setFieldsValue({
										ward_id: undefined,
										ward_name: undefined
									});
									setSelectedDistrict(e);
								}}
							/>
						</Form.Item>
						<Form.Item name="ward_id" label="Phường/xã" style={{ margin: "0 0 13px 0" }}>
							<Select
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
								options={wards}
								className="defaultSelect"
							/>
						</Form.Item>
						<Form.Item name="address" label="Địa chỉ" style={{ margin: "0 0 13px 0" }}>
							<Input className="defaultInput" />
						</Form.Item>
						<h4 style={{ margin: "0" }}>Thông tin ngân hàng</h4>
						<Form.Item name="account_name" label="Chủ tài khoản" style={{ margin: "0 0 13px 0" }}>
							<Input className="defaultInput" />
						</Form.Item>
						<Form.Item name="account_number" label="Số tài khoản" style={{ margin: "0 0 13px 0" }}>
							<Input
								className="defaultInput"
								onChange={(e: any) => {
									infoForm.setFieldValue("account_number", convertToOnlyNumber(e.target.value));
								}}
							/>
						</Form.Item>
						<Form.Item name="bank_id" label="Ngân hàng" style={{ margin: "0 0 13px 0" }}>
							<Select
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
								options={banks}
								className="defaultSelect"
								onChange={(e: any) => {
									infoForm.setFieldsValue({
										bank_branch_id: undefined
									});
									console.log(e, banks);
									setSelectedBank(e);
								}}
							/>
						</Form.Item>
						<Form.Item name="bank_branch_id" label="Chi nhánh" style={{ margin: "0 0 13px 0" }}>
							<Select
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
								options={branchs}
								className="defaultSelect"
							/>
						</Form.Item>
						<div className="searchButton" style={{ width: "120px" }} onClick={() => setModalPassword(true)}>
							Đổi mật khẩu
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default ProfileUser;
