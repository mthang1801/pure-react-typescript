import { Input, InputNumber, Radio } from "antd";
import React from "react";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import { convertNumberWithCommas } from "src/utils/helpers/functions/textUtils";

const PaymentInfo = ({
	saleValue,
	filterCustomer,
	setFilterCustomer,
	showCustomers,
	setShowCustomers,
	setOpenModalCustomer,
	setIsCreateCustomer,
	formModalCustomer,
	formCreate,
	listCustomers,
	selectedCustomer,
	setSelectedCustomer,
	notes,
	setNotes,
	bills,
	selectedBill,
	onSubmitCreate,
	money,
	setMoney,
	setTypePayment,
	setWillConvert,
	listPrices
}: any) => {
	const calTotalPrice = (values: any) => {
		let total = 0;
		for (let i = 0; i < values?.length; i++) {
			total = Number(total) + Number(values[i]?.price) * Number(values[i]?.quantity);
		}

		return total;
	};
	return (
		<div style={{ position: "absolute", width: "calc(100% - 13px)", bottom: "10px" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					padding: "8px",
					borderRadius: "5px",
					background: "#fff"
				}}
			>
				<div
					style={{
						position: "relative",

						width: "calc(50% - 4px)"
					}}
				>
					<Input
						prefix={<SvgIconSearch />}
						className="defaultInput"
						autoComplete="off"
						value={filterCustomer}
						onChange={(e: any) => {
							console.log(e);
							setFilterCustomer(e.target.value);

							if (e.target.value.length > 0) {
								setShowCustomers(true);
							} else {
								setShowCustomers(false);
							}
						}}
						onClick={() => setShowCustomers(false)}
						placeholder="Nhập thông tin khách hàng"
					/>
					<SvgIconPlus
						style={{ transform: "scale(0.8)", position: "absolute", right: "6px", top: "6px", zIndex: "97" }}
						fill="#000"
						onClick={() => {
							setOpenModalCustomer(true);
							setIsCreateCustomer(false);
						}}
					/>
					{showCustomers && (
						<div
							style={{
								zIndex: "95",
								position: "absolute",
								width: "100%",
								padding: "8px",
								background: "#fff",
								border: "1px solid rgb(99,99,99)",
								borderRadius: "5px"
							}}
						>
							<div
								className="center"
								style={{
									justifyContent: "flex-start",
									padding: "4px",
									background: "rgb(242,242,242)",
									color: "rgb(47,129,174)",
									cursor: "pointer"
								}}
								onClick={() => {
									setShowCustomers(false);
									setOpenModalCustomer(true);
									setIsCreateCustomer(true);
									formModalCustomer.resetFields();
									formCreate.setFieldsValue({
										b_phone: undefined,
										b_fullname: undefined
									});
								}}
							>
								<span
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										height: "16px",
										width: "16px",
										color: "white",
										background: "rgb(47,129,174)",
										borderRadius: "50%",
										marginRight: "4px"
									}}
								>
									+
								</span>
								Thêm khách hàng mới
							</div>
							{listCustomers.length > 0 &&
								listCustomers.map((customer: any) => (
									<div
										style={{ cursor: "pointer" }}
										onClick={() => {
											setFilterCustomer(customer.phone);
											setSelectedCustomer({
												total_point: customer?.total_point,
												name: customer.fullname,
												phone: customer.phone
											});
											formCreate.setFieldValue("b_phone", customer.phone);
											setShowCustomers(false);
										}}
									>
										{customer.phone} - {customer.fullname}
									</div>
								))}
						</div>
					)}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
							color: "rgb(149,157,165)",
							marginTop: "8px"
						}}
					>
						<div>Tên khách hàng</div>
						<div>{selectedCustomer?.name}</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
							color: "rgb(149,157,165)",
							marginTop: "4px"
						}}
					>
						<div>Số điện thoại</div>
						<div>{selectedCustomer?.phone}</div>
					</div>
					{selectedCustomer?.phone && (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%",
								color: "rgb(149,157,165)",
								marginTop: "4px"
							}}
						>
							<div>
								Điểm tích lũy: <span style={{ color: "red" }}>{selectedCustomer?.total_point || "0"}</span> điểm
							</div>
							<div>
								Giá trị quy đổi:{" "}
								<span style={{ color: "red" }}>
									{selectedCustomer?.total_point ? convertNumberWithCommas(selectedCustomer?.total_point * 1000) : "0"}
								</span>{" "}
								VNĐ
							</div>
						</div>
					)}

					<div style={{ position: "absolute", bottom: "0", width: "100%" }}>
						<Input.TextArea
							value={notes}
							onChange={(e: any) => setNotes(e.target.value)}
							placeholder="Ghi chú thanh toán"
							style={{ marginBottom: "8px", borderRadius: "5px" }}
						/>
					</div>
				</div>
				<div style={{ paddingBottom: "36px", width: "calc(50% - 4px)", position: "relative" }}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							margin: "12px 0 4px 0"
						}}
					>
						<span>
							Tổng tiền&nbsp;
							<span style={{ fontWeight: "bold" }}>
								({bills.find((x: any) => x.id === selectedBill)?.listProduct?.length || 0} sản phẩm)
							</span>
						</span>
						<span style={{ paddingRight: "12px" }}>
							{convertNumberWithCommas(calTotalPrice(bills.find((x: any) => x.id === selectedBill)?.listProduct))}
						</span>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							margin: "4px 0"
						}}
					>
						<span>Mã giảm giá (F6)</span>
						<span style={{ paddingRight: "12px" }}>{saleValue && convertNumberWithCommas(saleValue)}</span>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							margin: "4px 0"
						}}
					>
						<span>Khuyến mãi (F7)</span>
						<span style={{ paddingRight: "12px" }}>0</span>
					</div>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "4px 0" }}>
						<span>Khách phải trả</span>
						<span style={{ paddingRight: "12px" }}>
							{bills?.length > 0 && saleValue
								? convertNumberWithCommas(
										calTotalPrice(bills?.find((x: any) => x.id === selectedBill)?.listProduct) - saleValue
								  )
								: convertNumberWithCommas(calTotalPrice(bills?.find((x: any) => x.id === selectedBill)?.listProduct))}
						</span>
					</div>
					<div style={{ marginTop: "4px" }}>
						<Radio.Group defaultValue={1} onChange={(e: any) => setTypePayment(e.target.value)}>
							<Radio value={1}>Tiền mặt</Radio>
							<Radio value={2}>Chuyển khoản</Radio>
							<Radio value={3}>Quẹt thẻ</Radio>
						</Radio.Group>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							margin: "4px 0"
						}}
					>
						<span>Tiền khách đưa</span>
						<div style={{ height: "31px", width: "50%" }}>
							<InputNumber
								value={money}
								min={0}
								max={1000000000}
								onChange={(e: any) => {
									if (e >= 1000000000) {
										setMoney(1000000000);
									} else {
										setMoney(e);
										setWillConvert(true);
									}
								}}
								formatter={(value: any) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
								style={{ padding: "0 12px!important" }}
								className="defaultInputNumber"
								disabled={!(bills.find((x: any) => x.id === selectedBill)?.listProduct?.length > 0)}
							/>
						</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-start",
							margin: "8px 0 0 0",
							background: "rgb(212,212,212)",
							borderRadius: "5px",
							padding: "4px",
							minHeight: "40px"
						}}
					>
						{listPrices.map((x: any) => (
							<div
								style={{
									cursor: "pointer",
									padding: "2px 6px",
									background: "#fff",
									display: "inline-block",
									borderRadius: "5px",
									marginRight: "6px"
								}}
								onClick={() => {
									setMoney(x);
									setWillConvert(false);
								}}
							>
								{x}
							</div>
						))}
					</div>
					<div
						style={{
							position: "absolute",
							bottom: "0px",
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between"
						}}
					>
						<span style={{ fontWeight: "600" }}>
							Tiền thừa của khách (vnđ):&nbsp;
							<span style={{ color: "rgb(0,117,164)" }}>
								{Number(money?.toString().replaceAll(",", "")) > 0
									? convertNumberWithCommas(
											(
												Number(money?.toString().replaceAll(",", "")) -
												calTotalPrice(bills.find((x: any) => x.id === selectedBill)?.listProduct) +
												(saleValue ? saleValue : 0)
											)?.toString()
									  )
									: 0}
							</span>
						</span>
						<div className="defaultButton" onClick={onSubmitCreate}>
							THANH TOÁN
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentInfo;
