import { DatePicker, Form, Input, Select } from "antd";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { customerTypesList, gendersList } from "src/constants";
import { CustomerTypeEnum, UserGenderEnum } from "src/constants/enum";
import message from "src/constants/message";
import { dateFormatDMY } from "src/utils/helpers/functions/date";
import { mailPattern, phonePattern } from "src/utils/helpers/functions/textUtils";
import { Container } from "../styles/CreateCustomer.styles";

const EditCustomerInfo = ({ customer, form }: any) => {
	return (
		<div>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<h4>Thông tin khách hàng </h4>{" "}
				<button className="defaultButton bg-black" type="submit" form="customerForm">
					<SvgIconStorage style={{ transform: "scale(0.7)" }} />
					&nbsp; Lưu
				</button>
			</div>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
				<Form.Item
					style={{ width: "calc((100% - 24px) /4)", margin: "0 0 13px 0" }}
					name="customer_code"
					label="Mã khách hàng"
				>
					<Input className="defaultInput" disabled />
				</Form.Item>
				<Form.Item
					style={{ width: "calc((100% - 24px) /4)", margin: "0 0 13px 0" }}
					name="fullname"
					label="Họ tên"
					rules={[{ required: true, message: message.customer.fullnameNotEmpty }]}
				>
					<Input placeholder="Nhập họ tên" className="defaultInput" />
				</Form.Item>
				<Form.Item
					style={{ width: "calc((100% - 24px) /4)", margin: "0 0 13px 0" }}
					name="phone"
					label="Số điện thoại"
					rules={[{ required: true, pattern: phonePattern, message: message.customer.inValidPhone }]}
				>
					<Input placeholder="Nhập Số điện thoại" required className="defaultInput" />
				</Form.Item>
				<Form.Item
					style={{ width: "calc((100% - 24px) /4)", margin: "0 0 13px 0" }}
					name="email"
					label="Email"
					rules={[
						{
							required: true,
							type: "regexp",
							pattern: mailPattern,
							message: message.customer.inValidEmail
						}
					]}
				>
					<Input placeholder="Nhập Email" required className="defaultInput" />
				</Form.Item>
				<Form.Item
					name="customer_type"
					label="Loại khách hàng"
					className=""
					style={{ width: "calc((100% - 24px) /4)", margin: "0 0 13px 0" }}
				>
					<Select
						options={customerTypesList}
						defaultValue={CustomerTypeEnum["Khách thường"]}
						placeholder="Loại khách hàng"
						className="defaultSelect"
					/>
				</Form.Item>
				<Form.Item
					name="gender"
					label="Giới tính"
					className=""
					style={{ width: "calc((100% - 24px) /4)", margin: "0 0 13px 0" }}
				>
					<Select
						options={[
							{ label: "Nam", value: "Male" },
							{ label: "Nữ", value: "Female" },
							{ label: "Khác", value: "Others" }
						]}
						className="defaultSelect"
						placeholder="Chọn giới tính"
					/>
				</Form.Item>
				<Form.Item
					name="date_of_birth"
					label="Ngày sinh"
					className=""
					style={{ width: "calc((100% - 24px) /4)", margin: "0 0 13px 0" }}
				>
					<DatePicker format={dateFormatDMY} placeholder="Nhập Ngày sinh" className="defaultInput" />
				</Form.Item>
				<div style={{ width: "calc((100% - 24px) /4)", margin: "0 0 13px 0" }} />
			</div>
		</div>
	);
};

export default EditCustomerInfo;
