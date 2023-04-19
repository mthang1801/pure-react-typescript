import { DatePicker, Form, Input, Select, Table } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import SvgFilter from "src/assets/svg/SvgFilter";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgImport from "src/assets/svg/SvgImport";
import SvgPrint from "src/assets/svg/SvgPrint";
import PrintBillA5 from "src/components/filePrint/PrintBillA5";
import NavSearch from "src/components/navSearch/NavSearch";
import { notifyError, notifyWarning } from "src/components/notification";
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
	shippingStatus
} from "src/constants";
import ComponentToPrint from "src/pages/print/ComponentToPrint";
import { getListBill } from "src/services/actions/bills.actions";
import { getListOrders } from "src/services/actions/orders.actions";
import { api } from "src/services/api/api.index";
import { API_URL, API_URL_MASTER } from "src/services/api/config";
import { AppState } from "src/types";
import { convertNumberWithCommas, removeSign } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { columnsChildData, columnsData, dataOrders } from "./data";

const fakeData = [
	{
		bill_code: "1"
	}
];
const BillList = () => {
	const [formSearch] = Form.useForm();
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [platforms, setPlatforms] = useState([]);
	const [openNav, setOpenNav] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState([]);

	const { stateListBill } = useSelector((e) => e.billsReducer);
	const [selectedTab, setSelectedTab] = useState(1);
	const [selectedStatus, setSelectedStatus] = useState(1);
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

	useEffect(() => {
		dispatch(getListBill(paramsFilter));
	}, [paramsFilter]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateListBill;
		if (success) {
			console.log(data);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateListBill.isLoading]);

	// useEffect(() => {
	// 	setParamsFilter({ ...paramsFilter, order_status_id: selectedStatus });
	// }, [selectedStatus]);
	// useEffect(() => {
	// 	if (selectedTab === 1) {
	// 		setStatusList(inProgressStatus);
	// 		setSelectedStatus(1);
	// 	}
	// 	if (selectedTab === 2) {
	// 		setStatusList(confirmedStatus);
	// 		setSelectedStatus(3);
	// 	}
	// 	if (selectedTab === 3) {
	// 		setStatusList(packagedStatus);
	// 		setSelectedStatus(5);
	// 	}
	// 	if (selectedTab === 4) {
	// 		setStatusList(shippingStatus);
	// 		setSelectedStatus(7);
	// 	}
	// 	if (selectedTab === 5) {
	// 		setStatusList(failShipStatus);
	// 		setSelectedStatus(13);
	// 	}
	// 	if (selectedTab === 6) {
	// 		setStatusList(completedStatus);
	// 		setSelectedStatus(15);
	// 	}
	// }, [selectedTab]);
	const [listShip, setListShip] = useState([]);
	useEffect(() => {
		const getShipping = async () => {
			try {
				const response = await api.get(`${API_URL}/shipping-units`);
				let data = response;
				let fake = [];
				for (let i = 0; i < data?.data?.length; i++) {
					fake.push({
						...data?.data[i],
						value: data?.data[i]?.id,
						label: data?.data[i]?.shipping_unit
					});
				}
				setListShip(fake);
			} catch (error) {
				throw new Error(error.response.data.message);
			}
		};
		getShipping();
	}, []);

	const onChangePaging = (page, pageSize) => {
		setParamsFilter({
			...paramsFilter,

			page: page,
			limit: pageSize
		});
	};

	const submitSearch = (values) => {
		setParamsFilter({
			...paramsFilter,
			q: values?.q,
			delivery_code: values?.delivery_code,
			shipping_unit_id: values?.shipping_unit_id,
			order_status_id: values?.order_status_id,
			created_at_start: values?.times ? moment(values.times[0]).format("YYYY-MM-DD") : undefined,
			created_at_end: values?.times ? moment(values.times[1]).format("YYYY-MM-DD") : undefined,
			page: 1,
			limit: 10
		});
	};
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	const rowSelection = {
		selectedRowKeys: selectedRowKeys,
		onSelect: (_record, _selected, _selectedRows) => {
			if (_selected) {
				setSelectedRowKeys([...selectedRowKeys, _record.delivery_code]);
				setSelectedRows([...selectedRows, _record]);
			} else {
				setSelectedRowKeys([...selectedRowKeys.filter((e) => e !== _record?.delivery_code)]);
				setSelectedRows([...selectedRows.filter((e) => e?.delivery_code !== _record?.delivery_code)]);
			}
		},
		onSelectAll: (_selected, _selectedRows, _changeRows) => {
			if (_selected) {
				let _rowkeys = _changeRows.map((e) => e.delivery_code);
				let _rows = _changeRows;
				setSelectedRowKeys([...selectedRowKeys, ..._rowkeys]);
				setSelectedRows([...selectedRows, ..._rows]);
			} else {
				let _rowKeys = selectedRowKeys;
				let _rows = selectedRows;
				_changeRows.forEach((e) => {
					_rowKeys = _rowKeys.filter((item) => item !== e.delivery_code);
					_rows = _rows.filter((item) => item?.delivery_code !== e?.delivery_code);
				});

				setSelectedRowKeys(_rowKeys);
				setSelectedRows(_rows);
			}
		}
	};
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
			<div className="bill__expanded">
				<div className="bill__expanded__right">
					<h4>Thông tin phiếu giao hàng</h4>

					<div className="bill__expanded__right__information">
						<div className="bill__expanded__right__information__label" style={{ width: "160px" }}>
							Mã đơn hàng:
						</div>
						<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.order_code}
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
							Địa chỉ nhận hàng:
						</div>
						<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.s_address + ", " + record?.s_ward + ", " + record?.s_district + ", " + record?.s_province}
						</div>
					</div>
					<div className="bill__expanded__right__information">
						<div className="bill__expanded__right__information__label" style={{ width: "160px" }}>
							Đơn vị vận chuyển:
						</div>
						<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.shipping_unit_name}
						</div>
					</div>
					<div className="bill__expanded__right__information">
						<div className="bill__expanded__right__information__label" style={{ width: "160px" }}>
							Dịch vụ:
						</div>
						<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.delivery_service_name}
						</div>
					</div>
					<div className="bill__expanded__right__information">
						<div className="bill__expanded__right__information__label" style={{ width: "160px" }}>
							Tiền cước (vnđ):
						</div>
						<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.shipping_fee ? convertNumberWithCommas(record?.shipping_fee) : "-"}
						</div>
					</div>
					<div className="bill__expanded__right__information">
						<div className="bill__expanded__right__information__label" style={{ width: "160px" }}>
							Người trả cước (vnđ):
						</div>
						<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.delivery_payment_method_name}
						</div>
					</div>
					<div className="bill__expanded__right__information">
						<div className="bill__expanded__right__information__label" style={{ width: "160px" }}>
							Phí thu hộ COD (vnđ):
						</div>
						<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.cod ? convertNumberWithCommas(record?.delivery_cod_fee) : "-"}
						</div>
					</div>
					<div className="bill__expanded__right__information">
						<div className="bill__expanded__right__information__label" style={{ width: "160px" }}>
							Thu hộ COD (vnđ):
						</div>
						<div className="bill__expanded__right__information__value" style={{ textAlign: "right" }}>
							{record?.cod ? convertNumberWithCommas(record?.cod) : "-"}
						</div>
					</div>

					<div>
						<h4>Ghi chú giao hàng</h4>
						<span style={{ padding: "9px 6px" }}>{record?.notes}</span>
					</div>
				</div>
				<div className="bill__expanded__left">
					<div className="bill__expanded__left__top">
						<h4>Log hành trình</h4>
					</div>
					<div className="bill__expanded__left__bottom">
						<TableStyledAntd
							rowKey="id"
							dataSource={record?.order_delivery_logs || []}
							bordered
							columns={columnsChildData()}
							pagination={null}
							widthCol1="140px"
							widthCol2="140px"
							widthCol3="110px"
							widthCol4="140px"
							widthCol6="110px"
						/>
						<div
							style={{
								marginTop: "8px",
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-end",
								width: "100%"
							}}
						>
							<div className="searchButton">
								<SvgPrint style={{ transform: "scale(0.7)" }} />
								&nbsp;In vận đơn
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
	return (
		<div className="mainPages bill">
			<SubHeader breadcrumb={[{ text: "Quản lý đơn hàng" }, { text: "Đơn hàng" }]} />
			<OverlaySpinner open={openNav} onClickCallback={() => setOpenNav(false)} />

			<div className="bill__search">
				<Form
					id="formSearch"
					form={formSearch}
					layout="vertical"
					className="bill__search__form"
					onFinish={submitSearch}
				>
					<NavSearch open={openNav}>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<h4>Tìm kiếm nâng cao</h4>
							<h4 style={{ cursor: "pointer", transform: "scale(1.5)" }} onClick={() => setOpenNav(false)}>
								X
							</h4>
						</div>
						<div>
							<Form.Item name="shipping_unit_id" label="Đơn vị vận chuyển" style={{ margin: "0 0 13px 0" }}>
								<Select
									showSearch
									filterOption={(input, option) =>
										removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
									}
									options={listShip}
									className="defaultSelect"
									placeholder="Chọn đơn vị vận chuyển"
								/>
							</Form.Item>

							<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
								<button className="searchButton" style={{ width: "calc(50% - 4px)" }}>
									<SvgIconSearch />
									&nbsp; Tìm kiếm
								</button>
								<div
									className="searchButton"
									style={{ width: "calc(50% - 4px)" }}
									onClick={() => {
										formSearch.resetFields();
										setParamsFilter({
											...paramsFilter,
											q: undefined,
											delivery_code: undefined,
											shipping_unit_id: undefined,
											order_status_id: undefined,
											created_at_start: undefined,
											created_at_end: undefined,
											page: 1,
											limit: 10
										});
										// setParamsFilter({
										// 	...paramsFilter,
										// 	q: undefined,
										// 	platform_id: undefined,
										// 	payment_status: undefined,
										// 	payment_method_id: undefined,
										// 	from_date: undefined,
										// 	to_date: undefined,
										// 	page: 1,
										// 	limit: 10
										// });
									}}
								>
									<SvgIconRefresh />
									&nbsp;Đặt lại
								</div>
							</div>
						</div>
					</NavSearch>
					<Form.Item
						name="delivery_code"
						label="Mã vận đơn"
						className="bill__search__form__item"
						style={{ width: "calc(((100% - 408px) / 5))" }}
					>
						<Input className="defaultInput" placeholder="Nhập mã vận đơn" />
					</Form.Item>

					<Form.Item
						name="q"
						label="SĐT, tên khách hàng"
						className="bill__search__form__item"
						style={{ width: "calc(((100% - 408px) / 5))" }}
					>
						<Input className="defaultInput" placeholder="Nhập sđt, tên khách hàng" />
					</Form.Item>

					<Form.Item
						name="order_status_id"
						label="Trạng thái giao hàng"
						className="bill__search__form__item"
						style={{ width: "calc(((100% - 408px) / 5))" }}
					>
						<Select
							options={[
								{ label: "Tất cả", value: null },
								{ label: "Chờ lấy hàng", value: 7 },
								{ label: "Đang vận chuyển", value: 8 },
								{ label: "Đang giao hàng", value: 9 },
								{ label: "Giao thành công", value: 10 },
								{ label: "Lỗi giao hàng", value: 11 },
								{ label: "Chờ giao lại", value: 12 },
								{ label: "Đang chuyển hoàn", value: 13 },
								{ label: "Đã chuyển hoàn", value: 14 }
							]}
							className="defaultSelect"
							placeholder="Tất cả"
						/>
					</Form.Item>

					<Form.Item
						name="times"
						label="Ngày đóng gói"
						className="bill__search__form__item"
						style={{ width: "calc(((100% - 408px) / 5) * 2)" }}
					>
						<DatePicker.RangePicker className="defaultInput" />
					</Form.Item>
					<button className="searchButton" style={{ marginTop: "19px" }}>
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp;Tìm kiếm
					</button>

					<div
						className="searchButton"
						style={{ marginTop: "19px" }}
						onClick={() => {
							formSearch.resetFields();
							setParamsFilter({
								...paramsFilter,
								q: undefined,
								delivery_code: undefined,
								shipping_unit_id: undefined,
								order_status_id: undefined,
								created_at_start: undefined,
								created_at_end: undefined,
								page: 1,
								limit: 10
							});
						}}
					>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</div>
					<button className="searchButton" style={{ marginTop: "19px" }} onClick={() => setOpenNav(true)}>
						<SvgFilter style={{ transform: "scale(0.6)" }} />
						&nbsp;Lọc nâng cao
					</button>
				</Form>
			</div>

			<div className="bill__table">
				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
					<div className="searchButton" style={{ marginRight: "8px" }}>
						<SvgImport style={{ transform: "scale(0.7)" }} />
						&nbsp;Xuất file
					</div>
					<div
						className="searchButton"
						onClick={() =>
							selectedRows.length > 0 ? printDataCallback(selectedRows) : notifyWarning("Vui lòng chọn vận đơn")
						}
					>
						<SvgPrint style={{ transform: "scale(0.7)" }} />
						&nbsp;In vận đơn
					</div>
				</div>
				<TableStyledAntd
					style={{ marginTop: "8px" }}
					rowKey="delivery_code"
					dataSource={stateListBill?.data?.data}
					bordered
					rowSelection={rowSelection}
					pagination={false}
					expandable={{
						expandedRowRender
					}}
					columns={columnsData()}
					widthCol1="50px"
					widthCol2="50px"
					widthCol7="140px"
				/>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateListBill?.data?.paging.total} vận đơn `}
					total={stateListBill?.data?.paging.total}
				/>
			</div>
			<div style={{ position: "fixed", opacity: "0", zIndex: "102" }}>
				<ComponentToPrint ref={componentRef} setLoaded={setLoadingPrint}>
					<PrintBillA5 selectedOrders={selectedOrder} />
				</ComponentToPrint>
			</div>
		</div>
	);
};

export default BillList;
