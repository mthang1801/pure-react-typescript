import { Checkbox, Form, Input, Modal, Radio, Select, Space } from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import Map from "src/assets/images/ggMap.png";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { CustomerAddressTypesEnum } from "src/constants/enum";
import message from "src/constants/message";
import { getDistricts, getProvinces } from "src/services/api/locators";
import { getWards } from "../../../services/api/locators";
import { geneUniqueKey, phonePattern, removeSign } from "../../../utils/helpers/functions/textUtils";
import { AddressType, Container, Wrapper } from "../styles/CreateCustomer.styles";

const TransportModal = ({
	visible,
	onCancel,
	transportFormsList,
	onSave,
	currentTransportForm,
	setCurrentTransportForm
}: any) => {
	const [form] = Form.useForm();
	const [provincesList, setProvincesList] = useState<any[]>([]);
	const [districtsList, setDistrictsList] = useState<any[]>([]);
	const [wardsList, setWardsList] = useState<any[]>([]);
	const [selectedProvince, setSelectedProvince] = useState<any>(null);
	const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
	const [selectedWard, setSelectedWard] = useState<any>(null);
	const [isInit, setIsInit] = useState<boolean>(true);
	const onChangeForm = () => {
		const values: any = form.getFieldsValue();
		values.default = currentTransportForm ? currentTransportForm.default : !transportFormsList.length;
		setCurrentTransportForm({ ...currentTransportForm, ...values });
	};

	const onChangeAddressType = (e: any) => {
		const values: any = form.getFieldsValue();
		const address_type = e.target.value;
		values.default = currentTransportForm ? currentTransportForm.default : !transportFormsList.length;
		setCurrentTransportForm({ ...values, address_type });
	};

	useEffect(() => {
		getProvinces().then((res) => {
			setProvincesList(res);
		});
	}, []);

	useEffect(() => {
		if (!visible) {
			setWardsList([]);
			setDistrictsList([]);
			setSelectedProvince(null);
			setSelectedDistrict(null);
			setSelectedWard(null);
			form.resetFields();
			setIsInit(true);
		}
	}, [visible]);

	useEffect(() => {
		if (currentTransportForm) {
			form.setFieldsValue(currentTransportForm);
			console.log("12345", form.getFieldsValue());
			setSelectedProvince(currentTransportForm?.province_id);
			setSelectedDistrict(currentTransportForm?.district_id);
			setSelectedWard(currentTransportForm?.ward_id);
		}
	}, [currentTransportForm]);

	useEffect(() => {
		if (selectedProvince) {
			getDistricts({ province_id: selectedProvince }).then((res) => setDistrictsList(res));
		}
	}, [selectedProvince]);

	useEffect(() => {
		if (selectedDistrict) {
			getWards({ district_id: selectedDistrict }).then((res) => setWardsList(res));
		}
	}, [selectedDistrict]);

	const handleCancel = () => {
		form.resetFields();
		setIsInit(false);
		onCancel();
	};

	const handleOnSave = () => {
		const values: any = {
			...currentTransportForm,
			...form.getFieldsValue(),
			id: currentTransportForm.id || geneUniqueKey()
		};

		form.resetFields();

		onSave(values);
	};

	const getProvincesListByQuery = (q?: any) => {
		return new Promise((resolve, reject) => {
			getProvinces({ q })
				.then((res) => setProvincesList(res.data))
				.finally(() => resolve(true));
		});
	};
	const getDistrictsListByQuery = (q?: any, province_id?: number) => {
		return new Promise((resolve, reject) => {
			getDistricts({ q, province_id: province_id || selectedProvince })
				.then((res) => {
					console.log(res);
					setDistrictsList(res.data);
				})
				.finally(() => resolve(true));
		});
	};
	const getWardsListByQuery = (q?: any, district_id?: number) => {
		return new Promise((resolve, reject) => {
			getWards({ q, district_id: district_id || selectedDistrict })
				.then((res) => setWardsList(res.data))
				.finally(() => resolve(true));
		});
	};

	const provincesOptions = provincesList?.length
		? provincesList.map((province: any) => (
				<Select.Option key={`province-${province.id}`} value={province.id}>
					{province.province_name}
				</Select.Option>
		  ))
		: [];

	const districtsOptions = districtsList?.map((district: any) => (
		<Select.Option key={`district-${district.id}`} value={district.id}>
			{district.district_name}
		</Select.Option>
	));

	const wardsOptions = wardsList?.map((ward: any) => (
		<Select.Option key={`ward-${ward.id}`} value={ward.id}>
			{ward.ward_name}
		</Select.Option>
	));

	const onSelectProvince = (value: any) => {
		setSelectedProvince(value);
		form.setFieldValue("province_name", provincesList.find((province) => province.id === value).province_name);
		setDistrictsList([]);
		setWardsList([]);
		setSelectedDistrict(null);
		setSelectedWard(null);

		form.setFieldValue("district_name", null);
		form.setFieldValue("ward_name", null);
		form.setFieldValue("district_id", null);
		form.setFieldValue("ward_id", null);
	};

	const onSelectDistrict = (value: any) => {
		setWardsList([]);
		setSelectedWard(null);

		form.setFieldValue("ward_name", null);
		form.setFieldValue("ward_id", null);
		setSelectedDistrict(value);
		form.setFieldValue("district_name", districtsList.find((district) => district.id === value).district_name);
	};

	const onSelectWard = (value: any) => {
		setSelectedWard(value);
		form.setFieldValue("ward_name", wardsList.find((ward) => ward.id === value).ward_name);
	};

	return (
		<Modal footer={null} title="Thông tin giao hàng" visible={visible} onCancel={handleCancel} width={700}>
			<Container>
				<Form
					form={form}
					onFinish={handleOnSave}
					initialValues={{
						address_type: CustomerAddressTypesEnum["Nhà riêng"]
					}}
				>
					<Form.Item name="province_name" className="hidden">
						<Input type="hidden" />
					</Form.Item>
					<Form.Item name="district_name" className="hidden">
						<Input type="hidden" />
					</Form.Item>
					<Form.Item name="ward_name" className="hidden">
						<Input type="hidden" />
					</Form.Item>
					<Wrapper>
						<Form.Item name="id" style={{ display: "none" }}></Form.Item>
						<div className="row">
							<Form.Item
								name="fullname"
								label="Họ tên"
								rules={[{ required: true, message: message.customer.fullnameNotEmpty }]}
								className="item"
							>
								<Input placeholder="Nhập họ tên" className="defaultInput" onChange={onChangeForm} />
							</Form.Item>
							<Form.Item
								name="phone"
								label="Số điện thoại"
								rules={[
									{ required: true, type: "regexp", pattern: phonePattern, message: message.customer.inValidPhone }
								]}
								className="item"
							>
								<Input placeholder="Nhập số điện thoại" className="defaultInput" onChange={onChangeForm} />
							</Form.Item>
						</div>
						<div className="row">
							<Form.Item
								name="province_id"
								label="Tỉnh/thành phố"
								rules={[{ required: true, message: message.customer.provinceNotEmpty }]}
								className="item"
							>
								<Select
									showSearch
									placeholder="Chọn tỉnh/ thành phố"
									className="defaultSelect"
									notFoundContent={null}
									optionFilterProp="children"
									filterOption={(input: any, option: any) =>
										option?.children?.toLowerCase()?.includes(input.toLowerCase())
									}
									value={selectedProvince}
									defaultActiveFirstOption={false}
									onChange={onSelectProvince}
								>
									{provincesOptions}
								</Select>
							</Form.Item>
							<Form.Item
								name="district_id"
								label="Quận/huyện"
								rules={[{ required: true, message: message.customer.districtNotEmpty }]}
								required
								className="item"
							>
								<Select
									placeholder="Chọn quận huyện"
									className="defaultSelect"
									notFoundContent={null}
									showSearch
									filterOption={(input: any, option: any) =>
										option?.children?.toLowerCase()?.includes(input.toLowerCase())
									}
									value={selectedDistrict}
									defaultActiveFirstOption={false}
									onChange={onSelectDistrict}
								>
									{districtsOptions}
								</Select>
							</Form.Item>
						</div>
						<div className="row">
							<Form.Item
								name="ward_id"
								label="Phường/xã"
								rules={[{ required: true, message: message.customer.wardNotEmpty }]}
								className="item"
							>
								<Select
									showSearch
									placeholder="Chọn phường xã"
									className="defaultSelect"
									notFoundContent={null}
									filterOption={(input: any, option: any) =>
										option?.children?.toLowerCase()?.includes(input.toLowerCase())
									}
									value={selectedWard}
									defaultActiveFirstOption={false}
									onChange={onSelectWard}
								>
									{wardsOptions}
								</Select>
							</Form.Item>
							<Form.Item
								name="address"
								label="Địa chỉ"
								rules={[{ required: true, message: message.customer.addressNotEmpty }]}
								className="item"
							>
								<Input placeholder="Nhập địa chỉ" className="defaultInput" onChange={onChangeForm} />
							</Form.Item>
						</div>
						<div className="row" style={{ marginTop: "12px" }}>
							<div style={{ width: "100%", overflow: "hidden", border: "1px solid #BFC4C9", borderRadius: "5px" }}>
								<img src={Map} alt="map" style={{ width: "100%" }} />
							</div>
						</div>
						<AddressType>
							<Form.Item name="address_type" label="Loại địa chỉ" style={{ marginTop: "10px" }}>
								<Radio.Group style={{ marginTop: 0 }} defaultValue={CustomerAddressTypesEnum["Nhà riêng"]}>
									<Space direction="horizontal">
										{Object.entries(CustomerAddressTypesEnum).map(([key, val]) => (
											<Radio key={key} value={val} onChange={onChangeAddressType}>
												{key}
											</Radio>
										))}
									</Space>
								</Radio.Group>
							</Form.Item>
						</AddressType>
						<Checkbox
							checked={currentTransportForm ? currentTransportForm.default : !transportFormsList?.length}
							onChange={() => {
								setCurrentTransportForm((prevState: any) => ({ ...prevState, default: true }));
							}}
						>
							Địa chỉ mặc định
						</Checkbox>
						<div style={{ marginTop: "10px", marginLeft: "auto", display: "flex", justifyContent: "flex-end" }}>
							<button
								className="defaultButton bg-black"
								style={{ width: "130px", padding: "7.5px 20px", height: "37px" }}
								type="submit"
							>
								<SvgIconStorage style={{ transform: "scale(0.7)" }} />
								&nbsp; Lưu
							</button>
						</div>
					</Wrapper>
				</Form>
			</Container>
		</Modal>
	);
};

export default TransportModal;
