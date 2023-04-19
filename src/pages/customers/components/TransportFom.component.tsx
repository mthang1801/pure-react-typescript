import { Checkbox, Form, Input, Select } from "antd";
import { useEffect } from "react";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import { geneUniqueKey } from "src/utils/helpers/functions/textUtils";
import { districtsList, provincesList, wardsList } from "../list/data";

const TransportForm = ({
	formNo,
	transportFormsList,
	setTransportFormList,
	tranportForm,
	transportFormNo,
	setTransportFormNo,
	checkedTransportDefault,
	setCheckedTransportDefault,
	maxTransportFormNo,
	onRemoveForm
}: any) => {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({ ...tranportForm, id: tranportForm.id || geneUniqueKey() });
	}, [tranportForm]);

	const onChangeForm = () => {
		const values = form.getFieldsValue();
		setTransportFormList((prevForms: any[]) => {
			return prevForms.map((formItem: any, i: number) => {
				console.log(formItem);
				if (formNo === i + 1) {
					return { ...values };
				}
				return formItem;
			});
		});
	};

	const onAddMoreTransport = () => {
		setTransportFormNo((prevState: number) => prevState + 1);
		setTransportFormList((prevForms: any[]) => [...prevForms, {}]);
	};
	return (
		<Form form={form}>
			<Form.Item name="id">
				<Input type="hidden" />
			</Form.Item>
			<div className="row">
				<Form.Item name="fullname" label="Họ và tên" className="item">
					<Input placeholder="Nhập họ và tên" onChange={onChangeForm} />
				</Form.Item>
				<Form.Item name="email" label="Email" className="item">
					<Input placeholder="Nhập địa chỉ email" onChange={onChangeForm} />
				</Form.Item>
				<Form.Item name="phone" label="Số điện thoại" className="item">
					<Input placeholder="Nhập số điện thoại" onChange={onChangeForm} />
				</Form.Item>
			</div>

			<div className="row">
				<Form.Item name="province_id" label="Tỉnh, thành" className="item">
					<Select options={provincesList} onChange={onChangeForm}></Select>
				</Form.Item>
				<Form.Item name="district_id" label="Quận, huyện" className="item">
					<Select options={districtsList} onChange={onChangeForm}></Select>
				</Form.Item>
				<Form.Item name="ward_id" label="Phường, xã, ấp" className="item">
					<Select options={wardsList} onChange={onChangeForm}></Select>
				</Form.Item>
			</div>

			<div className="row">
				<Form.Item name="address" label="Địa chỉ" style={{ width: "100%" }}>
					<Input placeholder="Nhập địa chỉ" onChange={onChangeForm} />
				</Form.Item>
			</div>

			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Checkbox
					checked={checkedTransportDefault}
					onChange={() => {
						setCheckedTransportDefault(formNo);
					}}
				>
					Địa chỉ mặc định
				</Checkbox>
				{transportFormNo === formNo && transportFormNo < maxTransportFormNo ? (
					<button
						className="defaultButton"
						style={{ width: "180px", height: "37px", marginLeft: "auto" }}
						onClick={onAddMoreTransport}
					>
						<SvgIconPlus style={{ transform: "scale(0.7)" }} />
						&nbsp;Thêm địa chỉ
					</button>
				) : null}
			</div>
		</Form>
	);
};

export default TransportForm;
