import { Checkbox, Form, Input, InputNumber, Radio } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyError, notifySuccess } from "src/components/notification";
import SubHeader from "src/components/subHeader/SubHeader";
import { createOnePackages, getOnePackagesById, updateOnePackages } from "src/services/actions/packages.actions";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";

const PackageEdit = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const isMount = useIsMount();
	const paramsUrl = useParams() as any;
	const [dataPackage, setDataPackage] = useState<any>(undefined);
	const [formCreate] = Form.useForm();
	const { stateUpdateOnePackages, statePackagesById } = useSelector((state: AppState) => state.packagesReducer);
	useEffect(() => {
		dispatch(getOnePackagesById(paramsUrl.id));
	}, [paramsUrl.id]);
	useEffect(() => {
		if (isMount) return;
		const { data, message, success, isLoading, error } = statePackagesById;
		if (!isLoading) {
			if (success) {
				let dataInfo = data?.data;
				let fakeBenifits = [];
				for (let i = 0; i < dataInfo?.benefits?.length; i++) {
					fakeBenifits.push(dataInfo?.benefits[i]?.id?.toString());
				}
				setDataPackage(data?.data);
				formCreate.setFieldsValue({
					number_users_using: dataInfo?.number_users_using,
					service_code: dataInfo?.service_code,
					service_name: dataInfo?.service_name,
					description: dataInfo?.description,
					price: dataInfo?.price,
					price_per_branch: dataInfo?.price_per_branch,
					store_no: dataInfo?.store_no,
					status: dataInfo?.status,
					user_no: dataInfo?.user_no,
					branch_no: dataInfo?.branch_no,
					benefits: fakeBenifits
				});
			} else {
				notifyError(message + "");
			}
		}
	}, [statePackagesById.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, isLoading, error } = stateUpdateOnePackages;
		if (!isLoading) {
			if (success) {
				history.push("/packages");
				notifySuccess("Cập nhật gói dịch vụ thành công!");
				formCreate.resetFields();
			} else {
				notifyError(message + "");
			}
		}
	}, [stateUpdateOnePackages.isLoading]);

	const submitUpdate = (values: any) => {
		let params = {
			service_name: values?.service_name,
			description: values?.description,
			price: values?.price,
			price_per_branch: values?.price_per_branch,
			status: values?.status,
			store_no: values?.store_no,
			user_no: values?.user_no,
			branch_no: values?.branch_no,

			benefits: values?.benefits
		};
		dispatch(updateOnePackages(paramsUrl?.id, params));
	};
	return (
		<div className="mainPages">
			<SubHeader
				breadcrumb={[
					{ text: "Thiết lập hệ thống" },
					{ link: "/packages", text: "Gói dịch vụ" },
					{ text: "Chi tiết gói dịch vụ" }
				]}
			/>

			<Form
				form={formCreate}
				id="formCreate"
				onFinish={submitUpdate}
				layout="horizontal"
				style={{ display: "flex", justifyContent: "space-between" }}
			>
				<div style={{ background: "#fff", borderRadius: "5px", padding: "13px", width: "calc(70% - 6.5px)" }}>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
						<h4>Thông tin gói dịch vụ</h4>
						<div className="defaultButton" onClick={() => formCreate.submit()}>
							<SvgIconStorage style={{ transform: "scale(0.8)" }} />
							&nbsp;Lưu
						</div>
					</div>
					<Form.Item label="Mã dịch vụ" name="service_code" className="rowBetween" style={{ margin: "0 0 16px 0" }}>
						<Input disabled className="defaultInput" placeholder="Nhập tên gói dịch vụ" />
					</Form.Item>
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
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							placeholder="Nhập giá"
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							addonAfter="/ tháng"
							style={{ width: "100%" }}
							className="defaultInputNumberAddon backgroundBlack"
						/>
					</Form.Item>
					{dataPackage?.service_code !== "PROFESSIONAL" && (
						<Form.Item label="Cửa hàng" name="store_no" className="rowBetween" style={{ margin: "0 0 16px 0" }}>
							<InputNumber
								min={1}
								max={1000}
								className="defaultInputNumber"
								disabled={true}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
								placeholder="Nhập số cửa hàng/ tháng"
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</Form.Item>
					)}

					{dataPackage?.service_code === "PROFESSIONAL" && (
						<Form.Item label="Cửa hàng" className="rowBetween" style={{ margin: "0 0 16px 0" }}>
							<InputNumber
								min={1}
								max={1000}
								value={1}
								className="defaultInputNumber"
								disabled={true}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
								placeholder="Nhập số cửa hàng/ tháng"
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</Form.Item>
					)}

					<Form.Item
						hidden={dataPackage?.service_code !== "BASIC"}
						label="Số người dùng hệ thống"
						name="user_no"
						className="rowBetween"
						style={{ margin: "0 0 16px 0" }}
					>
						<InputNumber
							min={1}
							max={1000}
							className="defaultInputNumber"
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
							placeholder="Nhập số người dùng"
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						/>
					</Form.Item>
					<Form.Item
						hidden={dataPackage?.service_code === "BASIC"}
						label="Số người dùng hệ thống"
						className="rowBetween"
						style={{ margin: "0 0 16px 0" }}
					>
						<Input className="defaultInput" value={"Không giới hạn"} disabled />
					</Form.Item>
					{dataPackage?.service_code !== "PROFESSIONAL" && (
						<Form.Item label="Kho mặc định" name="branch_no" className="rowBetween" style={{ margin: "0 0 16px 0" }}>
							<InputNumber
								min={1}
								max={1000}
								className="defaultInputNumber"
								disabled={true}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
								placeholder="Nhập số lượng kho"
							/>
						</Form.Item>
					)}

					{dataPackage?.service_code === "PROFESSIONAL" && (
						<Form.Item label="Kho mặc định" className="rowBetween" style={{ margin: "0 0 16px 0" }}>
							<InputNumber
								min={1}
								max={1000}
								className="defaultInputNumber"
								value={1}
								disabled={true}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
								placeholder="Nhập số lượng kho"
							/>
						</Form.Item>
					)}

					<Form.Item
						hidden={dataPackage?.service_code === "BASIC"}
						label="Thêm số lượng kho"
						name="price_per_branch"
						className="rowBetween"
						style={{ margin: "0 0 16px 0" }}
					>
						<InputNumber
							min={1}
							max={1000000000}
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							placeholder="Nhập giá tiền"
							addonAfter="vnđ / kho / tháng"
							style={{ width: "100%" }}
							className="defaultInputNumberAddon backgroundBlack"
						/>
					</Form.Item>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<p style={{ width: "calc(25% - 13px)" }}>Quyền lợi</p>
						<Form.Item name="benefits" style={{ width: "calc(75% + 13px)" }}>
							<Checkbox.Group disabled={true}>
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
						<Form.Item
							name="status"
							style={{ margin: "0" }}
							rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
						>
							<Radio.Group>
								<Radio value={true}>Hiển thị</Radio>
								<Radio value={false}>Ẩn</Radio>
							</Radio.Group>
						</Form.Item>
					</div>
					<div style={{ background: "#fff", marginTop: "13px", borderRadius: "5px", padding: "13px", width: "100%" }}>
						<h4>Thông tin sử dụng</h4>
						<span>Số lượng khách hàng đang sử dụng dịch vụ</span>
						<Form.Item style={{ margin: "0" }} name="number_users_using">
							<InputNumber
								className="defaultInputNumber"
								disabled={true}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</Form.Item>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default PackageEdit;
