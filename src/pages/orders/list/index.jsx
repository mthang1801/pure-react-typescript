import { DatePicker, Form, Input, Modal, Select, Table } from "antd";
import { removeSign } from "src/utils/helpers/functions/textUtils";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Svg193 from "src/assets/svg/Svg193";
import SvgBin from "src/assets/svg/SvgBin";
import SvgCompleteOrder from "src/assets/svg/SvgCompleteOrder";
import SvgFilter from "src/assets/svg/SvgFilter";
import SvgIconFilter from "src/assets/svg/SvgIconFilter";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgImport from "src/assets/svg/SvgImport";
import SvgPrint from "src/assets/svg/SvgPrint";
import SvgTransport from "src/assets/svg/SvgTransport";
import SvgWaitPackage from "src/assets/svg/SvgWaitPackage";
import NavSearch from "src/components/navSearch/NavSearch";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import {
	completedStatus,
	confirmedStatus,
	failShipStatus,
	inProgressStatus,
	packagedStatus,
	platformsList,
	shippingStatus,
	totalStatus
} from "src/constants";
import { getListOrders, updateOrdersStatus } from "src/services/actions/orders.actions";
import { API_URL, API_URL_MASTER } from "src/services/api/config";
import { AppState } from "src/types";
import { convertNumberWithCommas, getAddressString } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import { columnsChildData, columnsData, dataOrders } from "./data";
import ComponentToPrintA4POS from "src/pages/print/ComponentToPrintA4POS";
import PrintBillA4POS from "src/components/filePrint/PrintBillA4POS";
import { useReactToPrint } from "react-to-print";
import PrintBillA4Order from "src/components/filePrint/PrintBillA4Order";

