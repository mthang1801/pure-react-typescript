import { Form, Input, Select, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { messageRequired } from "src/constants";
import message from "src/constants/message";
import { API_URL, API_URL_MASTER } from "src/services/api/config";
import {
	convertToConsucutiveString2,
	convertToOnlyNumber,
	isValidPassword,
	isVietnamesePhoneNumber,
	mailPattern,
	phonePattern,
	removeSign,
	validateEmail
} from "src/utils/helpers/functions/textUtils";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
const AddSupplier = ({ form, status, setStatus, dataEdit, features }: any) => {
	const [selectedProvince, setSelectedProvince] = useState<any>(undefined);
	const [selectedDistrict, setSelectedDistrict] = useState<any>(undefined);
	const [branchs, setBranchs] = useState<any[]>([]);
	const [selectedBank, setSelectedBank] = useState<any>(undefined);
	const [provinces, setProvinces] = useState<any[]>([]);
	const [districts, setDistricts] = useState<any[]>([]);
	const [wards, setWards] = useState<any[]>([]);
	const [banks, setBanks] = useState<any[]>([]);
	const [payments, setPayments] = useState<any[]>([]);
	useEffect(() => {
		if (dataEdit.province_id) {
			setSelectedProvince(dataEdit?.province_id);
		}
		if (dataEdit.district_id) {
			setSelectedDistrict(dataEdit?.district_id);
		}
		if (dataEdit?.bank) {
			setSelectedBank(dataEdit?.bank?.id);
		}
	}, [dataEdit]);
	useEffect(() => {
		const getCities = async () => {
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
				const { data } = await axios.get(`${API_URL}/payment-methods`, {
					headers: headers
				});
				if (data) {
					let cities = data?.data;
					let fakeCities = [];
					for (var i = 0; i < cities.length; i++) {
						fakeCities.push({
							label: cities[i]?.payment_method,
							value: cities[i]?.id
						});
					}
					setPayments(fakeCities);
				}
			} catch (error) {}
		};
		getCities();
	}, []);

	useEffect(() => {
		const getCities = async () => {
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
				const { data } = await axios.get(`${API_URL}/banks`, {
					headers: headers
				});
				if (data) {
					let cities = data?.data;
					let fakeCities = [];
					for (var i = 0; i < cities.length; i++) {
						fakeCities.push({
							...cities[i],
							label: cities[i]?.bank_name,
							value: cities[i]?.id
						});
					}
					setBanks(fakeCities);
				}
			} catch (error) {}
		};
		getCities();
	}, []);

	useEffect(() => {
		const getCities = async () => {
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
				console.log(banks, selectedBank);
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
		if (selectedBank) {
			getCities();
		}
	}, [selectedBank, banks]);

	useEffect(() => {
		const getCities = async () => {
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
				const { data } = await axios.get(`${API_URL}/provinces`, {
					headers: headers
				});
				if (data) {
					let cities = data?.data;
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
			const getProvinces = async () => {
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
					const { data } = await axios.get(`${API_URL}/districts?province_id=${selectedProvince}`, {
						headers: headers
					});
					if (data) {
						console.log(data);
						let districts = data?.data;
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

			getProvinces();
		}
	}, [selectedProvince]);
	//ward
	useEffect(() => {
		if (selectedDistrict) {
			const getWards = async () => {
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
					const { data } = await axios.get(`${API_URL}/wards?district_id=${selectedDistrict}`, {
						headers: headers
					});
					if (data) {
						let fakeWards = [];
						for (var i = 0; i < data?.data?.length; i++) {
							fakeWards.push({
								label: data?.data[i]?.ward_name,
								value: data?.data[i]?.id
							});
						}
						setWards(fakeWards);
					}
				} catch (error) {}
			};

			getWards();
		}
	}, [selectedDistrict]);
	return (
		<>
			<Form.Item
				label="Mã nhà cung cấp"
				name="supplier_code"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Input
					disabled={dataEdit?.id}
					className="defaultInput"
					onChange={(e: any) => {
						if (e.target.value === "-") {
							form.setFieldValue("supplier_code", "");
						} else {
							form.setFieldValue("supplier_code", convertToConsucutiveString2(e.target.value).toUpperCase());
						}
					}}
				/>
			</Form.Item>
			<Form.Item
				label="Tên nhà cung cấp"
				name="supplier_name"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Input className="defaultInput" />
			</Form.Item>
			<Form.Item
				label="Số điện thoại"
				name="phone"
				rules={[{ required: true, pattern: phonePattern, message: message.customer.inValidPhone }]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Input className="defaultInput" />
			</Form.Item>
			<Form.Item
				label="Email"
				name="email"
				rules={[
					() => ({
						validator(_: any, value: any) {
							if (!value || (value && validateEmail(value))) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("Sai định dạng email"));
						}
					})
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Input className="defaultInput" />
			</Form.Item>
			<Form.Item
				label="Tỉnh/ thành phố"
				name="province_id"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Select
					showSearch
					filterOption={(input: any, option: any) =>
						removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
					}
					options={provinces}
					onChange={(e: any) => {
						setSelectedProvince(e);
						setWards([]);
						form.setFieldsValue({
							district_id: undefined,
							ward_id: undefined
						});
					}}
					className="defaultSelect"
				/>
			</Form.Item>
			<Form.Item
				label="Quận/ huyện"
				name="district_id"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Select
					options={districts}
					onChange={(e: any) => {
						setSelectedDistrict(e);
						form.setFieldsValue({
							ward_id: undefined
						});
					}}
					className="defaultSelect"
					showSearch
					filterOption={(input: any, option: any) =>
						removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
					}
				/>
			</Form.Item>
			<Form.Item
				label="Phường/ xã"
				name="ward_id"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Select
					options={wards}
					className="defaultSelect"
					showSearch
					filterOption={(input: any, option: any) =>
						removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
					}
				/>
			</Form.Item>
			<Form.Item
				label="Địa chỉ"
				name="address"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Input className="defaultInput" />
			</Form.Item>
			<Form.Item
				label="Mã số thuế"
				name="tax_code"
				rules={[
					() => ({
						validator(_: any, value: any) {
							if (!value || convertToOnlyNumber(value)?.length === 0 || convertToOnlyNumber(value)?.length === 10) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("Vui lòng nhập 10 kí tự"));
						}
					})
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Input
					className="defaultInput"
					onChange={(e: any) => {
						form.setFieldValue("tax_code", convertToOnlyNumber(e.target.value));
					}}
				/>
			</Form.Item>
			<Form.Item
				label="Số fax"
				name="fax"
				style={{ margin: "0 0 13px 0" }}
				rules={[
					() => ({
						validator(_: any, value: any) {
							if (!value) {
								return Promise.resolve();
							}
							if (value && isVietnamesePhoneNumber(value)) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("Sai định dạng số Fax"));
						}
					})
				]}
			>
				<Input className="defaultInput" />
			</Form.Item>
			<Form.Item label="Website" name="website" style={{ margin: "0 0 13px 0" }}>
				<Input className="defaultInput" />
			</Form.Item>
			<Form.Item
				label="Hình thức thanh toán"
				name="payment_method_id"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Select options={payments} className="defaultSelect" />
			</Form.Item>
			<Form.Item
				label="Số tài khoản"
				name="account_number"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Input
					className="defaultInput"
					onChange={(e: any) => {
						form.setFieldValue("account_number", convertToOnlyNumber(e.target.value));
					}}
				/>
			</Form.Item>
			<Form.Item
				label="Chủ tài khoản"
				name="account_name"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Input className="defaultInput" />
			</Form.Item>
			<Form.Item
				label="Ngân hàng"
				name="bank_id"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<Select
					showSearch
					filterOption={(input: any, option: any) =>
						removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
					}
					options={banks}
					className="defaultSelect"
					onChange={(e: any) => {
						setSelectedBank(e);
						form.setFieldsValue({
							bank_branch_id: undefined
						});
					}}
				/>
			</Form.Item>
			<Form.Item name="bank_branch_id" label="Chi nhánh" style={{ margin: "0 0 13px 0" }}>
				<Select
					showSearch
					filterOption={(input: any, option: any) =>
						removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
					}
					options={branchs}
					className="defaultSelect"
				/>
			</Form.Item>
			<div className="formAddSupplier__footer" style={{ height: "40px" }}>
				<div className="formAddSupplier__footer__status">
					Trạng thái:&nbsp;&nbsp;{" "}
					<Form.Item label="&nbsp;" name="status">
						<Switch checked={status} onChange={(e: any) => setStatus(e)} />
					</Form.Item>
				</div>
				{features.includes("MODULE_PRODUCTS__SUPPLIER__UPDATE") && (
					<div className="defaultButton" onClick={() => form.submit()}>
						<SvgIconStorage style={{ transform: "scale(0.7)" }} />
						&nbsp;Lưu
					</div>
				)}
			</div>
		</>
	);
};

export default AddSupplier;
