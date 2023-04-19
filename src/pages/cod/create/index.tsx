import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SvgCheck from "src/assets/svg/SvgCheck";
import SvgExport from "src/assets/svg/SvgExport";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import ImportFileComponent from "src/components/modalmport";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { createOneCod } from "src/services/actions/cod.actions";
import { createOneInventory } from "src/services/actions/inventoryReceipts.actions";
import { getModuleFunctionById, updateModuleFunction } from "src/services/actions/moduleFunction.action";
import { fetchProductsList } from "src/services/actions/product.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_STORES } from "src/services/api/url.index";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { convertNumberWithCommas, getAddressString, removeSign } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import ImageOverlay from "../../../components/custom/ImageOverlay";
import { columnsData, columnsDataCheck } from "./data";

const CodCreate = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const paramsUrl = useParams() as any;
	const history = useHistory();
	const [formInformation] = Form.useForm();
	const [selectedStatus, setSelectedStatus] = useState<any>(1);
	const [listBillCheck, setListBillCheck] = useState<any[]>([]);
	const [listBill, setListBill] = useState<any[]>([]);
	const [listBillLength, setListBillLength] = useState(0);
	const [listShipping, setListShipping] = useState<any[]>([]);
	const [showProduct, setShowProduct] = useState(false);
	const [filterProduct, setFilterProduct] = useState<any>("");
	const [visible, setVisible] = useState(false);
	const { stateProductsList } = useSelector((state: AppState) => state.productReducer);
	const [selectedWarehouse, setSelectedWarehouse] = useState<any>(undefined);
	const [selectedStyle, setSelectedStyle] = useState<any>(undefined);
	const [listStaff, setListStaff] = useState<any[]>([]);
	const [paramsFilter, setParamsFilter] = useState<any>({
		page: 1,
		limit: 5
	});
	const [visibleConfirm, setVisibleConfirm] = useState(false);

	const [visibleImport, setVisibleImport] = useState(false);

	// useEffect(() => {
	// 	if (isMount) return;
	// 	const { success, data, isLoading, error } = stateProductsList;
	// 	if (!isLoading) {
	// 		if (success) {
	// 			setListProduct(data?.data || []);
	// 		} else if (success === false || error) {
	// 		}
	// 	}
	// }, [stateProductsList.isLoading]);

	const { stateCreateOneCod } = useSelector((e: AppState) => e.codReducer);

	useEffect(() => {
		if (isMount) return;
		const { success, data, message, error, isLoading } = stateCreateOneCod;
		if (!isLoading) {
			if (success) {
				notifySuccess("Tạo phiếu đối soát thành công");
				history.push("/cod");
			}
			if (success === false || error) {
				notifyError(`${message}`);
			}
		}
	}, [stateCreateOneCod.isLoading]);

	useEffect(() => {
		const getStaff = async () => {
			try {
				const response = (await api.get(`${API_URL}/orders/deliveries`, {
					...paramsFilter,
					q: filterProduct,
					empty_cod_and_carriage_id: true
				})) as any;
				let data = response;
				let fake = [];
				console.log("res", data);
				for (let i = 0; i < data?.data?.length; i++) {
					fake.push({
						...data?.data[i],
						value: data?.data[i]?.id,
						label: data?.data[i]?.order_code
					});
				}
				setListBillLength(data?.paging?.total);
				setListBill(fake);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		getStaff();
	}, [paramsFilter, filterProduct]);

	useEffect(() => {
		const getListShipping = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/shipping-units`, params)) as any;
				let data = response;
				let fake = [];
				for (let i = 0; i < data?.data?.length; i++) {
					fake.push({
						value: data?.data[i]?.id,
						label: data?.data[i]?.shipping_unit
					});
				}
				setListShipping(fake);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};

		const timer = setTimeout(() => {
			let paramsAddFilter = {
				page: 1,
				limit: 10000
			};
			getListShipping(paramsAddFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		const getStaff = async () => {
			try {
				const response = (await api.get(`${API_URL}/user-systems`)) as any;
				let data = response;
				let fake = [];
				for (let i = 0; i < data?.data?.length; i++) {
					fake.push({
						value: data?.data[i]?.id,
						label: data?.data[i]?.fullname
					});
				}
				setListStaff(fake);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		getStaff();
	}, []);

	const [addSelectedRowKeys, setAddSelectedRowKeys] = useState<any[]>([]);
	const [addSelectedRows, setAddSelectedRows] = useState<any[]>([]);
	const handleClickBill = (value: any) => {
		let check = [...listBillCheck];
		if (check.find((x: any) => x.order_delivery_id === value.id)) {
			notifyWarning(`Vận đơn ${value?.delivery_code} đã tồn tại trong phiếu kiểm`);
		} else {
			check.push({
				...value,
				order_delivery_id: value.id,
				totalFake: value?.delivery_payment_by === 1 ? Number(value?.cod) - Number(value?.shipping_fee) : value?.cod
			});
			setListBillCheck(check);
		}
		setFilterProduct("");
	};

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			page: page,
			limit: pageSize
		});
	};

	const rowSelection = {
		selectedRowKeys: addSelectedRowKeys,
		onSelect: (_record: any, _selected: boolean, _selectedRows: any) => {
			if (_selected) {
				setAddSelectedRowKeys([...addSelectedRowKeys, _record.id]);
				setAddSelectedRows([...addSelectedRows, _record]);
			} else {
				setAddSelectedRowKeys([...addSelectedRowKeys.filter((e: any) => e !== _record?.id)]);
				setAddSelectedRows([...addSelectedRows.filter((e: any) => e?.id !== _record?.id)]);
			}
		},
		onSelectAll: (_selected: boolean, _selectedRows: any, _changeRows: any) => {
			if (_selected) {
				let _rowkeys = _changeRows.map((e: any) => e.id);
				let _rows = _changeRows;
				setAddSelectedRowKeys([...addSelectedRowKeys, ..._rowkeys]);
				setAddSelectedRows([...addSelectedRows, ..._rows]);
			} else {
				let _rowKeys: any[] = addSelectedRowKeys;
				let _rows: any[] = addSelectedRows;
				_changeRows.forEach((e: any) => {
					_rowKeys = _rowKeys.filter((item) => item !== e.id);
					_rows = _rows.filter((item) => item?.id !== e?.id);
				});

				setAddSelectedRowKeys(_rowKeys);
				setAddSelectedRows(_rows);
			}
		}
	};

	const handleAddList = () => {
		let check = [...listBillCheck];
		if (addSelectedRows.length === 0) {
			return notifyWarning("Vui lòng chọn vận đơn");
		}
		[...addSelectedRows].forEach((e: any) => {
			if (check.find((x: any) => x.order_delivery_id === e.id)) {
				notifyWarning(`Vận đơn ${e?.delivery_code} đã tồn tại trong phiếu kiểm`);
			} else {
				check.push({
					...e,
					order_delivery_id: e?.id,
					totalFake: e?.delivery_payment_by === 1 ? Number(e?.cod) - Number(e?.shipping_fee) : e?.cod
				});
			}
		});
		setListBillCheck(check);
		setVisible(false);
		setAddSelectedRowKeys([]);
		setAddSelectedRows([]);
	};
	const handleFinishCreate = (values: any) => {
		if (listBillCheck.length === 0) {
			return notifyWarning("Vui lòng chọn vận đơn!");
		}

		dispatch(
			createOneCod({
				verified_by: listStaff.find((x: any) => x.value === values?.verified_by)?.label,
				verified_at: values?.verified_at,
				shipping_unit_id: values?.shipping_unit_id,
				note: values?.note,
				details: listBillCheck.map((x: any) => {
					return { order_delivery_id: x.order_delivery_id };
				})
			})
		);
	};

	const changeRealQty = (e: any, record: any) => {
		let check = [...listBillCheck];
		let item = check.find((x: any) => x.id === record.id);
		if (!item) {
			notifyWarning("Sản phẩm không tồn tại trong phiếu kiểm");
		} else {
			item.real_qty_in_stock = Number(e);
			item.differential = record.qty_in_stock ? Number(e) - Number(record.qty_in_stock) : Number(e);
			check = check.map((x: any) => (x.id === record.id ? item : x));
			setListBillCheck(check);
		}
	};

	const removeProduct = (record: any) => {
		let check = [...listBillCheck];
		let item = check.find((x: any) => x.id === record.id);
		if (!item) {
			notifyWarning("Vận đơn không tồn tại trong phiếu kiểm");
		} else {
			check = check.filter((x: any) => x.id !== record.id);
			setListBillCheck(check);
		}
	};

	const calcPrice = () => {
		let total = { cod: 0, shipping: 0, total: 0, delivery_cod_fee: 0 };
		for (let i = 0; i < listBillCheck?.length; i++) {
			total.cod = total.cod + Number(listBillCheck[i]?.cod);
			total.shipping = total.shipping + Number(listBillCheck[i]?.shipping_fee);
			total.total = total.total + Number(listBillCheck[i]?.debit_amount);
			total.delivery_cod_fee = total.delivery_cod_fee + Number(listBillCheck[i]?.delivery_cod_fee);
		}
		return total;
	};
	return (
		<>
			<div className="mainPages moduleFunctions_edit">
				<SubHeader
					breadcrumb={[
						{ text: "Quản lý sản phẩm" },
						{ text: "Kiểm hàng", link: routerNames.INVENTORY_RECEIPTS },
						{ text: "Tạo phiếu kiểm hàng" }
					]}
				/>

				<Modal
					visible={visible}
					title="Chọn vận đơn đối soát"
					centered
					className="modalEditSender"
					footer={null}
					onCancel={() => {
						setVisible(false);
						setParamsFilter({ page: 1, limit: 5 });
						setFilterProduct(undefined);
					}}
					width={700}
				>
					<Input
						className="defaultInput"
						onChange={(e: any) => {
							setFilterProduct(e.target.value);
						}}
						value={filterProduct}
						placeholder="Mã vận đơn, mã đơn hàng, số điện thoại, tên người nhận"
					/>
					<TableStyledAntd
						style={{ border: "solid 1px rgb(237,240,243)", marginTop: "8px" }}
						rowKey="id"
						dataSource={listBill || []}
						bordered={false}
						showHeader={false}
						pagination={false}
						rowSelection={rowSelection}
						columns={columnsData() as any}
					/>
					<PanigationAntStyled
						style={{ marginTop: "8px" }}
						current={paramsFilter.page}
						pageSize={paramsFilter.limit}
						onChange={onChangePaging}
						showTotal={() => `Tổng ${listBillLength} vận đơn `}
						total={listBillLength}
					/>
					<div
						style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}
						onClick={() => handleAddList()}
					>
						<div className="defaultButton">
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp;Thêm
						</div>
					</div>
				</Modal>
				<div
					style={{
						zIndex: "94",
						position: "fixed",
						top: showProduct ? "0" : "-100%",
						left: "0",
						width: "100vw",
						height: "100vh"
					}}
					onClick={() => {
						setShowProduct(false);
					}}
				></div>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
					<div
						className="defaultButton"
						onClick={() => {
							formInformation.submit();
						}}
					>
						<SvgIconPlus style={{ transform: "scale(0.8)" }} />
						&nbsp;Tạo phiếu đối soát
					</div>
				</div>
				<div className="contentSection">
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<h4 style={{ margin: "0" }} onClick={() => console.log(listBillCheck)}>
							Thông tin phiếu
						</h4>
					</div>
					<Form
						layout="vertical"
						form={formInformation}
						onFinish={handleFinishCreate}
						style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}
						initialValues={{
							verified_at: moment(new Date(), "YYYY-MM-DD hh:mm:ss")
						}}
					>
						<Form.Item
							name="shipping_unit_id"
							label="Đối tác vận chuyển"
							rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							// style={{ width: "calc((100% - 24px) /4)", margin: "4px 0" }}
							style={{ width: "calc((100% - 16px) /3)", margin: "0" }}
						>
							<Select
								options={listShipping}
								placeholder="Chọn đối tác vận chuyển"
								className="defaultSelect"
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
							/>
						</Form.Item>
						<Form.Item
							// rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							name="inventory_staff_id"
							label="Chi nhánh"
							// style={{ width: "calc((100% - 24px) /4)", margin: "4px 0" }}
							style={{ width: "calc((100% - 16px) /3)", margin: "0" }}
						>
							<Select
								disabled
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={[]}
								placeholder="Chọn chi nhánh"
								className="defaultSelect"
							/>
						</Form.Item>
						<Form.Item
							name="verified_by"
							label="Người đối soát"
							// style={{ width: "calc((100% - 24px) /4)", margin: "4px 0" }}
							style={{ width: "calc((100% - 16px) /3)", margin: "4px 0" }}
						>
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								className="defaultSelect"
								placeholder="Chọn người đối soát"
								options={listStaff}
							/>
						</Form.Item>
						{/* <Form.Item
							name="verified_at"
							label="Ngày đối soát"
							style={{ width: "calc((100% - 24px) /4)", margin: "4px 0" }}
						>
							<DatePicker showTime className="defaultDate" />
						</Form.Item> */}
						<Form.Item name="note" label="Ghi chú" style={{ margin: "0", width: "100%" }}>
							<Input placeholder="Nhập ghi chú" className="defaultInput" />
						</Form.Item>
					</Form>
				</div>
				<div className="contentSection">
					<h4 style={{ margin: "8px 0 0 0" }}>Danh sách vận đơn</h4>

					<div className="ordersPage__create__body__left__items__search">
						<div
							style={{
								display: "flex",
								alignItems: "center"
							}}
						>
							<div
								style={{ width: "calc(50%)", zIndex: "96" }}
								className="installStore__create__body__left__information__showProduct"
							>
								<Input
									className="defaultInput"
									onChange={(e: any) => {
										setFilterProduct(e.target.value);
										if (e.target.value.length > 0) {
											setShowProduct(true);
										} else {
											setShowProduct(false);
											setListBill([]);
										}
									}}
									value={filterProduct}
									onClick={() => {
										setShowProduct(false);
									}}
									placeholder="Mã vận đơn, mã đơn hàng, số điện thoại, tên người nhận"
								/>
								{showProduct && (
									<div
										className="installStore__create__body__left__information__showProduct__table"
										style={{ width: "100%" }}
									>
										{/* <div
												className="installStore__create__body__left__information__showProduct__table__add"
												onClick={() => setOpenModalAdd(true)}
											>
												<SvgIconPlus fill="#000" />
												&nbsp;&nbsp;Thêm mới sản phẩm
											</div> */}
										{listBill.length > 0 ? (
											listBill.map((x: any) => (
												<div
													style={{
														padding: "4px 8px",

														cursor: "pointer"
													}}
													onClick={() => {
														handleClickBill(x);
														setShowProduct(false);
													}}
												>
													<div
														style={{
															display: "flex",
															alignItems: "center",
															justifyContent: "space-between"
														}}
													>
														<div>
															{x?.delivery_code} - {x?.delivery_status_name}
														</div>
														<div>Thu hộ (vnđ):</div>
													</div>
													<div
														style={{
															display: "flex",
															alignItems: "center",
															justifyContent: "space-between",
															fontSize: "12px"
														}}
													>
														<div>
															{x?.s_phone} - {x?.s_fullname}
														</div>
														<div style={{ color: "red" }}>{x?.cod && convertNumberWithCommas(x?.cod)}đ</div>
													</div>
													<div
														style={{
															display: "flex",
															alignItems: "center",
															justifyContent: "space-between",
															fontSize: "12px"
														}}
													>
														<div style={{ color: "rgb(156,156,156)", fontSize: "12px" }}>
															{getAddressString(x?.s_address, x?.s_ward, x?.s_district, x?.s_province)}
														</div>
													</div>
												</div>
											))
										) : (
											<div>Không có vận đơn</div>
										)}
									</div>
								)}
							</div>
							<button
								className="searchButton"
								style={{ marginLeft: "8px" }}
								onClick={() => {
									setVisible(true);
									setParamsFilter({ page: 1, limit: 5 });
									setFilterProduct(undefined);
								}}
							>
								Đối soát nhiều vận đơn
							</button>
						</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							background: "rgb(237,240,243)",
							marginTop: "8px"
						}}
					>
						<div style={{ width: "calc(52% - 312px)", padding: "4px 6px", fontWeight: "600" }}>
							Tổng {listBillCheck?.length} vận đơn
						</div>
						<div style={{ width: "12%", textAlign: "right", padding: "4px 6px" }}>
							<div>Thu hộ COD (vnđ):</div>
							<span style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.cod)}</span>
						</div>
						<div style={{ width: "12%", textAlign: "right", padding: "4px 6px" }}>
							<div>Tiền cước (vnđ):</div>
							<span style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.shipping)}</span>
						</div>
						<div style={{ width: "12%", textAlign: "right", padding: "4px 6px" }}>
							<div>Phí thu hộ COD (vnđ):</div>
							<span style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.delivery_cod_fee)}</span>
						</div>
						<div style={{ width: "12%", textAlign: "right", padding: "4px 6px" }}>
							<div>Công nợ (vnđ):</div>
							<div style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.total)}</div>
						</div>
						<div style={{ width: "312px" }} />
					</div>
					<TableStyledAntd
						style={{ marginTop: "8px" }}
						rowKey="id"
						dataSource={listBillCheck}
						bordered
						pagination={false}
						columns={columnsDataCheck({ changeRealQty, removeProduct }) as any}
						widthCol1="50px"
						widthCol2="120px"
						widthCol3="180px"
						widthCol4="12%"
						widthCol5="12%"
						widthCol6="12%"
						widthCol7="12%"
						widthCol8="240px"
						widthCol9="50px"
					/>
				</div>
			</div>
		</>
	);
};

export default CodCreate;