const OrdersList = () => {
	const history = useHistory();
	const [formSearch] = Form.useForm();
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [openModalChangeStatus, setOpenModalChangeStatus] = useState(false);
	const [oldSelected, setOldSelected] = useState(undefined);
	const [dataTab, setDataTab] = useState({
		completedCount: 0,
		confirmedCount: 0,
		failShipCount: 0,
		inProgressCount: 0,
		packagedCount: 0,
		shippingCount: 0,
		completedAmount: 0,
		confirmedAmount: 0,
		failShipAmount: 0,
		inProgressAmount: 0,
		packagedAmount: 0,
		shippingAmount: 0
	});
	const { stateListOrder, stateUpdateOrdersStatus } = useSelector((e) => e.ordersReducer);
	const [selectedTab, setSelectedTab] = useState(undefined);
	const [selectedStatus, setSelectedStatus] = useState(undefined);
	const [selectedUpdateStatus, setSelectedUpdateStatus] = useState(1);

	const [statusList, setStatusList] = useState([]);
	const [paramsFilter, setParamsFilter] = useState({
		q: undefined,
		order_status_id: undefined,
		platform_id: undefined,
		payment_status: undefined,
		payment_method_id: undefined,
		from_date: undefined,
		to_date: undefined,
		page: 1,
		limit: 10
	});

	const [openNav, setOpenNav] = useState(false);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	useEffect(() => {
		if (!features.includes("MODULES_ORDER__ORDERS__VIEWS")) {
			notifyWarning("Bạn không được quyền truy cập");
			history.push("/");
		} else {
			if (!stateUpdateOrdersStatus.isLoading) {
				if (selectedStatus === 4) {
					dispatch(getListOrders({ ...paramsFilter, order_status_id: 3, payment_status: 3, page: 1 }));
				} else {
					dispatch(
						getListOrders({
							...paramsFilter,
							order_status_id: selectedStatus,
							payment_status: oldSelected,
							page: 1
						})
					);
				}
			}
		}
	}, [paramsFilter, stateUpdateOrdersStatus.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateListOrder;
		if (success) {
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateListOrder.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateOrdersStatus;
		if (success) {
			notifySuccess("Chuyển trạng thái đơn thành công");
			setOpenModalChangeStatus(false);
			setSelectedRowsKey([]);
			setSelectedRowById([]);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateOrdersStatus.isLoading]);

	useEffect(() => {
		if (selectedStatus) {
			console.log("2412341", oldSelected);
			if (selectedStatus === 4) {
				setParamsFilter({ ...paramsFilter, order_status_id: 3, payment_status: 3, page: 1 });
				formSearch.setFieldsValue({
					payment_status: 3
				});
			} else {
				setParamsFilter({ ...paramsFilter, order_status_id: selectedStatus, payment_status: oldSelected, page: 1 });
				formSearch.setFieldsValue({
					payment_status: oldSelected
				});
			}
			setSelectedRowsKey([]);
			setSelectedRowById([]);
		}
	}, [selectedStatus]);
	useEffect(() => {
		if (selectedTab === 1) {
			setStatusList(inProgressStatus);
			setSelectedStatus(1);
		}
		if (selectedTab === 2) {
			setStatusList(confirmedStatus);
			setSelectedStatus(3);
		}
		if (selectedTab === 3) {
			setStatusList(packagedStatus);
			setSelectedStatus(5);
		}
		if (selectedTab === 4) {
			setStatusList(shippingStatus);
			setSelectedStatus(7);
		}
		if (selectedTab === 5) {
			setStatusList(failShipStatus);
			setSelectedStatus(13);
		}
		if (selectedTab === 6) {
			setStatusList(completedStatus);
			setSelectedStatus(15);
		}
	}, [selectedTab]);

	useEffect(() => {
		const getCities = async () => {
			try {
				let headers = {
					"Content-Type": "application/json"
				};
				let token = localGetToken();
				let uuid = localGetAuthUUID();
				let params = { ...paramsFilter };
				if (selectedStatus === 4) {
					console.log("params", params);
					params.payment_status = oldSelected;
				}
				delete params.order_status_id;
				if (token) {
					headers.Authorization = token;
					headers["x-auth-uuid"] = uuid;
				}
				const { data } = await axios.get(`${API_URL}/orders/report-order-statuses`, {
					params: params,
					headers: headers
				});
				if (data) {
					setDataTab(data?.data);
				}
			} catch (error) {}
		};
		if (!stateUpdateOrdersStatus.isLoading) {
			getCities();
		}
	}, [paramsFilter, stateUpdateOrdersStatus.isLoading]);

	const onChangePaging = (page, pageSize) => {
		setParamsFilter({
			...paramsFilter,
			page: page,
			limit: pageSize
		});
	};

	const [selectedRowsKey, setSelectedRowsKey] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowById, setSelectedRowById] = useState([]);

	const rowSelection = {
		selectedRowKeys: selectedRowsKey,
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRowById(selectedRows[0]?.customer_id);
			setSelectedRows(selectedRows);
			setSelectedRowsKey(selectedRowKeys);
		},
		getCheckboxProps: (record) => ({}),
		hideSelectAll: true
	};

	const handleChangeStatus = (status) => {
		setOpenModalChangeStatus(true);
		setSelectedUpdateStatus(status);
	};
	const submitSearch = (values) => {
		setParamsFilter({
			...paramsFilter,
			q: values?.q,
			platform_id: values?.platform_id,
			payment_status: values?.payment_status,
			payment_method_id: values?.payment_method_id,
			from_date: values?.orderTimes ? moment(values.orderTimes[0]).format("YYYY-MM-DD") : undefined,
			to_date: values?.orderTimes ? moment(values.orderTimes[1]).format("YYYY-MM-DD") : undefined,
			page: 1,
			limit: 10
		});
	};

	const [selectedOrder, setSelectedOrder] = useState([]);
	const componentRef = useRef();
	const [loadingPrint, setLoadingPrint] = useState(false);
	const printDataCallback = async (e) => {
		await setSelectedOrder(e);
		handlePrint();
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

	const expandedRowRender = (record) => {
		return (
			<div className="ordersPage__expanded">
				<div className="ordersPage__expanded__left">
					<TableStyledAntd
						rowKey="id"
						dataSource={record?.details || []}
						bordered
						columns={columnsChildData()}
						pagination={false}
						widthCol1="50px"
						widthCol2="calc(36% - 50px)"
						widthCol3="11%"
						widthCol4="14%"
						widthCol5="16%"
						widthCol6="18%"
					/>
					<div className="ordersPage__expanded__left__information">
						<div className="ordersPage__expanded__left__information__row">
							<div className="ordersPage__expanded__left__information__row__label">Tiền hàng (vnđ):</div>
							<div className="ordersPage__expanded__left__information__row__value">
								{record?.temp_total_money_amount && convertNumberWithCommas(record?.temp_total_money_amount)}
							</div>
						</div>
						<div className="ordersPage__expanded__left__information__row">
							<div className="ordersPage__expanded__left__information__row__label">Phí vận chuyển (vnđ):</div>
							<div className="ordersPage__expanded__left__information__row__value">
								{record?.shipping_fee && convertNumberWithCommas(record?.shipping_fee)}
							</div>
						</div>
						<div className="ordersPage__expanded__left__information__row">
							<div className="ordersPage__expanded__left__information__row__label">Khuyến mãi</div>
							<div className="ordersPage__expanded__left__information__row__value">
								{record?.total_discount_money_amount && convertNumberWithCommas(record?.total_discount_money_amount)}
							</div>
						</div>
						<div className="ordersPage__expanded__left__information__row__total">
							<div className="ordersPage__expanded__left__information__row__label">Tổng tiền</div>
							<div className="ordersPage__expanded__left__information__row__value">
								{record?.final_total_money_amount && convertNumberWithCommas(record?.final_total_money_amount)}
							</div>
						</div>
					</div>
				</div>
				<div className="ordersPage__expanded__right">
					<h4>Thông tin giao hàng</h4>

					<div className="ordersPage__expanded__right__information">
						<div className="ordersPage__expanded__right__information__label" style={{ width: "160px" }}>
							Tên khách hàng
						</div>
						<div className="ordersPage__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.s_fullname}
						</div>
					</div>
					<div className="ordersPage__expanded__right__information">
						<div className="ordersPage__expanded__right__information__label" style={{ width: "160px" }}>
							Số điện thoại:
						</div>
						<div className="ordersPage__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.s_phone}
						</div>
					</div>
					<div className="ordersPage__expanded__right__information">
						<div className="ordersPage__expanded__right__information__label" style={{ width: "160px" }}>
							Địa chỉ:
						</div>
						<div className="ordersPage__expanded__right__information__value" style={{ textAlign: "right" }}>
							{getAddressString(record?.s_address, record?.s_ward, record?.s_district, record?.s_province)}
						</div>
					</div>
					<div className="ordersPage__expanded__right__information">
						<div className="ordersPage__expanded__right__information__label" style={{ width: "160px" }}>
							Đơn vị vận chuyển:
						</div>
						<div className="ordersPage__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.shipping_unit_name}
						</div>
					</div>
					<div className="ordersPage__expanded__right__information">
						<div className="ordersPage__expanded__right__information__label" style={{ width: "160px" }}>
							Dịch vụ:
						</div>
						<div className="ordersPage__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.delivery_service_name}
						</div>
					</div>
					<div className="ordersPage__expanded__right__information">
						<div className="ordersPage__expanded__right__information__label" style={{ width: "160px" }}>
							Hình thức thanh toán:
						</div>
						<div className="ordersPage__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.delivery_payment_method_name}
						</div>
					</div>
					<div className="ordersPage__expanded__right__information">
						<div className="ordersPage__expanded__right__information__label" style={{ width: "160px" }}>
							Mã vận đơn:
						</div>
						<div className="ordersPage__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.delivery_code || "-"}
						</div>
					</div>
					<div style={{ padding: "6px" }}>
						<div className="ordersPage__expanded__right__information__label" style={{ width: "120px" }}>
							Ghi chú đơn hàng
						</div>
						<div className="ordersPage__expanded__right__information__textarea">{record?.notes}</div>
					</div>
				</div>
			</div>
		);
	};
	return (
		<div className="mainPages ordersPage">
			<OverlaySpinner open={openNav} onClickCallback={() => setOpenNav(false)} />
			<OverlaySpinner open={stateUpdateOrdersStatus.isLoading} text="Đang chuyển trạng thái đơn..." />
			<Modal
				open={openModalChangeStatus}
				title={`Xác nhận đổi sang trạng thái đơn`}
				onOk={() => {
					let paramsKey = [];
					for (let i = 0; i < selectedRowsKey.length; i++) {
						paramsKey.push(selectedRowsKey[i]);
					}
					dispatch(
						updateOrdersStatus({
							ids: paramsKey,
							current_order_status_id: selectedStatus,
							target_order_status_id: selectedUpdateStatus
						})
					);
				}}
				onCancel={() => {
					setOpenModalChangeStatus(false);
				}}
			>
				<div>
					Xác nhận chuyển trạng thái các đơn sang trạng thái&nbsp;
					<span style={{ color: "red" }}>{totalStatus.find((x) => x.value === selectedUpdateStatus)?.label}</span>
				</div>
			</Modal>
			<SubHeader breadcrumb={[{ text: "Quản lý đơn hàng" }, { text: "Đơn hàng" }]} />
			<Form
				className="ordersPage__search"
				id="formSearch"
				form={formSearch}
				layout="vertical"
				onFinish={submitSearch}
				style={{ padding: "8px 16px 16px 16px" }}
			>
				<NavSearch open={openNav}>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<h4>Tìm kiếm nâng cao</h4>
						<h4 style={{ cursor: "pointer", transform: "scale(1.5)" }} onClick={() => setOpenNav(false)}>
							X
						</h4>
					</div>
					<div>
						<Form.Item name="payment_method_id" label="Hình thức thanh toán" style={{ width: "100%", margin: "0" }}>
							<Select
								options={[
									{
										label: "Tiền mặt",
										value: 1
									},
									{
										label: "Chuyển khoản",
										value: 2
									},
									{
										label: "Quẹt thẻ",
										value: 3
									},
									{
										label: "COD",
										value: 4
									}
								]}
								className="defaultSelect"
								filterOption={(input, option) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
							/>
						</Form.Item>
						<Form.Item name="payment_status" label="Trạng thái thanh toán" style={{ width: "100%", margin: "0" }}>
							<Select
								disabled={selectedStatus === 4}
								options={[
									{
										label: "Đã thanh toán",
										value: 3
									},
									{
										label: "Chưa thanh toán",
										value: 1
									},
									{
										label: "Thanh toán một phần",
										value: 2
									},
									{
										label: "Thanh toán thất bại",
										value: 4
									}
								]}
								className="defaultSelect"
								filterOption={(input, option) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
								onChange={(e) => setOldSelected(e)}
							/>
						</Form.Item>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<button className="searchButton" style={{ width: "calc(50% - 4px)" }}>
								<SvgIconSearch />
								&nbsp; Tìm kiếm
							</button>
							<div
								className="searchButton"
								style={{ width: "calc(50% - 4px)" }}
								onClick={() => {
									formSearch.resetFields();
									if (selectedStatus === 4) {
										formSearch.setFieldValue("payment_status", 3);
									}
									setSelectedTab(undefined);
									setSelectedStatus(undefined);
									setStatusList([]);
									setOldSelected(undefined);
									setParamsFilter({
										...paramsFilter,
										q: undefined,
										platform_id: undefined,
										payment_status: selectedStatus === 4 ? 3 : undefined,
										payment_method_id: undefined,
										from_date: undefined,
										to_date: undefined,
										page: 1,
										limit: 10
									});
								}}
							>
								<SvgIconRefresh />
								&nbsp;Đặt lại
							</div>
						</div>
					</div>
				</NavSearch>
				<div className="ordersPage__search__form">
					<Form.Item name="payment_status" hidden={false}></Form.Item>
					<Form.Item name="order_status_id" hidden={false}></Form.Item>

					<Form.Item
						name="q"
						label="Nội dung"
						className="ordersPage__search__form__item"
						style={{ width: "calc(((100% - 398px) / 5) *2)", margin: "0" }}
					>
						<Input className="defaultInput" placeholder="Nhập mã, sđt, tên khách hàng" />
					</Form.Item>
					<Form.Item
						name="orderTimes"
						label="Thời gian tạo đơn"
						className="ordersPage__search__form__item"
						style={{ width: "calc(((100% - 398px) / 5) *2)", margin: "0" }}
					>
						<DatePicker.RangePicker className="defaultInput" />
					</Form.Item>
					<Form.Item name="platform_id" label="Sàn" style={{ width: "calc(((100% - 398px) / 5))", margin: "0" }}>
						<Select options={platformsList} className="defaultSelect" placeholder="Tất cả" />
					</Form.Item>
					<div className="searchButton" style={{ marginTop: "22px" }} onClick={() => formSearch.submit()}>
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp; Tìm kiếm
					</div>
					<div
						className="searchButton"
						style={{ marginTop: "22px" }}
						onClick={() => {
							formSearch.resetFields();
							if (selectedStatus === 4) {
								formSearch.setFieldValue("payment_status", 3);
							}
							setSelectedTab(undefined);
							setSelectedStatus(undefined);
							setStatusList([]);
							setOldSelected(undefined);
							setParamsFilter({
								...paramsFilter,
								q: undefined,
								platform_id: undefined,
								payment_status: selectedStatus === 4 ? 3 : undefined,
								payment_method_id: undefined,
								from_date: undefined,
								to_date: undefined,
								page: 1,
								limit: 10
							});
						}}
					>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</div>
					<div className="searchButton" style={{ marginTop: "22px" }} onClick={() => setOpenNav(true)}>
						<SvgFilter style={{ transform: "scale(0.6)" }} />
						&nbsp; Lọc nâng cao
					</div>
				</div>
			</Form>
			<div className="ordersPage__information">
				<div
					className={`ordersPage__information__item ${selectedTab === 1 ? "active" : ""}`}
					onClick={() => setSelectedTab(1)}
				>
					<div className="ordersPage__information__item__main">
						<div className="ordersPage__information__item__label">Chờ xử lý</div>
						<div className="ordersPage__information__item__main__count"> {dataTab?.inProgressCount}</div>
					</div>
					<div className="ordersPage__information__item__price">
						{dataTab?.inProgressAmount ? convertNumberWithCommas(dataTab?.inProgressAmount) : 0}
					</div>
				</div>
				<div
					className={`ordersPage__information__item ${selectedTab === 2 ? "active" : ""}`}
					onClick={() => setSelectedTab(2)}
				>
					<div className="ordersPage__information__item__main">
						<div className="ordersPage__information__item__label">Đã xác nhận</div>
						<div className="ordersPage__information__item__main__count">
							{" "}
							{dataTab?.confirmedAndPaymentSuccessCount}
						</div>
					</div>
					<div className="ordersPage__information__item__price">
						{dataTab?.confirmedAndPaymentSuccessAmount
							? convertNumberWithCommas(dataTab?.confirmedAndPaymentSuccessAmount)
							: 0}
					</div>
				</div>
				<div
					className={`ordersPage__information__item ${selectedTab === 3 ? "active" : ""}`}
					onClick={() => setSelectedTab(3)}
				>
					<div className="ordersPage__information__item__main">
						<div className="ordersPage__information__item__label" onClick={() => console.log(dataTab)}>
							Đóng gói
						</div>
						<div className="ordersPage__information__item__main__count"> {dataTab?.packageCount}</div>
					</div>
					<div className="ordersPage__information__item__price">
						{dataTab?.packageAmount ? convertNumberWithCommas(dataTab?.packageAmount) : 0}
					</div>
				</div>
				<div
					className={`ordersPage__information__item ${selectedTab === 4 ? "active" : ""}`}
					onClick={() => setSelectedTab(4)}
				>
					<div className="ordersPage__information__item__main">
						<div className="ordersPage__information__item__label">Giao hàng</div>
						<div className="ordersPage__information__item__main__count"> {dataTab?.shippingCount}</div>
					</div>
					<div className="ordersPage__information__item__price">
						{dataTab?.shippingAmount ? convertNumberWithCommas(dataTab?.shippingAmount) : 0}
					</div>
				</div>
				<div
					className={`ordersPage__information__item ${selectedTab === 5 ? "active" : ""}`}
					onClick={() => setSelectedTab(5)}
				>
					<div className="ordersPage__information__item__main">
						<div className="ordersPage__information__item__label">Chuyển hoàn</div>
						<div className="ordersPage__information__item__main__count">{dataTab?.failShipCount}</div>
					</div>
					<div className="ordersPage__information__item__price">
						{dataTab?.failShipAmount ? convertNumberWithCommas(dataTab?.failShipAmount) : 0}
					</div>
				</div>
				<div
					className={`ordersPage__information__item ${selectedTab === 6 ? "active" : ""}`}
					onClick={() => setSelectedTab(6)}
				>
					<div className="ordersPage__information__item__main">
						<div className="ordersPage__information__item__label">Hoàn thành</div>
						<div className="ordersPage__information__item__main__count">{dataTab?.completedCount}</div>
					</div>
					<div className="ordersPage__information__item__price">
						{dataTab?.completedAmount ? convertNumberWithCommas(dataTab?.completedAmount) : 0}
					</div>
				</div>
			</div>
			<div className="ordersPage__table">
				<div className="ordersPage__table__buttons">
					<div className="ordersPage__table__buttons__left">
						{statusList.length > 0 &&
							statusList.map((x) => (
								<div
									onClick={() => setSelectedStatus(x.value)}
									className={x.value === selectedStatus ? "defaultButton" : "searchButton"}
								>
									{x.label}&nbsp; ({x.value === 1 && dataTab?.countNewOrder}
									{x.value === 2 && dataTab?.failPaymentCount}
									{x.value === 3 && dataTab?.confirmedCount}
									{x.value === 4 && dataTab?.successPaymentCount}
									{x.value === 5 && dataTab?.waitingPackagedCount}
									{x.value === 6 && dataTab?.packagedCount}
									{x.value === 7 && dataTab?.waitingForGoodsCount}
									{x.value === 8 && dataTab?.transportingCount}
									{x.value === 9 && dataTab?.deliveryCount}
									{x.value === 10 && dataTab?.successfulDeliveryCount}
									{x.value === 11 && dataTab?.errorDeliveryCount}
									{x.value === 12 && dataTab?.waitingDeliveryAgain}
									{x.value === 13 && dataTab?.movingBackCount}
									{x.value === 14 && dataTab?.movedBackCount}
									{x.value === 15 && dataTab?.completedCount}
									{x.value === 16 && dataTab?.cancelledCount})
								</div>
							))}
					</div>
					<div className="ordersPage__table__buttons__right">
						<div onClick={() => console.log("213132", paramsFilter)} className="searchButton">
							<SvgImport style={{ transform: "scale(0.7)" }} />
							&nbsp;Xuất file
						</div>
						<div onClick={() => printDataCallback(selectedRows)} className="searchButton">
							<SvgPrint style={{ transform: "scale(0.7)" }} />
							&nbsp;In
						</div>
						{features.includes("MODULES_ORDER__ORDERS__UPDATE_STATUS") && selectedTab === 1 && (
							<>
								<div
									onClick={() =>
										selectedRowsKey.length > 0
											? handleChangeStatus(16)
											: notifyWarning("Vui lòng chọn ít nhất 1 đơn hàng")
									}
									className="searchButton"
								>
									<SvgBin style={{ transform: "scale(0.9)" }} />
									&nbsp;Huỷ
								</div>
								<div
									onClick={() =>
										selectedRowsKey.length > 0
											? handleChangeStatus(3)
											: notifyWarning("Vui lòng chọn ít nhất 1 đơn hàng")
									}
									className="searchButton"
								>
									<SvgCompleteOrder style={{ transform: "scale(0.7)" }} />
									&nbsp;Xác nhận
								</div>
							</>
						)}
						{features.includes("MODULES_ORDER__ORDERS__UPDATE_STATUS") && selectedTab === 2 && (
							<>
								{selectedStatus !== 4 && (
									<div
										onClick={() =>
											selectedRowsKey.length > 0
												? handleChangeStatus(16)
												: notifyWarning("Vui lòng chọn ít nhất 1 đơn hàng")
										}
										className="searchButton"
									>
										<SvgBin style={{ transform: "scale(0.9)" }} />
										&nbsp;Huỷ
									</div>
								)}
								<div
									onClick={() =>
										selectedRowsKey.length > 0
											? handleChangeStatus(5)
											: notifyWarning("Vui lòng chọn ít nhất 1 đơn hàng")
									}
									className="searchButton"
								>
									<SvgWaitPackage style={{ transform: "scale(0.8)" }} />
									&nbsp;Chờ đóng gói
								</div>
							</>
						)}
						{features.includes("MODULES_ORDER__ORDERS__UPDATE_STATUS") && selectedTab === 3 && (
							<>
								<div
									onClick={() =>
										selectedRowsKey.length > 0
											? handleChangeStatus(16)
											: notifyWarning("Vui lòng chọn ít nhất 1 đơn hàng")
									}
									className="searchButton"
								>
									<SvgBin style={{ transform: "scale(0.9)" }} />
									&nbsp;Huỷ
								</div>
								{selectedStatus === 5 && (
									<div
										onClick={() =>
											selectedRowsKey.length > 0
												? handleChangeStatus(6)
												: notifyWarning("Vui lòng chọn ít nhất 1 đơn hàng")
										}
										className="searchButton"
									>
										<Svg193 style={{ transform: "scale(0.8)" }} />
										&nbsp;Đã đóng gói
									</div>
								)}
								{selectedStatus === 6 && (
									<div
										onClick={() =>
											selectedRowsKey.length > 0
												? handleChangeStatus(7)
												: notifyWarning("Vui lòng chọn ít nhất 1 đơn hàng")
										}
										className="searchButton"
									>
										<SvgTransport style={{ transform: "scale(0.8)" }} />
										&nbsp;Chuyển đơn vị vận chuyển
									</div>
								)}
							</>
						)}
					</div>
				</div>
				<TableStyledAntd
					style={{ marginTop: "8px" }}
					rowKey="id"
					dataSource={stateListOrder?.data?.data || []}
					bordered
					rowSelection={rowSelection}
					pagination={false}
					expandable={{
						expandedRowRender
					}}
					columns={columnsData({ features })}
					widthCol1="2.5%"
					widthCol2="2.5%"
					widthCol4="16%"
					widthCol5="140px"
					widthCol6="16%"
					widthCol7="16%"
					widthCol8="12%"
				/>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateListOrder?.data?.paging?.total} đơn `}
					total={stateListOrder?.data?.paging?.total}
				/>
			</div>
			<div style={{ position: "fixed", top: "100%", opacity: "0", zIndex: "102" }}>
				<ComponentToPrintA4POS ref={componentRef} setLoaded={setLoadingPrint}>
					<PrintBillA4Order selectedOrders={selectedOrder} />
				</ComponentToPrintA4POS>
			</div>
		</div>
	);
};

export default OrdersList;
