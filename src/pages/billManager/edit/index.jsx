/* eslint-disable */
import { DatePicker, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import SvgCheck from "src/assets/svg/SvgCheck";
import SvgCopy from "src/assets/svg/SvgCopy";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgMoneyPayment from "src/assets/svg/SvgMoneyPayment";
import SvgPrint from "src/assets/svg/SvgPrint";
import SvgTransport from "src/assets/svg/SvgTransport";
import SubHeader from "src/components/subHeader/SubHeader";
import { paymentMethods, transports } from "src/constants";
import colors from "src/utils/colors";
import {
	columnsChildData,
	columnsData,
	columnsDataInfo,
	columnsDataLog,
	columnsDataProducts,
	columnsHistory,
	dataOrders
} from "./data";
import printGif from "src/assets/images/print.gif";
import shipperGif from "src/assets/images/shipper.gif";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "src/services/actions/orders.actions";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError } from "src/components/notification";
import TableStyledAntd from "src/components/table/TableStyled";
import { getBillById } from "src/services/actions/bills.actions";
import { convertNumberWithCommas, getAddressString } from "src/utils/helpers/functions/textUtils";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "src/pages/print/ComponentToPrint";
import PrintBillA5 from "src/components/filePrint/PrintBillA5";

const BillsEdit = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [formInfo] = Form.useForm();
	const [formPayment] = Form.useForm();
	const paramsURL = useParams();
	const [record, setRecord] = useState(undefined);
	const [visibleShipper, setVisibleShipper] = useState(false);
	const [visiblePayment, setVisiblePayment] = useState(false);
	const [visibleHistory, setVisibleHistory] = useState(false);
	const [visiblePrint, setVisiblePrint] = useState(false);
	const [dataOrder, setDataOrder] = useState();
	const [typePrint, setTypePrint] = useState(1);
	const [activeShipped, setActiveShipped] = useState(0);
	const { stateBillById } = useSelector((e) => e.billsReducer);
	const [selectedOrder, setSelectedOrder] = useState([]);
	useEffect(() => {
		dispatch(getBillById(paramsURL.id));
	}, [paramsURL]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateBillById;
		if (success) {
			setRecord(data?.data);
			formInfo.setFieldsValue({
				delivery_payment_method_name: data?.data?.delivery_payment_method_name,
				delivery_cod_fee: data?.data?.delivery_cod_fee,
				shipping_unit_name: data?.data?.shipping_unit_name,
				delivery_service_name: data?.data?.delivery_service_name,
				cod: data?.data?.cod,
				notes: data?.data?.notes,
				warehouse_name: data?.data?.warehouse_name,
				delivery_status_name: data?.data?.delivery_status_name,
				shipping_fee: data?.data?.shipping_fee,
				delivery_request: data?.data?.delivery_request,
				delivery_payment_by: data?.data?.delivery_payment_by,
				packaged_at: data?.data?.packaged_at ? moment(data?.data?.packaged_at, "YYYY-MM-DD hh:mm:ss") : undefined
			});
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateBillById.isLoading]);

	const handleOpenShipper = () => {
		setVisibleShipper(true);
	};

	const handleCancelShipper = () => {
		setVisibleShipper(false);
	};

	const handleCancelPayment = () => {
		setVisiblePayment(false);
		formPayment.resetFields();
	};

	const checkColor = (value) => {
		switch (value) {
			case 1 || 2:
				return "statusOrder1";
			case 3 || 4:
				return "statusOrder2";
			case 5 || 6:
				return "statusOrder3";
			case 7 || 8:
				return "statusOrder4";
			case 9 || 10:
				return "statusOrder5";
			default:
				return "statusOrder1";
		}
	};
	const componentRef = useRef();
	const [loadingPrint, setLoadingPrint] = useState(false);
	const printDataCallback = async (e) => {
		console.log(e);
		await setSelectedOrder([e]);
		handlePrint();
		console.log("okokok");
	};
	const onBeforeGetContentResolve = useRef();
	const handleOnBeforeGetContent = () => {
		return new Promise((resolve) => {
			setLoadingPrint(true);
			onBeforeGetContentResolve.current = resolve;
		});
	};

	const handlePrint = useReactToPrint({
		content: () => {
			return componentRef.current;
		},
		onBeforeGetContent: handleOnBeforeGetContent,
		onAfterPrint: () => setLoadingPrint(false),
		onPrintError: () => setLoadingPrint(false)
	});

	useEffect(() => {
		if (loadingPrint) {
			onBeforeGetContentResolve.current && onBeforeGetContentResolve?.current();
		}
	}, [loadingPrint, onBeforeGetContentResolve]);
	return (
		<div className="mainPages bill__edit">
			<SubHeader
				breadcrumb={[{ text: "Quản lý đơn hàng" }, { text: "Quản lý vận đơn", link: "/bills" }, { text: "Chi tiết" }]}
			/>

			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<span style={{ color: "rgb(26,124,168", fontWeight: "600" }}>{record?.delivery_code}</span>&nbsp;&nbsp;
					<span className={checkColor(record?.delivery_status_id)}>{record?.delivery_status_name.split("-")[0]}</span>
				</div>
				<div className="searchButton" onClick={() => printDataCallback(record)}>
					<SvgPrint style={{ transform: "scale(0.7)" }} />
					&nbsp;In vận đơn
				</div>
			</div>
			<div className=" bill__edit__content" style={{ marginTop: "13px" }}>
				<div className="bill__edit__content__left">
					<div className=" bill__edit__content__left__info">
						<div className="bill__expanded__right" style={{ width: "100%" }}>
							<h4>Thông tin giao hàng</h4>

							<div className="bill__expanded__right__information">
								<div className="bill__expanded__right__information__label" style={{ width: "160px" }}>
									Mã đơn hàng:
								</div>
								<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
									{record?.delivery_code}
								</div>
							</div>
							<div className="bill__expanded__right__information">
								<div className="bill__expanded__right__information__label" style={{ width: "160px" }}>
									Người nhận:
								</div>
								<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
									{record?.s_fullname}
								</div>
							</div>
							<div className="bill__expanded__right__information">
								<div className="bill__expanded__right__information__label" style={{ width: "160px" }}>
									Số điện thoại:
								</div>
								<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
									{record?.s_phone}
								</div>
							</div>
							<div className="bill__expanded__right__information">
								<div className="bill__expanded__right__information__label" style={{ width: "160px" }}>
									Địa chỉ:
								</div>
								<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
									{getAddressString(record?.s_address, record?.s_ward, record?.s_district, record?.s_province)}
								</div>
							</div>
						</div>
					</div>

					<div className=" bill__edit__content__left__log" style={{ marginTop: "13px" }}>
						<h4>Log hành trình</h4>
						<TableStyledAntd
							style={{ marginTop: "8px" }}
							rowKey="bill_code"
							dataSource={record?.order_delivery_logs || []}
							bordered
							pagination={false}
							columns={columnsDataLog()}
							widthCol1="120px"
							widthCol2="120px"
							widthCol3="110px"
							widthCol4="120px"
							widthCol5="110px"
						/>
					</div>

					<div className=" bill__edit__content__left__products" style={{ marginTop: "13px" }}>
						<h4>Thông tin sản phẩm</h4>
						<TableStyledAntd
							style={{ marginTop: "8px" }}
							rowKey="bill_code"
							dataSource={record?.details || []}
							bordered
							pagination={false}
							columns={columnsDataProducts()}
							widthCol1="50px"
							widthCol3="100px"
							widthCol4="15%"
							widthCol5="15%"
							widthCol6="15%"
						/>
						<div className="bill__edit__content__left__products__total">
							<div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
								<div
									style={{
										marginTop: "4px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										width: "220px"
									}}
								>
									<span>Tiền hàng (vnđ):</span>
									<span>
										{" "}
										{record?.temp_total_money_amount ? convertNumberWithCommas(record?.temp_total_money_amount) : "-"}
									</span>
								</div>
							</div>
							<div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
								<div
									style={{
										marginTop: "4px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										width: "220px"
									}}
								>
									<span>Phí thu hộ COD (vnđ):</span>
									<span>{record?.delivery_cod_fee ? convertNumberWithCommas(record?.delivery_cod_fee) : "-"}</span>
								</div>
							</div>
							<div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
								<div
									style={{
										marginTop: "4px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										width: "220px"
									}}
								>
									<span>Phí vận chuyển (vnđ):</span>
									<span>{record?.shipping_fee ? convertNumberWithCommas(record?.shipping_fee) : "-"}</span>
								</div>
							</div>
							<div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
								<div
									style={{
										marginTop: "4px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										width: "220px"
									}}
								>
									<span>Chiết khấu:</span>
									<span>
										{record?.total_discount_money_amount
											? convertNumberWithCommas(record?.total_discount_money_amount)
											: "-"}
									</span>
								</div>
							</div>
							<div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
								<div
									style={{
										marginTop: "4px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										width: "220px"
									}}
								>
									<span>Khuyến mãi:</span>
									<span>{record?.voucher_value ? convertNumberWithCommas(record?.voucher_value) : "-"}</span>
								</div>
							</div>
							<div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
								<div
									style={{
										marginTop: "4px",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										width: "220px",
										fontWeight: "bold",
										borderTop: "1px solid #000",
										paddingTop: "4px"
									}}
								>
									<span>Tổng tiền:</span>
									<span>
										{record?.final_total_money_amount ? convertNumberWithCommas(record?.final_total_money_amount) : "-"}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className=" bill__edit__content__right">
					<div className=" bill__edit__content__right__info" style={{ padding: "16px 16px 26px 16px" }}>
						<div className=" bill__edit__content__right__info__header">
							<h4>Thông tin phiếu giao hàng</h4>
							<span className="statusOrder1">Đang đối soát</span>
						</div>
						<Form form={formInfo} layout="vertical">
							<Form.Item label="Kho hàng" style={{ margin: "0 0 4px 0", width: "100%" }} name="warehouse_name">
								<Select options={[]} className="defaultSelect" disabled />
							</Form.Item>
							<Form.Item label="Ngày đóng gói" style={{ margin: "0 0 4px 0", width: "100%" }} name="packaged_at">
								<DatePicker className="defaultInput" disabled />
							</Form.Item>
							<Form.Item
								label="Trạng thái đối tác"
								style={{ margin: "0 0 4px 0", width: "100%" }}
								name="delivery_status_name"
							>
								<Input className="defaultInput" disabled />
							</Form.Item>
							<Form.Item
								label="Đối tác vận chuyển"
								style={{ margin: "0 0 4px 0", width: "100%" }}
								name="shipping_unit_name"
							>
								<Select options={[]} className="defaultSelect" disabled />
							</Form.Item>
							<Form.Item label="Dịch vụ" style={{ margin: "0 0 4px 0", width: "100%" }} name="delivery_service_name">
								<Select options={[]} className="defaultSelect" disabled />
							</Form.Item>{" "}
							<Form.Item label="Tiền cước (vnđ)" style={{ margin: "0 0 4px 0", width: "100%" }} name="shipping_fee">
								<InputNumber
									disabled
									className="defaultInputNumber"
									formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								/>
							</Form.Item>
							<Form.Item
								name="delivery_payment_method_name"
								label="Người trả cước"
								style={{ margin: "0 0 4px 0", width: "100%" }}
							>
								<Input disabled className="defaultInput" />
							</Form.Item>
							<Form.Item
								label="Phí thu hộ COD (vnđ)"
								style={{ margin: "0 0 4px 0", width: "100%" }}
								name="delivery_cod_fee"
							>
								<InputNumber
									disabled
									className="defaultInputNumber"
									formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								/>
							</Form.Item>
							<Form.Item label="Thu hộ COD (vnđ)" style={{ margin: "0 0 4px 0", width: "100%" }} name="cod">
								<InputNumber
									disabled
									className="defaultInputNumber"
									formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								/>
							</Form.Item>
							<Form.Item
								label="Yêu cầu giao hàng"
								style={{ margin: "0 0 4px 0", width: "100%" }}
								name="delivery_request"
							>
								<Select
									disabled
									options={[
										{
											label: "Cho xem hàng, không cho thử",
											value: "1"
										},
										{
											label: "Cho xem hàng, cho thử",
											value: "2"
										},
										{
											label: "Không cho xem hàng",
											value: "3"
										}
									]}
									className="defaultSelect"
								/>
							</Form.Item>
							<Form.Item label="Ghi chú giao hàng" style={{ margin: "0 0 4px 0", width: "100%" }} name="notes">
								<Input.TextArea className="defaultSelect" disabled />
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
			<div style={{ position: "fixed", opacity: "0", zIndex: "102" }}>
				<ComponentToPrint ref={componentRef} setLoaded={setLoadingPrint}>
					<PrintBillA5 selectedOrders={selectedOrder} />
				</ComponentToPrint>
			</div>
		</div>
	);
};

export default BillsEdit;
