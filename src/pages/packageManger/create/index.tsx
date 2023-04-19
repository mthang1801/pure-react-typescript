import { Checkbox, Form, Input, InputNumber, Radio } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyError, notifySuccess } from "src/components/notification";
import SubHeader from "src/components/subHeader/SubHeader";
import { createOnePackages } from "src/services/actions/packages.actions";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";

const PackageCreate = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const isMount = useIsMount();
	const [formCreate] = Form.useForm();
	const { stateCreateOnePackages } = useSelector((state: AppState) => state.packagesReducer);
	useEffect(() => {
		if (isMount) return;
		const { message, success, isLoading, error } = stateCreateOnePackages;
		if (!isLoading) {
			if (success) {
				history.push("/packages");
				notifySuccess("Tạo gói dịch vụ thành công!");
				formCreate.resetFields();
			} else {
				notifyError(message + "");
			}
		}
	}, [stateCreateOnePackages.isLoading]);
	const submitCreate = (values: any) => {
		let params = {
			service_name: values?.service_name,
			description: values?.description,
			price: values?.price,
			status: values?.status,
			store_no: values?.store_no,
			user_no: values?.user_no,
			branch_no: values?.branch_no,

			benefits: values?.benefits
		};
		dispatch(createOnePackages(params));
	};
	return (
		<div className="mainPages">
			<SubHeader breadcrumb={[{ text: "Thiết lập hệ thống" }, { text: "Cấu hình dịch vụ" }]} />

			<Form
				form={formCreate}
				id="formCreate"
				onFinish={submitCreate}
				layout="horizontal"
				style={{ display: "flex", justifyContent: "space-between" }}
				initialValues={{
					status: false
				}}
			>
				<div style={{ background: "#fff", borderRadius: "5px", padding: "13px", width: "calc(70% - 6.5px)" }}>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
						<h4>Thông tin gói dịch vụ</h4>
						<div className="defaultButton" onClick={() => formCreate.submit()}>
							<SvgIconStorage style={{ transform: "scale(0.8)" }} />
							&nbsp;Lưu
						</div>
					</div>
					{/* <Form.Item label="Mã dịch vụ" name="service_code" className="rowBetween" style={{ margin: "0 0 16px 0" }}>
						<Input disabled className="defaultInput" placeholder="Nhập tên gói dịch vụ" />
					</Form.Item> */}
					<Form.Item
						label="Tên gói dịch vụ"
						rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
						name="service_name"
						className="rowBetween"
						style={{ margin: "0 0 16px 0" }}
					>
						<Input className="defaultInput" placeholder="Nhập tên gói dịch vụ" />
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
						label="Mô tả"
						name="description"
						className="rowBetween"
						style={{ margin: "0 0 16px 0" }}
					>
						<Input className="defaultInput" placeholder="Nhập mô tả" />
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
						label="Giá dịch vụ (vnđ)"
						name="price"
						className="rowBetween"
						style={{ margin: "0 0 16px 0" }}
					>
						<InputNumber
							min={0}
							max={1000000000}
							className="defaultInputNumber"
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							placeholder="Nhập giá"
						/>
					</Form.Item>

					<Form.Item label="Cửa hàng" name="store_no" className="rowBetween" style={{ margin: "0 0 16px 0" }}>
						<InputNumber
							min={1}
							max={1000}
							className="defaultInputNumber"
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							placeholder="Nhập số cửa hàng/ tháng"
						/>
					</Form.Item>
					<Form.Item label="Số người dùng" name="user_no" className="rowBetween" style={{ margin: "0 0 16px 0" }}>
						<InputNumber
							min={1}
							max={1000}
							className="defaultInputNumber"
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							placeholder="Nhập số người dùng"
						/>
					</Form.Item>
					<Form.Item label="Chi nhánh" name="branch_no" className="rowBetween" style={{ margin: "0 0 16px 0" }}>
						<InputNumber
							min={1}
							max={1000}
							className="defaultInputNumber"
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							placeholder="Nhập số chi nhánh"
						/>
					</Form.Item>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<p style={{ width: "calc(25% - 13px)" }}>
							<span style={{ color: "red" }}>*</span>&nbsp;Quyền lợi
						</p>
						<Form.Item
							name="benefits"
							style={{ width: "calc(75% + 13px)" }}
							rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
						>
							<Checkbox.Group>
								<Checkbox
									style={{
										width: "100%",
										border: "1px solid rgb(212,212,212)",
										padding: "4px 8px",
										borderRadius: "5px"
									}}
									value="1"
								>
									Không giới hạn tính năng
								</Checkbox>
								<Checkbox
									style={{
										width: "100%",
										border: "1px solid rgb(212,212,212)",
										padding: "4px 8px",
										borderRadius: "5px",
										margin: "8px 0 0 0"
									}}
									value="2"
								>
									Không phí khởi tạo
								</Checkbox>{" "}
								<Checkbox
									style={{
										width: "100%",
										border: "1px solid rgb(212,212,212)",
										padding: "4px 8px",
										borderRadius: "5px",
										margin: "8px 0 0 0"
									}}
									value="3"
								>
									Quản lý chấm công, tính lương
								</Checkbox>{" "}
								<Checkbox
									style={{
										width: "100%",
										border: "1px solid rgb(212,212,212)",
										padding: "4px 8px",
										borderRadius: "5px",
										margin: "8px 0 0 0"
									}}
									value="4"
								>
									Bán hàng online trên các sàn thương mại điện tử
								</Checkbox>{" "}
								<Checkbox
									style={{
										width: "100%",
										border: "1px solid rgb(212,212,212)",
										padding: "4px 8px",
										borderRadius: "5px",
										margin: "8px 0 0 0"
									}}
									value="5"
								>
									Hỗ trợ kết nối API
								</Checkbox>
							</Checkbox.Group>
						</Form.Item>
					</div>
				</div>
				<div style={{ width: "calc(30% - 6.5px)" }}>
					<div style={{ background: "#fff", borderRadius: "5px", padding: "13px", width: "100%" }}>
						<h4>Trạng thái hiển thị</h4>
						<Form.Item name="status" style={{ margin: "0" }}>
							<Radio.Group>
								<Radio value={true}>Hiển thị</Radio>
								<Radio value={false}>Ẩn</Radio>
							</Radio.Group>
						</Form.Item>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default PackageCreate;
