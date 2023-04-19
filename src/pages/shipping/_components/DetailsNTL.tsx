import { Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SvgConnectNTL from "src/assets/svg/SvgConnectNTL";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
const deliveryService = [
	{ label: "Chuyển phát nhanh", value: 10 },
	{ label: "Đường bộ", value: 20 },
	{ label: "Hỏa tốc", value: 11 },
	{ label: "MES", value: 21 }
];

const paymentMethod = [
	{ label: "Người gửi thanh toán ngay", value: 10 },
	{ label: "Người gửi thanh toán sau", value: 11 },
	{ label: "Người nhận thanh toán ngay", value: 20 }
];
const DetailsNTL = ({ formInfo, record, disconnectCallback, closeModalCallback, submitUpdateCallback }: any) => {
	const [hasChange, setHasChange] = useState(false);
	const [services, setServices] = useState<any[]>([]);
	const [payments, setPayments] = useState<any[]>([]);
	const [servicesChange, setServicesChange] = useState<any[]>([]);
	const [paymentsChange, setPaymentsChange] = useState<any[]>([]);
	const checkCompare = (array1: any[], array2: any[]) => {
		const array2Sorted = array2.slice().sort();
		return (
			array1.length === array2.length &&
			array1
				.slice()
				.sort()
				.every(function (value, index) {
					return value === array2Sorted[index];
				})
		);
	};
	// useEffect(() => {
	// 	if (services.length > 0 && payments.length > 0) {
	// 		if (!checkCompare(services, servicesChange) || !checkCompare(payments, paymentsChange)) {
	// 			setHasChange(true);
	// 		} else {
	// 			setHasChange(false);
	// 		}
	// 	}
	// }, [servicesChange, paymentsChange]);
	useEffect(() => {
		const getDataTable = async (params?: any) => {
			try {
				const response = (await api.get(
					`${API_URL}/shipping-units/${record?.id}
				`,
					params
				)) as any;
				let data = response?.data;
				if (data) {
					formInfo.setFieldsValue({
						password: undefined,
						partner_name: data?.data?.partner_name,
						username: data?.data?.username,
						partner_id: data?.data?.partner_id,
						email: data?.data?.email,
						delivery_service_ids: data?.shipping_services.map((item: any) => {
							if (item.status) return item.delivery_service_id;
						}),
						payment_method_ids: data?.payment_methods.map((item: any) => {
							if (item.status) return item.payment_method_id;
						})
					});
					setServices(
						data?.shipping_services.map((item: any) => {
							return item.delivery_service_id;
						})
					);

					setServicesChange(
						data?.shipping_services.map((item: any) => {
							return item.delivery_service_id;
						})
					);
					setPayments(
						data?.payment_methods.map((item: any) => {
							return item.payment_method_id;
						})
					);

					setPaymentsChange(
						data?.payment_methods.map((item: any) => {
							return item.payment_method_id;
						})
					);
				}
			} catch (error: any) {
				throw new Error(error?.response?.data?.message);
			}
		};
		if (record?.id) {
			getDataTable();
		}
	}, [record]);

	const handleSubmitConnect = (values: any) => {
		submitUpdateCallback(values);
	};
	return (
		<div>
			<SvgConnectNTL />
			<h4>Thông tin kết nối</h4>
			<Form
				layout="vertical"
				form={formInfo}
				id="formInfo"
				onFinish={handleSubmitConnect}
				style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}
			>
				<Form.Item label="Họ tên" name="partner_name" style={{ margin: "0 0 13px 0", width: "calc(50% - 4px)" }}>
					<Input className="defaultInput" disabled />
				</Form.Item>
				<Form.Item label="Username" name="username" style={{ margin: "0 0 13px 0", width: "calc(50% - 4px)" }}>
					<Input className="defaultInput" disabled />
				</Form.Item>
				<Form.Item label="ID" name="partner_id" style={{ margin: "0 0 13px 0", width: "calc(50% - 4px)" }}>
					<Input className="defaultInput" disabled />
				</Form.Item>
				<Form.Item label="Email" name="email" style={{ margin: "0 0 13px 0", width: "calc(50% - 4px)" }}>
					<Input className="defaultInput" disabled />
				</Form.Item>
				<Form.Item
					rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
					label="Chọn dịch vụ vận chuyển"
					name="delivery_service_ids"
					style={{ margin: "0 0 13px 0", width: "100%" }}
				>
					<Checkbox.Group options={deliveryService} onChange={() => setHasChange(true)} />
				</Form.Item>
				<Form.Item
					rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
					label="Chọn thanh toán"
					name="payment_method_ids"
					style={{ margin: "0 0 13px 0", width: "100%" }}
				>
					<Checkbox.Group options={paymentMethod} onChange={() => setHasChange(true)} />
				</Form.Item>
				{hasChange && (
					<Form.Item
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
						label="Cần xác nhận mật khẩu "
						name="password"
						style={{ margin: "0 0 13px 0", width: "100%" }}
					>
						<Input className="defaultInput" type="password" />
					</Form.Item>
				)}
				<div style={{ fontSize: "12px" }}>
					<span style={{ color: "red" }}>Cảnh báo:</span>&nbsp;Việc thay đổi dịch vụ vận chuyển và hình thức thanh toán
					sẽ dẫn đến thay đổi về chi phí vận chuyển
				</div>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
					<div className="searchButton" onClick={() => disconnectCallback(record)}>
						Ngưng kết nối
					</div>
					<div className="searchButton" style={{ marginLeft: "8px" }} onClick={() => closeModalCallback()}>
						Trở lại
					</div>
					{hasChange && (
						<div className="defaultButton" style={{ marginLeft: "8px" }} onClick={() => formInfo.submit()}>
							Cập nhật
						</div>
					)}
				</div>
			</Form>
		</div>
	);
};

export default DetailsNTL;
