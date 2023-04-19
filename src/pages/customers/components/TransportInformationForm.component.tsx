import { Checkbox, Form, Input, Select } from "antd";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import { districtsList, provincesList, wardsList } from "../list/data";

const TransportInformationForm = ({
	formNo,
	tranportForm,
	transportFormNo,
	setTransportFormNo,
	checkedTransportDefault,
	setCheckedTransportDefault,
	maxTransportFormNo
}: any) => {
	return (
		<Form form={tranportForm}>
			<div className="row">
				<Form.Item name="fullname" label="Họ và tên" className="item">
					<Input placeholder="Nhập họ và tên" />
				</Form.Item>
				<Form.Item name="email" label="Email" className="item">
					<Input placeholder="Nhập địa chỉ email" />
				</Form.Item>
				<Form.Item name="phone" label="Số điện thoại" className="item">
					<Input placeholder="Nhập số điện thoại" />
				</Form.Item>
			</div>

			<div className="row">
				<Form.Item name="province_id" label="Tỉnh, thành" className="item">
					<Select options={provincesList}></Select>
				</Form.Item>
				<Form.Item name="district_id" label="Quận, huyện" className="item">
					<Select options={districtsList}></Select>
				</Form.Item>
				<Form.Item name="ward_id" label="Phường, xã, ấp" className="item">
					<Select options={wardsList}></Select>
				</Form.Item>
			</div>

			<div className="row">
				<Form.Item name="address" label="Địa chỉ" style={{ width: "100%" }}>
					<Input placeholder="Nhập địa chỉ" />
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
						onClick={() => setTransportFormNo((prevState: number) => prevState + 1)}
					>
						<SvgIconPlus style={{ transform: "scale(0.7)" }} />
						&nbsp;Thêm địa chỉ
					</button>
				) : null}
			</div>
		</Form>
	);
};

export default TransportInformationForm;
