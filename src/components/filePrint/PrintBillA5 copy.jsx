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
const PrintBillA5 = ({ selectedOrders }) => {
	console.log("123123", selectedOrders);
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
						<div
							className="page"
							style={{ marginBottom: "16px", position: "relative", border: "solid 1px #000" }}
							key={index}
						>
							<div style={{ width: "100%", height: "100%", border: "solid 1px #000" }}>
								{/* <div className="backgroundPrint"></div> */}
								<div
									className="svgSmall borderBottom "
									style={{
										position: "relative",
										height: "80px"
									}}
								>
									<SvgLogoLoginOMS style={{ position: "absolute", top: "8px", left: "-110px" }} />
									<div
										style={{
											position: "absolute",
											top: "0",
											right: "0",
											width: "55%",
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											flexWrap: "wrap",
											alignItems: "center",
											padding: "0 4px"
										}}
									>
										<Barcode
											className="barcodePrint"
											value={selectedOrder?.delivery_code}
											width={1}
											height={20}
											format="CODE128"
											displayValue={false}
											font="unset"
											fontSize={12}
											background="transparent"
											lineColor="#000000"
											textAlign="justify"
											textMargin={4}
										/>
										<div style={{ width: "100%", marginTop: "-4px", fontSize: "10px", lineHeight: "14px" }}>
											Mã vận đơn: {selectedOrder?.delivery_code}
										</div>
										<div style={{ width: "100%", marginTop: "4px", fontSize: "10px", lineHeight: "12px" }}>
											Mã đơn hàng: {selectedOrder?.order_code}
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
								<div
									className="borderBottom "
									style={{
										height: "80px",
										display: "flex",
										justifyContent: "space-between"
									}}
								>
									<div
										style={{
											width: "50%",
											display: "flex",
											flexWrap: "wrap",
											padding: "4px"
										}}
										className="borderRight"
									>
										<div style={{ width: "100%", fontSize: "10px", height: "14px" }}>Người gửi:</div>
										<div style={{ width: "100%", fontSize: "10px", height: "14px" }}>{selectedOrder?.sender_name}</div>
										<div style={{ width: "100%", minHeight: "40px", fontSize: "10px" }}>{senderAddress}</div>
									</div>
									<div
										style={{
											width: "50%",
											display: "flex",
											flexWrap: "wrap",
											padding: "4px"
										}}
									>
										<div style={{ width: "100%", fontSize: "10px", height: "14px" }}>Người nhận:</div>
										<div style={{ width: "100%", fontSize: "10px", height: "14px" }}>{selectedOrder?.s_fullname}</div>
										<div style={{ width: "100%", minHeight: "40px", fontSize: "10px" }}>{receiverAddress}</div>
									</div>
								</div>
								<div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
									<div style={{ height: "375px", width: "70%" }} className="borderRight">
										<div
											className="borderBottom"
											style={{ padding: "4px", height: "calc(100% - 120px)", width: "100%" }}
										>
											<div style={{ fontSize: "11px", fontWeight: "bold" }}>
												Nội dung hàng hóa (Tổng SL sản phẩm: {selectedOrder?.details?.length})
											</div>

											{selectedOrder?.details?.length > 0 &&
												selectedOrder?.details?.map((item, index) => (
													<div style={{ fontSize: "10px" }} key={index}>
														{index + 1}.&nbsp;{item?.product_name} - SL:&nbsp;{item?.quantity}{" "}
													</div>
												))}
										</div>
										<div
											className="borderBottom"
											style={{
												padding: "4px",
												height: "20px",
												width: "100%",
												fontSize: "10px",
												display: "flex",
												alignItems: "center"
											}}
										>
											Tổng khối lượng hàng hoá: {selectedOrder?.weight}kg
										</div>
										<div style={{ padding: "4px", height: "100px", width: "100%" }}>
											<div style={{ fontSize: "12px", fontWeight: "bold" }}>Tiền thu hộ COD:</div>
											<div style={{ fontWeight: "bold", fontSize: "18px" }}>
												{selectedOrder?.cod && convertNumberWithCommas(selectedOrder?.cod?.toString())}
											</div>
											<div style={{ fontSize: "10px" }}>{selectedOrder?.delivery_payment_method_name}</div>
											<div style={{ fontSize: "10px" }}>Ghi chú: {selectedOrder?.notes}</div>
										</div>
									</div>
									<div style={{ height: "400px", width: "30%" }}>
										<div
											style={{ height: "85px", display: "flex", alignItems: "center", justifyContent: "center" }}
											className="borderBottom"
										>
											{selectedOrder?.delivery_code && <QRCode value={selectedOrder?.delivery_code} size={45} />}
										</div>
										<div
											style={{
												width: "100%",
												height: "85px",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												flexWrap: "wrap"
											}}
											className="borderBottom"
										>
											<div style={{ fontWeight: "bold", height: "14px", lineHeight: "14px", marginBottom: "-16px" }}>
												{selectedOrder?.createdAt && ISO8601Formats(selectedOrder?.createdAt)?.split(" ")[0]}
											</div>
											<div style={{ fontWeight: "bold", height: "14px", lineHeight: "14px" }}>
												{selectedOrder?.createdAt && ISO8601Formats(selectedOrder?.createdAt)?.split(" ")[1]}
											</div>
											<div style={{ height: "14px", lineHeight: "14px", marginTop: "-16px" }}>Ngày tạo đơn</div>
										</div>

										<div
											style={{ height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}
											className="borderBottom"
										>
											{selectedOrder?.warehouse_code}
										</div>
										<div style={{ height: "90px" }} className="borderBottom">
											<div
												style={{
													textAlign: "center",
													fontStyle: "italic",
													fontSize: "10px",
													fontWeight: "bold",
													height: "14px"
												}}
											>
												Chữ ký người gửi
											</div>
											<div style={{ textAlign: "center", fontSize: "8px", height: "12px" }}>
												Đồng ý với điều khoản và dịch vụ
											</div>
										</div>
										<div style={{ height: "90px" }}>
											<div
												style={{
													textAlign: "center",
													fontStyle: "italic",
													fontSize: "10px",
													fontWeight: "bold",
													height: "14px"
												}}
											>
												Chữ ký người nhận
											</div>
											<div style={{ textAlign: "center", fontSize: "8px", height: "12px" }}>
												Xác nhận hàng nguyên vẹn
											</div>
										</div>
									</div>
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

export default PrintBillA5;
