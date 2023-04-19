import { Form, Input, Modal } from "antd";
import React from "react";

const ModalSale = ({ openSaleModal, setOpenSaleModal, addCouponCallback }: any) => {
	const [formSale] = Form.useForm();
	const handleSubmitAddCoupon = (values: any) => {
		addCouponCallback(values?.coupon);
	};
	return (
		<Modal
			open={openSaleModal}
			title={"Áp dụng mã giảm giá"}
			centered
			footer={null}
			onCancel={() => {
				setOpenSaleModal(false);
				formSale.resetFields();
			}}
			style={{ zIndex: "99999" }}
		>
			<Form form={formSale} id="formSale" onFinish={handleSubmitAddCoupon}>
				<Form.Item name="coupon">
					<Input className="defaultInput" placeholder="Nhập mã giảm giá" />
				</Form.Item>
				<div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "8px" }}>
					<div
						onClick={() => {
							setOpenSaleModal(false);
							formSale.resetFields();
						}}
						className="searchButton"
						style={{ marginRight: "8px" }}
					>
						Hủy bỏ
					</div>
					<div onClick={() => formSale.submit()} className="defaultButton">
						Áp dụng
					</div>
				</div>
			</Form>
		</Modal>
	);
};

export default ModalSale;
