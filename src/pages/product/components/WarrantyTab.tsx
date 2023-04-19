import { Form, Input, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { convertToOnlyNumber, isVietnamesePhoneNumber, phonePattern } from "src/utils/helpers/functions/textUtils";

const WarrantyTab = ({ form, isActive, product, productLevel }: any) => {
	return (
		<div className="productPage__create__form__warranty" style={{ marginTop: "13px", height: "310px" }}>
			<h4 style={{ margin: "0" }}>Kích thước</h4>
			<div className="productPage__create__form__warranty__information">
				<Form.Item name="weight" label="Khối lượng (kg)" style={{ margin: "0 0 13px 0" }}>
					<InputNumber
						min={0}
						placeholder="Nhập khối lượng"
						className="defaultInputNumber"
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
					/>
				</Form.Item>
				<Form.Item name="length" label="Chiều dài (cm)" style={{ margin: "0 0 13px 0" }}>
					<InputNumber
						min={0}
						placeholder="Chiều dài (cm)"
						className="defaultInputNumber"
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
					/>
				</Form.Item>
				<Form.Item name="width" label="Chiều rộng (cm)" style={{ margin: "0 0 13px 0" }}>
					<InputNumber
						min={0}
						placeholder="Chiều rộng (cm)"
						className="defaultInputNumber"
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
					/>
				</Form.Item>
				<Form.Item name="height" label="Chiều cao (cm)" style={{ margin: "0 0 13px 0" }}>
					<InputNumber
						min={0}
						placeholder="Chiều cao (cm)"
						className="defaultInputNumber"
						formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
					/>
				</Form.Item>
			</div>
			<h4 style={{ margin: "0" }}>Bảo hành</h4>
			<div className="productPage__create__form__warranty__warranty">
				<Form.Item name="warranty_address" label="Địa chỉ bảo hành" style={{ margin: "0 0 13px 0" }}>
					<Input className="defaultInput" placeholder="Nhập địa chỉ bảo hành" />
				</Form.Item>
				<Form.Item
					rules={[
						() => ({
							validator(_: any, value: any) {
								if (product?.product_level === "2" || productLevel === "2") {
									return Promise.resolve();
								}

								if (
									convertToOnlyNumber(value || "").length === 0 ||
									(value && isVietnamesePhoneNumber(convertToOnlyNumber(value)))
								) {
									return Promise.resolve();
								}
								return Promise.reject(new Error("Sai định dạng sđt"));
							}
						})
					]}
					name="warranty_phone"
					label="Số điện thoại bảo hành"
					style={{ margin: "0 0 13px 0" }}
				>
					<Input
						className="defaultInput"
						placeholder="Nhập số điện thoại bảo hành"
						onChange={(e: any) => {
							form.setFieldValue("warranty_phone", convertToOnlyNumber(e.target.value));
						}}
					/>
				</Form.Item>
				<Form.Item name="warranty_months" label="Số tháng bảo hành" style={{ margin: "0 0 13px 0" }}>
					<InputNumber min={0} placeholder="Nhập số tháng bảo hành" className="defaultInputNumber" />
				</Form.Item>
				<Form.Item></Form.Item>
			</div>
			<div className="productPage__create__form__warranty__note">
				<Form.Item name="warranty_note" label="Ghi chú" style={{ margin: "0 " }}>
					<TextArea
						placeholder="Nhập ghi chú bảo hành"
						className="defaultInput"
						autoSize={{ minRows: 3, maxRows: 5 }}
					/>
				</Form.Item>
			</div>
		</div>
	);
};

export default WarrantyTab;
