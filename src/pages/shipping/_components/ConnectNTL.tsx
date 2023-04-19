import { Checkbox, Form, Input } from "antd";
import SvgConnectNTL from "src/assets/svg/SvgConnectNTL";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
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
const ConnectNTL = ({ formConnect, submitConnectCallback }: any) => {
	const handleSubmitConnect = (values: any) => {
		submitConnectCallback(values);
	};

	return (
		<div>
			<SvgConnectNTL />
			<h4>Đăng nhập tài khoản Nhất Tín Logistics</h4>
			<Form layout="vertical" form={formConnect} id="formConnect" onFinish={handleSubmitConnect}>
				<Form.Item
					rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
					label="Username"
					name="username"
					style={{ margin: "0 0 13px 0" }}
				>
					<Input className="defaultInput" />
				</Form.Item>
				<Form.Item
					rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
					label="Password"
					name="password"
					style={{ margin: "0 0 13px 0" }}
				>
					<Input className="defaultInput" type="password" />
				</Form.Item>
				<Form.Item
					rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
					label="Chọn dịch vụ vận chuyển"
					name="delivery_service_ids"
					style={{ margin: "0 0 13px 0" }}
				>
					<Checkbox.Group options={deliveryService} />
				</Form.Item>
				<Form.Item
					rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
					label="Chọn thanh toán"
					name="payment_method_ids"
					style={{ margin: "0 0 13px 0" }}
				>
					<Checkbox.Group options={paymentMethod} />
				</Form.Item>
			</Form>
			<div style={{ fontStyle: "italic" }}>
				Nếu bạn chưa có tài khoản! Đăng ký{" "}
				<a
					href="https://khachhang.ntlogistics.vn/register"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						textDecorationStyle: "solid",
						textDecorationLine: "underline",
						textDecorationColor: "rgb(0,117,164)",
						color: "rgb(0,117,164)",
						cursor: "pointer"
					}}
				>
					Tại đây
				</a>
			</div>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
				<div className="defaultButton" onClick={() => formConnect.submit()}>
					<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
					&nbsp;Kết nối
				</div>
			</div>
		</div>
	);
};

export default ConnectNTL;
