import { Form, Input, InputNumber, Select, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyWarning } from "src/components/notification";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import TableStyledAntd from "src/components/table/TableStyled";
import { messageRequired } from "src/constants";
import message from "src/constants/message";
import { api } from "src/services/api/api.index";
import { API_URL, API_URL_MASTER } from "src/services/api/config";
import { convertToConsucutiveString2, phonePattern, removeSign } from "src/utils/helpers/functions/textUtils";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import { columnsData } from "./data";

const AddStore = ({
	features,
	form,
	status,
	setStatus,
	dataEdit,
	getNameCallback,
	setListStaffAdd,
	listStaffAdd
}: any) => {
	const dispatch = useDispatch();
	const [selectedProvince, setSelectedProvince] = useState<any>(undefined);
	const [selectedDistrict, setSelectedDistrict] = useState<any>(undefined);
	const [paramsFilterUsers, setParamsFilterUsers] = useState<any>({
		page: 1,
		limit: 5
	});
	const [selectedStaff, setSelectedStaff] = useState<any>(undefined);
	const [listStaff, setListStaff] = useState<any[]>([]);
	const [provinces, setProvinces] = useState<any[]>([]);
	const [districts, setDistricts] = useState<any[]>([]);
	const [wards, setWards] = useState<any[]>([]);
	useEffect(() => {
		if (dataEdit.province_id) {
			setSelectedProvince(dataEdit?.province_id);
		}
		if (dataEdit.district_id) {
			setSelectedDistrict(dataEdit?.district_id);
		}
	}, [dataEdit]);

	useEffect(() => {
		const getStaff = async () => {
			try {
				const response = (await api.get(`${API_URL}/user-systems`)) as any;
				let data = response;
				let fake = [];
				for (let i = 0; i < data?.data?.length; i++) {
					fake.push({
						...data?.data[i],
						value: data?.data[i]?.id,
						label: data?.data[i]?.fullname
					});
				}
				setListStaff(fake);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		getStaff();
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
						let wards = data?.data;
						let fakeWards = [];
						for (var i = 0; i < wards.length; i++) {
							fakeWards.push({
								label: wards[i]?.ward_name,
								value: wards[i]?.id
							});
						}
						setWards(fakeWards);
					}
				} catch (error) {}
			};

			getWards();
		}
	}, [selectedDistrict]);

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilterUsers({
			...paramsFilterUsers,

			page: page,
			limit: pageSize
		});
	};
	const changeStatus = (value: any, record: any) => {
		let fakeListStaffAdd = [...listStaffAdd];
		fakeListStaffAdd = fakeListStaffAdd.map((x: any) => (x.user_id === record.user_id ? { ...x, status: value } : x));
		setListStaffAdd(fakeListStaffAdd);
		// dispatch(updateOneStore(record.id, { ...record, status: value }));
	};

	const handleAddStaff = () => {
		if (!selectedStaff) {
			return notifyWarning("Vui lòng chọn nhân viên!");
		}
		let fake = [...listStaffAdd];
		let check = fake.find((x: any) => x.user_id === selectedStaff.id);
		if (check) {
			return notifyWarning("Đã tồn tại nhân viên này trong kho");
		}
		fake.push({ ...selectedStaff, user_id: selectedStaff.id, new: true });
		setSelectedStaff(undefined);
		setListStaffAdd(fake);
	};
	return (
		<>
			<Form.Item
				label="Mã kho"
				name="warehouse_code"
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
					disabled={dataEdit?.id}
					onChange={(e: any) => {
						if (e.target.value === "-") {
							form.setFieldValue("warehouse_code", "");
						} else {
							form.setFieldValue("warehouse_code", convertToConsucutiveString2(e.target.value).toUpperCase());
						}
					}}
				/>
			</Form.Item>
			<Form.Item
				label="Tên kho"
				name="warehouse_name"
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
			{/* <Form.Item label="Người liên hệ" name="contact_id" style={{ margin: "0 0 13px 0" }}>
				<Select options={listStaff} className="defaultSelect" />
			</Form.Item> */}
			<Form.Item
				style={{ margin: "0 0 13px 0" }}
				label="Số điện thoại"
				name="phone"
				rules={[{ required: true, pattern: phonePattern, message: message.customer.inValidPhone }]}
			>
				<Input className="defaultInput" />
			</Form.Item>
			<Form.Item name="stock_quantity" label="Tồn kho" style={{ margin: "0 0 13px 0" }}>
				<InputNumber
					disabled
					className="defaultInputNumber"
					formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
					parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
					min={0}
				/>
			</Form.Item>
			<Form.Item
				style={{ margin: "0 0 13px 0" }}
				label="Tỉnh/ thành phố"
				name="province_id"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
			>
				<Select
					className="defaultSelect"
					options={provinces}
					showSearch
					filterOption={(input: any, option: any) =>
						removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
					}
					onChange={(e: any) => {
						setSelectedProvince(e);
						setWards([]);
						form.setFieldsValue({
							district_id: undefined,
							ward_id: undefined
						});
						getNameCallback(provinces.find((x: any) => x.value == e)?.label, 1);
					}}
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
					className="defaultSelect"
					options={districts}
					showSearch
					filterOption={(input: any, option: any) =>
						removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
					}
					onChange={(e: any) => {
						setSelectedDistrict(e);
						form.setFieldsValue({
							ward_id: undefined
						});
						getNameCallback(districts.find((x: any) => x.value == e).label, 2);
					}}
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
					showSearch
					filterOption={(input: any, option: any) =>
						removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
					}
					className="defaultSelect"
					options={wards}
					onChange={(e: any) => getNameCallback(wards.find((x: any) => x.value === e).label, 3)}
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
				label="Kinh độ"
				name="longitude"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<InputNumber className="defaultInputNumber" />
			</Form.Item>
			<Form.Item
				label="Vĩ độ"
				name="latitude"
				rules={[
					{
						required: true,
						message: messageRequired
					}
				]}
				style={{ margin: "0 0 13px 0" }}
			>
				<InputNumber className="defaultInputNumber" />
			</Form.Item>
			<Form.Item style={{ margin: "0 0 13px 0" }}></Form.Item> <Form.Item style={{ margin: "0 0 13px 0" }}></Form.Item>
			<h4 style={{ width: "100%" }}>Nhân viên kho</h4>
			<div style={{ width: "100%", display: "flex", alignItems: "center" }}>
				<Select
					showSearch
					filterOption={(input: any, option: any) =>
						removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
					}
					className="defaultSelect"
					placeholder="Chọn nhân viên"
					options={listStaff}
					style={{ width: "calc(25% - 8px)", marginRight: "8px" }}
					onChange={(e: any) => setSelectedStaff(listStaff.find((x: any) => x.value === e))}
				/>

				<div className="defaultButton" onClick={() => handleAddStaff()}>
					<SvgIconPlus style={{ transform: "scale(0.7)" }} />
					&nbsp;Thêm
				</div>
			</div>
			<TableStyledAntd
				style={{ width: "100%", marginTop: "13px" }}
				rowKey="user_id"
				dataSource={listStaffAdd}
				pagination={false}
				bordered
				columns={columnsData({ changeStatus }) as any}
				widthCol1="50px"
				widthCol6="100px"
			/>
			<PanigationAntStyled
				style={{ marginTop: "8px" }}
				current={paramsFilterUsers.page}
				pageSize={paramsFilterUsers.limit}
				showSizeChanger
				onChange={onChangePaging}
				showTotal={() => `Tổng ${listStaffAdd?.length} nhân viên `}
				total={listStaffAdd?.length}
			/>
			<div className="formAddStore__footer" style={{ height: "40px", marginTop: "13px" }}>
				<div className="formAddStore__footer__status">
					Trạng thái:&nbsp;&nbsp;{" "}
					<Form.Item label="&nbsp;" name="status">
						<Switch checked={status} onChange={(e: any) => setStatus(e)} />
					</Form.Item>
				</div>
				{features.includes("MODULE_PRODUCTS__STORES__UPDATE") && (
					<div className="defaultButton" onClick={() => form.submit()}>
						<SvgIconStorage style={{ transform: "scale(0.7)" }} />
						&nbsp;Lưu
					</div>
				)}
			</div>
		</>
	);
};

export default AddStore;
