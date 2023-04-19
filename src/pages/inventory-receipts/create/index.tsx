import { Col, Form, Input, Modal, Row, Select } from "antd";
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
import { createOneInventory } from "src/services/actions/inventoryReceipts.actions";
import { getModuleFunctionById, updateModuleFunction } from "src/services/actions/moduleFunction.action";
import { fetchProductsList } from "src/services/actions/product.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_STORES } from "src/services/api/url.index";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { convertNumberWithCommas, removeSign } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import ImageOverlay from "../../../components/custom/ImageOverlay";
import { columnsData, columnsDataCheck } from "./data";

const InventoryReceiptsCreate = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const paramsUrl = useParams() as any;
	const history = useHistory();
	const [formInformation] = Form.useForm();
	const [selectedStatus, setSelectedStatus] = useState<any>(1);
	const [listProduct, setListProduct] = useState<any[]>([]);
	const [listWarehouse, setListWarehouse] = useState<any[]>([]);
	const [listStaff, setListStaff] = useState<any[]>([]);
	const [showProduct, setShowProduct] = useState(false);
	const [filterProduct, setFilterProduct] = useState<any>("");
	const [visible, setVisible] = useState(false);
	const { stateProductsList } = useSelector((state: AppState) => state.productReducer);
	const [selectedWarehouse, setSelectedWarehouse] = useState<any>(undefined);
	const [selectedStyle, setSelectedStyle] = useState<any>(undefined);
	const [productCheck, setProductCheck] = useState<any[]>([]);
	const [paramsFilter, setParamsFilter] = useState<any>({
		page: 1,
		limit: 10
	});
	const [visibleConfirm, setVisibleConfirm] = useState(false);

	const [visibleImport, setVisibleImport] = useState(false);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	useEffect(() => {
		if (!features.includes("MODULE_PRODUCTS__CHECK__CREATE")) {
			notifyWarning("Bạn không được quyền truy cập");
			history.push("/inventory-receipts");
		}
	}, []);

	useEffect(() => {
		if (selectedWarehouse) {
			const timer = setTimeout(() => {
				dispatch(
					fetchProductsList({
						page: paramsFilter.page,
						limit: paramsFilter.limit,
						q: filterProduct,
						warehouse_id: selectedWarehouse
					})
				);
			}, 300);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [filterProduct, selectedWarehouse, paramsFilter]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateProductsList;
		if (!isLoading) {
			if (success) {
				setListProduct(data?.data || []);
			} else if (success === false || error) {
			}
		}
	}, [stateProductsList.isLoading]);

	const { stateCreateOneInventory } = useSelector((e: AppState) => e.inventoryReceiptsReducer);

	useEffect(() => {
		if (isMount) return;
		const { success, data, message, error, isLoading } = stateCreateOneInventory;
		if (!isLoading) {
			if (success) {
				notifySuccess("Tạo phiếu kiểm hàng thành công");
				history.push("/inventory-receipts");
			}
			if (success === false || error) {
				notifyError(`${message}`);
			}
		}
	}, [stateCreateOneInventory.isLoading]);

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

	useEffect(() => {
		const getAddProducts = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_STORES}`, params)) as any;
				let data = response;
				let fake = [];
				for (let i = 0; i < data?.data?.length; i++) {
					fake.push({
						value: data?.data[i]?.id,
						label: data?.data[i]?.warehouse_name
					});
				}
				setListWarehouse(fake);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};

		const timer = setTimeout(() => {
			let paramsAddFilter = {
				page: 1,
				limit: 10000
			};
			getAddProducts(paramsAddFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const [addSelectedRowKeys, setAddSelectedRowKeys] = useState<any[]>([]);
	const [addSelectedRows, setAddSelectedRows] = useState<any[]>([]);
	const handleClickProduct = (value: any) => {
		let check = [...productCheck];
		if (check.find((x: any) => x.product_id === value.id)) {
			notifyWarning("Sản phẩm đã tồn tại trong phiếu kiểm");
		} else {
			check.push({
				...value,
				qty_in_stock: value?.stock_quantity,
				differential: undefined,
				real_qty_in_stock: undefined,
				product: value?.product_name,
				product_id: value?.id
			});
			setProductCheck(check);
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
		let check = [...productCheck];
		if (addSelectedRows.length === 0) {
			return notifyWarning("Vui lòng chọn ít nhất 1 sản phẩm");
		}
		[...addSelectedRows].forEach((e: any) => {
			if (check.find((x: any) => x.product_id === e.id)) {
				notifyWarning(`Sản phẩm ${e.product_name} đã tồn tại trong phiếu kiểm`);
			} else {
				check.push({
					...e,
					qty_in_stock: e?.stock_quantity,
					differential: undefined,
					real_qty_in_stock: undefined,
					product: e?.product_name,
					product_id: e?.id
				});
			}
		});
		setProductCheck(check);
		setVisible(false);
		setAddSelectedRowKeys([]);
		setAddSelectedRows([]);
	};
	const handleFinishCreate = (values: any) => {
		if (productCheck.length === 0) {
			return notifyWarning("Vui lòng chọn sản phẩm kiểm kho!");
		}
		let paramsProduct = [];
		for (let i = 0; i < productCheck.length; i++) {
			paramsProduct.push({
				sku: productCheck[i]?.sku,
				product_id: productCheck[i]?.product_id,
				product: productCheck[i]?.product_name,
				qty_in_stock: productCheck[i]?.qty_in_stock,
				real_qty_in_stock: productCheck[i]?.real_qty_in_stock,
				differential: productCheck[i]?.differential,
				unit_id: productCheck[i]?.unit?.id
			});
			if (selectedStatus === 2) {
				if (!productCheck[i]?.real_qty_in_stock) {
					return notifyWarning("Vui lòng nhập đủ tồn kho thực tế!");
				}
			}
		}
		dispatch(
			createOneInventory({
				warehouse_id: values?.warehouse_id,
				inventory_staff_id: values?.inventory_staff_id,
				note: values?.note,
				status: selectedStatus,
				details: paramsProduct
			})
		);
	};

	const changeRealQty = (e: any, record: any) => {
		let check = [...productCheck];
		let item = check.find((x: any) => x.id === record.id);
		if (!item) {
			notifyWarning("Sản phẩm không tồn tại trong phiếu kiểm");
		} else {
			item.real_qty_in_stock = Number(e);
			item.differential = e ? (record.qty_in_stock ? Number(e) - Number(record.qty_in_stock) : Number(e)) : undefined;
			check = check.map((x: any) => (x.id === record.id ? item : x));
			setProductCheck(check);
		}
	};

	const removeProduct = (record: any) => {
		let check = [...productCheck];
		let item = check.find((x: any) => x.id === record.id);
		if (!item) {
			notifyWarning("Sản phẩm không tồn tại trong phiếu kiểm");
		} else {
			check = check.filter((x: any) => x.id !== record.id);
			setProductCheck(check);
		}
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
					visible={visibleConfirm}
					title="Xác nhận hoàn thành kiểm hàng"
					centered
					className="modalEditSender"
					footer={null}
					onCancel={() => setVisibleConfirm(false)}
					width={700}
				>
					<div style={{ color: "rgb(0,117,164)" }}>Tổng số sản phẩm cân bằng: {productCheck.length} sản phẩm</div>
					<div style={{ color: "rgb(117,127,136)" }}>
						Xác nhận hoàn thành kiểm hàng sẽ thay đổi thông tin tồn kho trên hệ thống của những sản phẩm trong danh sách
						kiểm theo đúng số tồn thực tế trên phiếu kiểm hàng.
					</div>

					<div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "8px" }}>
						<div className="searchButton" onClick={() => setVisibleConfirm(false)}>
							Trở lại
						</div>
						<div className="defaultButton" style={{ marginLeft: "8px" }} onClick={() => formInformation.submit()}>
							Xác nhận
						</div>
					</div>
				</Modal>
				<Modal
					visible={visibleImport}
					title="Nhập file danh sách sản phẩm kiểm"
					centered
					className="modalEditSender"
					footer={null}
					onCancel={() => setVisibleImport(false)}
					width={700}
				>
					<ImportFileComponent />
				</Modal>

				<Modal
					visible={visible}
					title="Chọn nhiều sản phẩm"
					centered
					className="modalEditSender"
					footer={null}
					onCancel={() => setVisible(false)}
					width={700}
				>
					<TableStyledAntd
						rowKey="id"
						dataSource={listProduct || []}
						bordered
						pagination={false}
						rowSelection={rowSelection}
						columns={columnsData() as any}
						widthCol1="50px"
						widthCol2="80%"
					/>
					<PanigationAntStyled
						style={{ marginTop: "8px" }}
						current={paramsFilter.page}
						pageSize={paramsFilter.limit}
						onChange={onChangePaging}
						showTotal={() => `Tổng ${stateProductsList?.data?.paging.total} sản phẩm `}
						total={stateProductsList?.data?.paging.total}
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
							setSelectedStatus(1);
							formInformation.submit();
						}}
					>
						<SvgIconPlus style={{ transform: "scale(0.8)" }} />
						&nbsp;Tạo phiếu
					</div>
					<div
						className="defaultButton"
						onClick={() => {
							let params = formInformation.getFieldsValue();
							if (productCheck?.length === 0 || !params.warehouse_id || !params.inventory_staff_id) {
								notifyWarning("Vui lòng nhập đầy đủ thông tin phiếu kiểm, sản phẩm kiểm");
							} else {
								setSelectedStatus(2);
								setVisibleConfirm(true);
							}
						}}
						style={{ marginLeft: "8px" }}
					>
						<SvgCheck style={{ transform: "scale(0.8)" }} />
						&nbsp;Hoàn thành kiểm hàng
					</div>
				</div>
				<div className="contentSection">
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<h4 style={{ margin: "0" }} onClick={() => console.log(productCheck)}>
							Thông tin phiếu kiểm hàng
						</h4>
					</div>
					<Form
						layout="vertical"
						form={formInformation}
						onFinish={handleFinishCreate}
						onFinishFailed={() => notifyWarning("Vui lòng nhập đầy đủ thông tin phiếu kiểm")}
						style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
					>
						<Form.Item
							name="warehouse_id"
							label="Kho kiểm hàng"
							rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							style={{ margin: "0", width: "calc((100% - 16px) / 4 )" }}
						>
							<Select
								onChange={(e: any) => {
									setSelectedWarehouse(e);
									setProductCheck([]);
								}}
								options={listWarehouse}
								placeholder="Chọn kho kiểm hàng"
								className="defaultSelect"
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
							/>
						</Form.Item>
						<Form.Item
							rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
							name="inventory_staff_id"
							label="Nhân viên kiểm"
							style={{ margin: "0", width: "calc((100% - 16px) / 4 )" }}
						>
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={listStaff}
								placeholder="Nhân viên kiểm"
								className="defaultSelect"
							/>
						</Form.Item>
						<Form.Item name="note" label="Ghi chú" style={{ margin: "0", width: "calc(((100% - 16px) / 4 ) * 2 )" }}>
							<Input placeholder="Nhập ghi chú" className="defaultInput" />
						</Form.Item>
					</Form>
				</div>
				<div className="contentSection">
					<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
						<div
							style={{ marginRight: "8px" }}
							className={!selectedStyle ? "defaultButton" : "searchButton"}
							onClick={() => setSelectedStyle(null)}
						>
							Tất cả ({productCheck.length})
						</div>

						<div
							style={{ marginRight: "8px" }}
							className={selectedStyle === 1 ? "defaultButton" : "searchButton"}
							onClick={() => setSelectedStyle(1)}
						>
							Chưa kiểm(
							{productCheck.filter((x: any) => !x.real_qty_in_stock && Number(x.real_qty_in_stock) !== 0)?.length})
						</div>

						<div
							style={{ marginRight: "8px" }}
							className={selectedStyle === 2 ? "defaultButton" : "searchButton"}
							onClick={() => setSelectedStyle(2)}
						>
							Khớp ({productCheck.filter((x: any) => Number(x.qty_in_stock) === Number(x.real_qty_in_stock))?.length})
						</div>
						<div className={selectedStyle === 3 ? "defaultButton" : "searchButton"} onClick={() => setSelectedStyle(3)}>
							Lệch (
							{
								productCheck.filter(
									(x: any) => Number(x.qty_in_stock) !== Number(x.real_qty_in_stock) && Number(x.real_qty_in_stock) >= 0
								)?.length
							}
							)
						</div>
					</div>
					<h4 style={{ margin: "8px 0 0 0" }} onClick={() => console.log(productCheck)}>
						Danh sách sản phẩm
					</h4>
					<div className="ordersPage__create__body__left__items__search">
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between"
							}}
						>
							<span
								style={{
									width: "calc(65% - 4px)"
								}}
							>
								Tên sản phẩm
							</span>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center"
							}}
						>
							<div
								onClick={() => {
									if (!selectedWarehouse) {
										notifyWarning("Vui lòng chọn kho trước!");
									}
								}}
								style={{ width: "calc(50%)", zIndex: "96" }}
								className="installStore__create__body__left__information__showProduct"
							>
								<Input
									disabled={!selectedWarehouse}
									className="defaultInput"
									onChange={(e: any) => {
										setFilterProduct(e.target.value);
										if (e.target.value.length > 0) {
											setShowProduct(true);
										} else {
											setShowProduct(false);
											setListProduct([]);
										}
									}}
									value={filterProduct}
									onClick={() => {
										setShowProduct(false);
									}}
									placeholder="Nhập SKU, barcode, tên sản phẩm"
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
										{listProduct.length > 0 ? (
											listProduct.map((x: any) => (
												<div
													style={{
														padding: "4px 8px",

														cursor: "pointer"
													}}
													onClick={() => {
														handleClickProduct(x);
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
														<div>{x.product_name}</div>
														<div style={{ color: "red" }}>
															{x.retail_price ? convertNumberWithCommas(x.retail_price) : 0}
															&nbsp;đ
														</div>
													</div>
													<div
														style={{
															display: "flex",
															alignItems: "center",
															justifyContent: "space-between",
															fontSize: "12px"
														}}
													>
														<div>SKU: {x?.sku}</div>
														<div>Tồn: {x?.stock_quantity}</div>
													</div>
												</div>
											))
										) : (
											<div>Không có sản phẩm</div>
										)}
									</div>
								)}
							</div>
							<button
								className="searchButton"
								style={{ marginLeft: "8px" }}
								onClick={() => {
									if (selectedWarehouse) {
										setVisible(true);
										setFilterProduct("");
									} else {
										notifyWarning("Vui lòng chọn kho trước!");
									}
								}}
							>
								Chọn nhiều sản phẩm
							</button>
							<button
								className="searchButton"
								style={{ marginLeft: "8px", cursor: "not-allowed" }}
								onClick={() => {
									// if (selectedWarehouse) {
									// 	setVisibleImport(true);
									// } else {
									// 	notifyWarning("Vui lòng chọn kho trước!");
									// }
								}}
							>
								<SvgExport style={{ transform: "scale(0.7)" }} />
								&nbsp;Nhập file
							</button>
						</div>
					</div>
					<TableStyledAntd
						style={{ marginTop: "8px" }}
						rowKey="id"
						dataSource={
							!selectedStyle
								? productCheck
								: selectedStyle === 1
								? productCheck.filter((x: any) => !x.real_qty_in_stock && Number(x.real_qty_in_stock) !== 0)
								: selectedStyle === 2
								? productCheck.filter((x: any) => Number(x.qty_in_stock) === Number(x.real_qty_in_stock))
								: productCheck.filter(
										(x: any) =>
											Number(x.qty_in_stock) !== Number(x.real_qty_in_stock) && Number(x.real_qty_in_stock) >= 0
								  ) || []
						}
						bordered
						pagination={false}
						columns={columnsDataCheck({ changeRealQty, removeProduct }) as any}
						widthCol1="50px"
						widthCol2="18%"
						widthCol4="120px"
						widthCol5="15%"
						widthCol6="15%"
						widthCol7="15%"
						widthCol8="50px"
					/>
				</div>
			</div>
		</>
	);
};

export default InventoryReceiptsCreate;
