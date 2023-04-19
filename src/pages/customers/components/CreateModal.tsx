import { CheckCircleFilled, DeleteFilled, PlusCircleOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import SvgEdit from "src/assets/svg/SvgEdit";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { customerTypesList, gendersList } from "src/constants";
import { CustomerTypeEnum, UserGenderEnum } from "src/constants/enum";
import message from "src/constants/message";
import { dateFormatDMY } from "src/utils/helpers/functions/date";
import { joinIntoAddress, mailPattern } from "src/utils/helpers/functions/textUtils";
import { phonePattern } from "../../../utils/helpers/functions/textUtils";
import { Card } from "../styles/Card.style";
import { ButtonAddress, Container, Title, Wrapper } from "../styles/CreateCustomer.styles";
const CreateModal = ({
	visible,
	onCancel,
	setOpenTransportModal,
	transportFormsList,
	form,
	onRemoveTransportItem,
	onEditTransportItem,
	onSave,
	setIsEdit
}: any) => {
	const handleCancel = () => {
		form.resetFields();
		onCancel();
	};

	const handleOpenTransportModal = () => {
		setIsEdit(false);
		setOpenTransportModal(true);
	};

	return (
		<Modal
			centered
			footer={null}
			title="Tạo khách hàng"
			visible={visible}
			onCancel={handleCancel}
			width={700}
			style={{ fontSize: 20 }}
		>
			<Container style={{ marginTop: -13 }}>
				<Form form={form} onFinish={onSave}>
					<Wrapper>
						<div className="row">
							<Form.Item
								name="fullname"
								label="Họ tên"
								rules={[{ required: true, message: message.customer.fullnameNotEmpty }]}
								className="item"
							>
								<Input placeholder="Nhập họ tên" className="defaultInput" />
							</Form.Item>
							<Form.Item name="customer_type" label="Loại khách hàng" className="item">
								<Select
									options={customerTypesList}
									defaultValue={CustomerTypeEnum["Khách thường"]}
									placeholder="Loại khách hàng"
									className="defaultSelect"
								/>
							</Form.Item>
						</div>
						<div className="row">
							<Form.Item
								name="phone"
								label="Số điện thoại"
								rules={[
									{ required: true, type: "regexp", pattern: phonePattern, message: message.customer.inValidPhone }
								]}
								className="item"
								required
							>
								<Input placeholder="Nhập số điện thoại" required className="defaultInput" />
							</Form.Item>
							<Form.Item
								name="email"
								label="Email"
								className="item"
								rules={[
									{
										required: true,
										type: "regexp",
										pattern: mailPattern,
										message: message.customer.inValidEmail
									}
								]}
							>
								<Input placeholder="Nhập địa chỉ email" required className="defaultInput" />
							</Form.Item>
						</div>
						<div className="row">
							<Form.Item name="date_of_birth" label="Ngày sinh" className="item">
								<DatePicker format={dateFormatDMY} placeholder="Nhập Ngày sinh" className="defaultDate" />
							</Form.Item>
							<Form.Item name="gender" label="Giới tính" className="item">
								<Select
									options={gendersList}
									defaultValue={UserGenderEnum.Nam}
									placeholder="Lựa chọn giới tính"
									className="defaultSelect"
								/>
							</Form.Item>
						</div>

						<Title>Địa chỉ nhận hàng</Title>
						<ButtonAddress onClick={handleOpenTransportModal}>
							<PlusCircleOutlined style={{ backgroundColor: "#2980B0", color: "white", borderRadius: "50%" }} />
							<span style={{ marginLeft: "10px" }}>Thêm địa chỉ nhận hàng</span>
						</ButtonAddress>
						{transportFormsList.length
							? transportFormsList.map((transportFormItem: any, i: number) => (
									<Card key={transportFormItem.id}>
										<div
											className="card"
											onDoubleClick={() => {
												setIsEdit(true);
												onEditTransportItem(transportFormItem.id);
											}}
										>
											<div className="card__info">
												<span className="card__info__fullname">{transportFormItem.fullname}</span>
												<span>|</span>
												<span className="card__info__phone">{transportFormItem.phone}</span>
												{transportFormItem.default ? (
													<span className="card__info__default">
														<CheckCircleFilled />
														<span>Địa chỉ mặc định</span>
													</span>
												) : null}
											</div>

											<div className="card__address">{transportFormItem.address}</div>
											<div className="card__address">
												{joinIntoAddress(
													transportFormItem.province_name,
													transportFormItem.district_name,
													transportFormItem.ward_name
												)}
											</div>
										</div>
										<div style={{ display: "flex", alignItems: "center", fontSize: "16px" }}>
											<span
												style={{ cursor: "pointer" }}
												onClick={() => {
													setIsEdit(true);
													onEditTransportItem(transportFormItem.id);
												}}
											>
												<SvgEdit style={{ fontSize: "16px" }} />
											</span>
											<span
												onClick={() => onRemoveTransportItem(transportFormItem.id)}
												style={{ fontSize: "25px", marginLeft: "5px", cursor: "pointer" }}
												className="text-gray-400"
											>
												<DeleteFilled />
											</span>
										</div>
									</Card>
							  ))
							: null}

						<div style={{ marginTop: "10px", marginLeft: "auto", display: "flex", justifyContent: "flex-end" }}>
							<button className="bg-black text-primary flex defaultButton" type="submit">
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

export default CreateModal;
