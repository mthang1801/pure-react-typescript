import React from "react";
import SvgCheckComplete from "src/assets/svg/SvgCheckComplete";
import SvgPrintFile1 from "src/assets/svg/SvgPrintFile1";
import SvgPrintFile2 from "src/assets/svg/SvgPrintFile2";
import {
	convertNumberWithCommas,
	convertStringWithCommas,
	getAddressString,
	numberWithDot
} from "src/utils/helpers/functions/textUtils";
import AxisSvg from "src/assets/images/AxisSvg.svg";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import SvgLogoLoginOMS from "src/assets/svg/SvgLogoLoginOMS";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import SvgPrintHome from "src/assets/svg/SvgPrintHome";
import SvgPrintMail from "src/assets/svg/SvgPrintMail";
import SvgPrintAddress from "src/assets/svg/SvgPrintAddress";
import SvgPrintPhone from "src/assets/svg/SvgPrintPhone";

const PrintBillA4Order = ({ selectedOrders }) => {
	console.log(selectedOrders);
	const calcPrice = (values) => {
		let total = { discount: 0, total: 0 };
		for (let i = 0; i < values?.length; i++) {
			total.discount = total.discount + values[i]?.discount;
			total.total = total.total + values[i]?.quantity * values[i]?.price;
		}
		return total;
	};
	return (
		<>
			{selectedOrders &&
				selectedOrders.length > 0 &&
				selectedOrders.map((selectedOrder, index) => {
					const senderAddress = getAddressString(
						selectedOrder?.sender_address,
						selectedOrder?.sender_ward,
						selectedOrder?.sender_district,
						selectedOrder?.sender_province
					);

					const receiverAddress = getAddressString(
						selectedOrder?.s_address,
						selectedOrder?.s_ward,
						selectedOrder?.s_district,
						selectedOrder?.s_province
					);

					return (
						<div className="pageA4" style={{ marginBottom: "16px", position: "relative" }} key={index}>
							<div style={{ width: "100%", height: "100%", padding: "10px", border: "solid 1px #000" }}>
								<div
									className="svgSmall borderBottom "
									style={{
										position: "relative",
										height: "100px"
									}}
								>
									<SvgLogoLoginOMS style={{ position: "absolute", top: "20px", left: "-50px" }} />
									<div
										style={{
											position: "absolute",
											top: "0",
											right: "0",
											width: "50%",
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											flexWrap: "wrap",
											alignItems: "center",
											padding: "0 4px"
										}}
									>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												width: "100%",
												marginTop: "12px",
												fontSize: "12px",
												lineHeight: "16px"
											}}
										>
											<SvgPrintHome />
											&nbsp;Công ty cổ phần đầu tư thương mại Nhất Tín
										</div>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												width: "100%",
												marginTop: "4px",
												fontSize: "12px",
												lineHeight: "16px"
											}}
										>
											<SvgPrintPhone />
											&nbsp;0909790909
										</div>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												width: "100%",
												marginTop: "4px",
												fontSize: "12px",
												lineHeight: "16px"
											}}
										>
											<SvgPrintMail />
											&nbsp;https://ntlogistics.vn/
										</div>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												width: "100%",
												marginTop: "4px",
												fontSize: "12px",
												lineHeight: "16px"
											}}
										>
											<SvgPrintAddress />
											&nbsp;18A Cộng Hoà, Phường 4, Tân Bình, TP.HCM
										</div>
										{/* {<QRCode value={2142134} size="45" />}sfsdfas */}
									</div>
									{/* <div
										style={{
											fontSize: "16px",
											fontWeight: "700",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											width: "75%",
											padding: "0 20px"
										}}
										className="barcodePrint"
									>
										{selectedOrder?.bill_code && (
											<Barcode
												className="barcodePrint"
												value={selectedOrder?.bill_code}
												width="1"
												height="28px"
												format="CODE128"
												displayValue="true"
												font="unset"
												fontSize="12px"
												background="transparent"
												lineColor="#000000"
												textAlign="justify"
												textMargin="4px"
											/>
										)}
										{selectedOrder?.bill_code && <QRCode value={selectedOrder?.bill_code} size="45" />}
									</div>
								</div> */}
								</div>
								<div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", lineHeight: "52px" }}>
									HÓA ĐƠN
								</div>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										height: "60px"
									}}
								>
									<div
										style={{
											width: "55%",
											display: "flex",

											flexWrap: "wrap",
											padding: "4px"
										}}
									>
										<div style={{ width: "100%", fontSize: "14px", height: "18px" }}>
											<span style={{ color: "rgb(142,142,142)", fontWeight: "bold" }}>Khách hàng:</span>&nbsp;
											{selectedOrder?.b_fullname}
										</div>
										<div style={{ width: "100%", fontSize: "14px", height: "18px", marginTop: "4px" }}>
											<span style={{ color: "rgb(142,142,142)", fontWeight: "bold" }}>Điện thoại:</span>&nbsp;
											{selectedOrder?.b_phone}
										</div>
										<div style={{ width: "100%", fontSize: "14px", height: "18px" }}>
											<span style={{ color: "rgb(142,142,142)", fontWeight: "bold" }}>Giao hàng đến:</span>&nbsp;
											{receiverAddress}
										</div>
										<div style={{ width: "100%", fontSize: "14px", height: "18px", marginTop: "4px" }}>
											<span style={{ color: "rgb(142,142,142)", fontWeight: "bold" }}>Thông tin vận chuyển:</span>&nbsp;
											{selectedOrder?.b_phone}
										</div>

										<div style={{ width: "100%", fontSize: "14px", height: "20px" }}>&nbsp;</div>
									</div>
									<div
										style={{
											width: "45%",
											display: "flex",
											flexWrap: "wrap",
											padding: "4px"
										}}
									>
										<div style={{ width: "100%", fontSize: "14px", height: "18px" }}>
											<span style={{ color: "rgb(142,142,142)", fontWeight: "bold" }}>Mã hoá đơn:</span>&nbsp;
											{selectedOrder?.b_fullname}
										</div>
										<div style={{ width: "100%", fontSize: "14px", height: "18px", marginTop: "4px" }}>
											<span style={{ color: "rgb(142,142,142)", fontWeight: "bold" }}>Ngày tạo:</span>&nbsp;
											{ISO8601Formats(selectedOrder?.created_at)}
										</div>
										<Barcode
											className="barcodePrint"
											value={selectedOrder?.order_code}
											width={1}
											height={20}
											format="CODE128"
											displayValue={true}
											font="unset"
											fontSize={12}
											background="transparent"
											lineColor="#000000"
											textAlign="justify"
											textMargin={4}
										/>
									</div>
								</div>
								<div
									style={{
										width: "100%",
										display: "flex",
										justifyContent: "space-between",
										marginTop: "50px",
										flexWrap: "wrap"
									}}
								>
									<div
										style={{
											width: "100%",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											borderBottom: "1px solid rgb(187,187,187)"
										}}
									>
										<div style={{ fontWeight: "500", width: "calc(100% - 480px)" }}>Sản phẩm</div>
										<div style={{ fontWeight: "500", width: "120px", textAlign: "right" }}>Đơn giá</div>
										<div style={{ fontWeight: "500", width: "120px", textAlign: "right" }}>Số lượng</div>
										<div style={{ fontWeight: "500", width: "120px", textAlign: "right" }}>Chiếu khấu</div>
										<div style={{ fontWeight: "500", width: "120px", textAlign: "right" }}>Thành tiền</div>
									</div>
									{selectedOrder?.details?.length > 0 &&
										selectedOrder?.details?.map((item, index) => (
											<div
												key={index}
												style={{
													width: "100%",
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
													borderBottom: "1px solid rgb(187,187,187)"
												}}
											>
												<div style={{ fontWeight: "500", width: "calc(100% - 480px)" }}>{item?.product_name}</div>
												<div style={{ fontWeight: "500", width: "120px", textAlign: "right" }}>
													{convertNumberWithCommas(item?.price?.toString())}
												</div>
												<div style={{ fontWeight: "500", width: "120px", textAlign: "right" }}>{item?.quantity}</div>
												<div style={{ fontWeight: "500", width: "120px", textAlign: "right" }}>
													{convertNumberWithCommas(item?.discount?.toString())}
												</div>
												<div style={{ fontWeight: "500", width: "120px", textAlign: "right" }}>
													{convertNumberWithCommas((item?.price * item?.quantity - item?.discount).toString())}
												</div>
											</div>
										))}
								</div>
								<div style={{ marginTop: "13px", display: "flex", justifyContent: "flex-end", flexWrap: "wrap" }}>
									<div
										style={{
											width: "400px",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between"
										}}
									>
										<div style={{ width: "50px", textAlign: "right" }}></div>
										<div style={{ fontWeight: "bold", width: "200px", textAlign: "right" }}>Tổng:</div>
										<div style={{ fontWeight: "bold", width: "150px", textAlign: "right" }}>
											{convertNumberWithCommas(calcPrice(selectedOrder?.details)?.total?.toString())}
										</div>
									</div>
									<div
										style={{ width: "400px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
									>
										<div style={{ width: "50px", textAlign: "right" }}></div>
										<div style={{ width: "200px", textAlign: "right" }}>Chiết khấu hoá đơn:</div>
										<div style={{ width: "150px", textAlign: "right" }}>
											{convertNumberWithCommas(calcPrice(selectedOrder?.details)?.discount?.toString())}
										</div>
									</div>
									<div
										style={{ width: "400px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
									>
										<div style={{ width: "50px", textAlign: "right" }}></div>
										<div style={{ width: "200px", textAlign: "right" }}>Thuế:</div>
										<div style={{ width: "150px", textAlign: "right" }}>0</div>
									</div>
									<div
										style={{
											fontWeight: "bold",
											width: "400px",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between"
										}}
									>
										<div style={{ width: "50px", textAlign: "right" }}></div>
										<div style={{ fontWeight: "bold", width: "200px", textAlign: "right" }}>TỔNG CỘNG:</div>
										<div style={{ width: "150px", textAlign: "right" }}>
											{convertNumberWithCommas(
												(
													calcPrice(selectedOrder?.details)?.total - (calcPrice(selectedOrder?.details)?.discount || 0)
												)?.toString()
											)}
										</div>
									</div>
									<div
										style={{ width: "400px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
									>
										<div style={{ width: "50px", textAlign: "right" }}></div>
										<div style={{ width: "200px", textAlign: "right" }}>Khách đưa:</div>
										<div style={{ width: "150px", textAlign: "right" }}></div>
									</div>
									<div
										style={{ width: "400px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
									>
										<div style={{ width: "50px", textAlign: "right" }}></div>
										<div style={{ width: "200px", textAlign: "right" }}>Tiền trả lại:</div>
										<div style={{ width: "150px", textAlign: "right" }}>
											{convertNumberWithCommas(
												(
													Number(selectedOrder?.money?.replaceAll(",", "")) -
													calcPrice(selectedOrder?.details)?.total +
													(calcPrice(selectedOrder?.details)?.discount || 0)
												).toString()
											)}
										</div>
									</div>
									<div
										style={{ width: "400px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
									>
										<div style={{ width: "50px", textAlign: "right" }}></div>
										<div style={{ width: "200px", textAlign: "right" }}>Phương thức thanh toán:</div>
										<div style={{ width: "150px", textAlign: "right" }}></div>
									</div>
									<div
										style={{ width: "400px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
									>
										<div style={{ width: "400px", fontWeight: "bold", fontStyle: "italic", textAlign: "right" }}>
											Đã bao gồm VAT
										</div>
									</div>
								</div>
								<div style={{ fontStyle: "italic", textAlign: "center", marginTop: "60px" }}>
									Cảm ơn và hẹn gặp lại quý khách!
								</div>
								{/* <div className="flexPrint" style={{ width: "100%",position:"relative" }}>
								<div
									className="svgSmall flexPrint width50  borderRight borderBottom borderTop padding4"
									style={{
										position:"absolute",
										height: "80px",
										left:"0",
										top:"0",
									}}
								>
									<SvgLogoLoginOMS />
								</div>
								<div
									className="flexPrint width50  borderRight borderBottom borderTop padding4"
									style={{
										position:"absolute",
										height: "80px",
										left:"50%",
										top:"0",
									}}
								>
									<div
										style={{
											fontSize: "16px",
											fontWeight: "700",
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											width: "75%",
											padding: "0 20px"
										}}
										className="barcodePrint"
									>
										{selectedOrder?.bill_code && (
											<Barcode
												className="barcodePrint"
												value={selectedOrder?.bill_code}
												width="1"
												height="28px"
												format="CODE128"
												displayValue="true"
												font="unset"
												fontSize="12px"
												background="transparent"
												lineColor="#000000"
												textAlign="justify"
												textMargin="4px"
											/>
										)}
										{selectedOrder?.bill_code && <QRCode value={selectedOrder?.bill_code} size="45" />}
									</div>
								</div>
							</div> */}
								{/*  */}
							</div>
						</div>
					);
				})}
		</>
	);
};

export default PrintBillA4Order;
