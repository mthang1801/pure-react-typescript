import { Checkbox, DatePicker, Form, Input, InputNumber, Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifySuccess, notifyWarning } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SubHeader from "src/components/subHeader/SubHeader";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import colors from "src/utils/colors";
import { convertToOnlyNumber } from "src/utils/helpers/functions/textUtils";

const PointPage = () => {
	const [infoForm] = Form.useForm();
	const [infoData, setInfoData] = useState<any>(undefined);

	const [loadingEdit, setLoadingEdit] = useState(false);
	useEffect(() => {
		const getPointInfo = async (params?: any) => {
			try {
				const response = (await api.get(
					`${API_URL}/customer-point-configs
					`,
					params
				)) as any;
				let data = response?.data;
				if (data) {
					setInfoData(data);
					infoForm.setFieldsValue({
						point_name: data?.point_name,
						start_at: data?.start_at ? moment(data?.start_at) : undefined,
						end_at: data?.end_at ? moment(data?.end_at) : undefined,
						status: data?.status,
						description: data?.description,
						accumulated_money: data?.accumulated_money,
						accumulated_point: data?.accumulated_point,
						used_money: data?.used_money,
						used_point: data?.used_point,
						min_point: data?.min_point,
						max_point: data?.max_point,
						auto_point_from: data?.auto_point_from,
						sms_verify_point: data?.sms_verify_point,
						point_round_to_down: data?.point_round_to_down
					});
				}
			} catch (error: any) {
				throw new Error(error?.response?.data?.message);
			}
		};
		if (!loadingEdit) {
			getPointInfo();
		}
		return () => {};
	}, [loadingEdit]);

	const handleSubmitEdit = async (values: any) => {
		if (values?.start_at > values?.end_at) {
			return notifyWarning("Vui lòng chọn ngày kết thúc lớn hơn ngày tạo");
		}
		setLoadingEdit(true);
		let params = {
			...values,
			accumulated_money: values?.accumulated_money
				? Number(values?.accumulated_money?.toString()?.replace(",", ""))
				: 0,
			used_money: values?.used_money ? Number(values?.used_money?.toString()?.replace(",", "")) : 0,
			used_point: values?.used_point ? Number(values?.used_point?.toString()?.replace(".", "")) : 0,
			accumulated_point: values?.accumulated_point
				? Number(values?.accumulated_point?.toString()?.replace(".", ""))
				: 0,
			auto_point_from: values?.auto_point_from ? Number(values?.auto_point_from?.toString()?.replace(".", "")) : null,
			max_point: values?.max_point ? Number(values?.max_point?.toString()?.replace(".", "")) : 0,
			min_point: values?.min_point ? Number(values?.min_point?.toString()?.replace(".", "")) : 0,
			sms_verify_point: infoData?.sms_verify_point,
			point_round_to_down: infoData?.point_round_to_down
		};
		try {
			const response = (await api.put(
				`${API_URL}/customer-point-configs
				`,
				params
			)) as any;
			let data = response?.data;

			notifySuccess("Cập nhật thành công!");

			setLoadingEdit(false);
		} catch (error: any) {
			setLoadingEdit(false);

			throw new Error(error?.response?.data?.message);
		}
	};
	return (
		<div className="mainPages">
			<OverlaySpinner open={loadingEdit} text="Đang cập nhật ..." />
			<SubHeader breadcrumb={[{ text: "Khuyến mãi" }, { text: "Điểm tích lũy" }]} />
			<Form form={infoForm} id="infoForm" layout="vertical" onFinish={handleSubmitEdit}>
				<div className="contentSection">
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<h4>Thông tin chung</h4>
						<div className="defaultButton" onClick={() => infoForm.submit()}>
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp;Lưu
						</div>
					</div>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<Form.Item
							name="point_name"
							label="Tên chương trình"
							style={{ width: "calc(40% - (24px / 3))", margin: "0 0 13px 0" }}
						>
							<Input className="defaultInput" />
						</Form.Item>
						<Form.Item
							name="start_at"
							label="Thời gian bắt đầu"
							style={{ width: "calc(20% - (24px / 3))", margin: "-2px 0 13px 0" }}
						>
							<DatePicker
								showTime
								className="defaultDate"
								disabledDate={(current) => {
									return moment().add(-1, "days") >= current;
								}}
							/>
						</Form.Item>
						<Form.Item
							name="end_at"
							label="Thời gian kết thúc"
							style={{ width: "calc(20% - (24px / 3))", margin: "-2px 0 13px 0" }}
						>
							<DatePicker
								showTime
								className="defaultDate"
								disabledDate={(current) => {
									return moment().add(-1, "days") >= current;
								}}
							/>
						</Form.Item>
						<Form.Item
							name="status"
							label="Trạng thái"
							style={{ width: "calc(20% - (24px / 3))", margin: "0 0 13px 0" }}
						>
							<Select
								className="defaultSelect"
								options={[
									{ label: "Hoạt động", value: true },
									{ label: "Ngừng hoạt động", value: false }
								]}
							/>
						</Form.Item>
					</div>
					<Form.Item name="description" label="Mô tả">
						<Input.TextArea className="defaultInput" style={{ height: "unset" }} />
					</Form.Item>
				</div>

				<div className="contentSection">
					<h4>Cấu hình điểm tích lũy</h4>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div style={{ width: "calc(60% - 12px)" }}>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
								<div>Tỷ lệ tích điểm</div>
								<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
									<Form.Item name="accumulated_money" style={{ margin: "0" }}>
										<InputNumber
											min={0}
											max={1000000000}
											formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
											parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
											addonAfter="VNĐ"
											className="defaultInputNumberAddon backgroundBlack"
										/>
									</Form.Item>
									&nbsp;=&nbsp;
									<Form.Item name="accumulated_point" style={{ margin: "0" }}>
										<InputNumber
											min={0}
											formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
											parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
											addonAfter="Điểm"
											className="defaultInputNumberAddon backgroundPrimary"
										/>
									</Form.Item>
								</div>
							</div>
							<div
								style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "13px" }}
							>
								<div>Tỷ lệ tiêu điểm</div>
								<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
									<Form.Item name="used_point" style={{ margin: "0" }}>
										<InputNumber
											min={0}
											formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
											parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
											addonAfter="Điểm"
											className="defaultInputNumberAddon backgroundPrimary"
										/>
									</Form.Item>
									&nbsp;=&nbsp;
									<Form.Item name="used_money" style={{ margin: "0" }}>
										<InputNumber
											min={0}
											max={1000000000}
											formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
											parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
											addonAfter="VNĐ"
											className="defaultInputNumberAddon backgroundBlack"
										/>
									</Form.Item>
								</div>
							</div>
							<div style={{ fontSize: "12px", color: "#808A94", marginTop: "8px" }}>
								Nếu không cài đặt tỷ lệ tiêu điểm, hệ thống sẽ lấy tỷ lệ tích điểm để tính
							</div>
							<div
								style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "13px" }}
							>
								<div>Một lần tiêu điểm tích lũy cần sử dụng tối thiểu</div>
								<Form.Item name="min_point" style={{ margin: "0" }}>
									<InputNumber
										min={0}
										formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
										parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
										addonAfter="Điểm"
										className="defaultInputNumberAddon backgroundPrimary"
									/>
								</Form.Item>
							</div>

							<div
								style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "13px" }}
							>
								<div>Một lần tiêu điểm tích lũy chỉ được sử dụng tối đa </div>
								<Form.Item name="max_point" style={{ margin: "0" }}>
									<InputNumber
										min={0}
										formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
										parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
										addonAfter="Điểm"
										className="defaultInputNumberAddon backgroundPrimary"
									/>
								</Form.Item>
							</div>

							<div
								style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "13px" }}
							>
								<div>Tự động tiêu điểm khi khách hàng có từ</div>
								<Form.Item name="auto_point_from" style={{ margin: "0" }}>
									<InputNumber
										formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
										parser={(value: any) => value!.replace(/\$\s?|(\.*)/g, "")}
										addonAfter="Điểm"
										className="defaultInputNumberAddon backgroundPrimary"
									/>
								</Form.Item>
							</div>
						</div>

						<div style={{ width: "calc(40% - 12px)" }}>
							<Form.Item name="point_round_to_down">
								<Checkbox
									checked={infoData?.point_round_to_down}
									onChange={(e: any) => setInfoData({ ...infoData, point_round_to_down: e.target.checked })}
								>
									<div>
										<div>Làm tròn xuống điểm tích lũy</div>
										<div style={{ fontSize: "12px", color: "#808A94" }}>
											VD: Cài đặt chương trình tích điểm như sau: Hóa đơn từ 100.000VND trở lên sẽ được tích điểm tương
											ứng 10% giá trị hóa đơn, tỉ lệ quy đổi 1000 VND = 1 điểm. Nếu khách hàng mua hàng có hóa đơn trị
											giá 115.000VND thì được tích điểm 10% tương ứng 11.500VND = 11.5 điểm. Mặc định hệ thống sẽ làm
											tròn 12 điểm. Nếu bật cài đặt này thì hệ thống sẽ tính 11 điểm.
										</div>
									</div>
								</Checkbox>
							</Form.Item>
							<Form.Item name="sms_verify_point">
								<Checkbox
									checked={infoData?.sms_verify_point}
									onChange={(e: any) => {
										setInfoData({ ...infoData, sms_verify_point: e.target.checked });
									}}
								>
									<div>
										<div>Xác minh sử dụng điểm tích lũy qua SMS</div>
										<div style={{ fontSize: "12px", color: "#808A94" }}>
											Hệ thống sẽ gửi OTP về điện thoại khách mua hàng, khách đọc OTP cho thu ngân để xác minh sử dụng
											điểm tích lũy. Sử dụng chức năng này bạn cần đăng ký và cài đặt tài khoản gửi SMS.
										</div>
									</div>
								</Checkbox>
							</Form.Item>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default PointPage;
