import { Checkbox, DatePicker, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import { notifySuccess, notifyWarning } from "src/components/notification";
import SubHeader from "src/components/subHeader/SubHeader";
import { messageRequired } from "src/constants";
import { createOneImport } from "src/services/actions/importStore.actions";
import { fetchProductsList } from "src/services/actions/product.actions";
import { getListStores } from "src/services/actions/stores.actions";
import { getListSuppliers } from "src/services/actions/suppliers.actions";
import { AppState } from "src/types";
import { convertNumberWithCommas, removeSign } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import ModalAddProduct from "../components/ModalAddProduct";
import { columnsData } from "./data";
import TableStyledAntd from "src/components/table/TableStyled";
import SvgImport from "src/assets/svg/SvgImport";
import { API_URL } from "src/services/api/config";
import { api } from "src/services/api/api.index";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";

const InstallStoreCreate = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const isMount = useIsMount();
	const [formAdd] = Form.useForm();
	const [formCreate] = Form.useForm();
	const [formEdit] = Form.useForm();
	const [priceChange, setPriceChange] = useState<any>(0);
	const [expandInformation, setExpandInformation] = useState(false);
	const [showProduct, setShowProduct] = useState(false);
	const [openModalAdd, setOpenModalAdd] = useState(false);
	const [openModalEdit, setOpenModalEdit] = useState(false);

	const [listProduct, setListProduct] = useState<any[]>([]);
	const [listSuppliers, setListSuppliers] = useState<any[]>([]);
	const [searchKeyword, setSearchKeyword] = useState<any>(undefined);
	const [listStores, setListStores] = useState<any[]>([]);
	const [listAddProducts, setListAddProducts] = useState<any[]>([]);
	const [pickedProduct, setPickProduct] = useState<any>();
	const [visibleWarehouse, setVisibleWarehouse] = useState<any>(false);
	const [paramsFilter, setParamsFilter] = useState({
		q: undefined,
		status: undefined,
		page: 1,
		limit: 10
	});

	const { stateListImport, stateCreateOneImport } = useSelector((e: AppState) => e.importReducer);
	const { stateProductsList } = useSelector((state: AppState) => state.productReducer);

	const { stateListSuppliers } = useSelector((state: AppState) => state.suppliersReducer);

	const { stateListStores } = useSelector((state: AppState) => state.storesReducer);

	const [listStaff, setListStaff] = useState<any[]>([]);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	useEffect(() => {
		if (!features.includes("MODULE_PRODUCTS__INSTALLSTORE__CREATE")) {
			notifyWarning("Bạn không được quyền truy cập");
			history.push("/install-store");
		}
	}, []);
	useEffect(() => {
		const getStaff = async () => {
			try {
				const response = (await api.get(`${API_URL}/user-systems`, { status: true })) as any;
				let data = response;
				let fake = [];
				for (let i = 0; i < data?.data?.length; i++) {
					fake.push({
						...data?.data[i],
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
		dispatch(getListStores({ page: 1, limit: 100000, status: true }));
	}, []);

	useEffect(() => {
		dispatch(getListSuppliers({ page: 1, limit: 100000, status: true }));
	}, []);
	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(fetchProductsList({ q: searchKeyword, page: 1, limit: 6 }));
		}, 400);

		return () => {
			clearTimeout(timer);
		};
	}, [searchKeyword]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateProductsList;
		if (!isLoading) {
			if (success) {
				console.log(data);
				setListProduct(data?.data || []);
			} else if (success === false || error) {
			}
		}
	}, [stateProductsList.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateListSuppliers;
		if (!isLoading) {
			if (success) {
				let fakeArray = [];
				for (var i = 0; i < data?.data.length; i++) {
					fakeArray.push({
						value: data?.data[i]?.id,
						label: data?.data[i]?.supplier_name
					});
				}
				setListSuppliers(fakeArray);
			} else if (success === false || error) {
			}
		}
	}, [stateListSuppliers.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateListStores;
		if (!isLoading) {
			if (success) {
				let fakeArray = [];
				for (var i = 0; i < data?.data.length; i++) {
					fakeArray.push({
						value: data?.data[i]?.id,
						label: data?.data[i]?.warehouse_name
					});
				}
				setListStores(fakeArray);
			} else if (success === false || error) {
			}
		}
	}, [stateListStores.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateCreateOneImport;
		if (!isLoading) {
			if (success) {
				notifySuccess("Tạo đơn nhập hàng thành công");
				history.push("/install-store");
			} else if (success === false || error) {
			}
		}
	}, [stateCreateOneImport.isLoading]);

	const submitFinishAdd = (values: any) => {
		let a = [...listAddProducts];

		if (!pickedProduct) {
			notifyWarning("Vui lòng chọn sản phẩm");
			return;
		}
		let checked = a.find((x: any) => x.product_id === pickedProduct?.id);
		if (Number(values.qty) === 0) {
			return notifyWarning("Số lượng vui lòng lớn hơn 0");
		}
		if (checked) {
			notifyWarning("Sản phẩm này đã được thêm rồi, vui lòng chỉ chỉnh sửa/ xoá");
		} else {
			a.push({
				unit_id: a.length + 1,
				sku: pickedProduct.sku,
				product_id: pickedProduct.id,
				product: pickedProduct.product_name,
				price: Number(values.price),
				qty: Number(values.qty)
			});
			setListAddProducts(a);
			setPickProduct(undefined);
			setSearchKeyword(undefined);
			formAdd.resetFields();
		}
	};

	const deleteProduct = (record: any) => {
		let a = [...listAddProducts];
		a = a.filter((x: any) => x.product_id !== record.product_id);
		setListAddProducts(a);
	};

	const editProduct = (record: any) => {
		formEdit.setFieldsValue({
			qty: record?.qty,
			price: record?.price,
			product_id: record?.product_id
		});
		setOpenModalEdit(true);
	};
	const submitCreate = (values: any) => {
		console.log(values);
		if (visibleWarehouse) {
			if (!values.warehouse_id) {
				return notifyWarning("Vui lòng chọn kho nhập");
			}
		}
		if (listAddProducts.length === 0) {
			return notifyWarning("Vui lòng có ít nhất 1 sản phẩm");
		}
		if (expandInformation) {
			if (!values?.total_amount || (values?.payment_method === 2 && !values?.payment_code) || !values?.paid_amount) {
				return notifyWarning("Vui lòng nhập đủ thông tin thanh toán");
			}
		}
		let params = {
			...values,
			supplier_id: values.supplier_id,
			warehouse_id: values.warehouse_id ? values.warehouse_id : undefined,
			input_status: visibleWarehouse ? 2 : undefined,
			input_by: visibleWarehouse ? listStaff.find((x: any) => x.value === values?.input_by)?.label : undefined,
			payment_by: expandInformation ? listStaff.find((x: any) => x.value === values?.payment_by)?.label : undefined,
			payment_status: expandInformation ? 2 : undefined,
			details: listAddProducts
		};
		dispatch(createOneImport(params));
	};

	const handleClickProduct = (x: any) => {
		setSearchKeyword(x.product_name);
		setPickProduct(x);
		formAdd.setFieldsValue({
			qty: 0,
			price: x.retail_price
		});
	};

	const sumPrice = (array: any[]) => {
		let price = 0;
		for (let i = 0; i < array.length; i++) {
			price = price + array[i].price * array[i].qty;
		}
		return price;
	};

	const submitEdit = (values: any) => {
		let a = [...listAddProducts];
		a = a.map((x: any) => (x.product_id !== values.product_id ? x : { ...x, qty: values?.qty, price: values?.price }));
		setListAddProducts(a);
		setOpenModalEdit(false);
	};
	useEffect(() => {
		formCreate.setFieldsValue({
			total_amount: Number(sumPrice(listAddProducts)),
			debit_amount: Number(sumPrice(listAddProducts)) - priceChange
		});
	}, [listAddProducts, priceChange]);
	return (
		<div className="mainPages installStore__create">
			<Modal visible={openModalAdd} title="Thêm mới sản phẩm" footer={null} onCancel={() => setOpenModalAdd(false)}>
				<ModalAddProduct handleCloseCallback={() => setOpenModalAdd(false)} />
			</Modal>
			<Modal visible={openModalEdit} title="Chỉnh sửa" footer={null} onCancel={() => setOpenModalEdit(false)}>
				<Form
					form={formEdit}
					id="formEdit"
					onFinish={submitEdit}
					layout="vertical"
					style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}
				>
					<Form.Item name="product_id" hidden={true}></Form.Item>
					<Form.Item
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						label="Đơn giá"
						name="price"
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
					>
						<InputNumber
							min={1}
							max={1000000000}
							placeholder="Đơn giá"
							className="defaultInputNumber"
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						/>
					</Form.Item>
					<Form.Item
						style={{ width: "calc(50% - 4px)", margin: "0 0 13px 0" }}
						label="Số lượng"
						name="qty"
						rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
					>
						<InputNumber
							min={1}
							max={1000}
							placeholder="Số lượng"
							className="defaultInputNumber"
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						/>
					</Form.Item>
					<div
						style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", height: "40px" }}
					>
						<div className="defaultButton" onClick={() => formEdit.submit()}>
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp;Lưu
						</div>
					</div>
				</Form>
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
			<SubHeader breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Nhập hàng" }]} />

			<Form
				layout="vertical"
				className="installStore__create__body"
				form={formCreate}
				id="formCreate"
				onFinish={submitCreate}
				initialValues={{
					debit_amount: 0,
					paid_amount: 0,
					total_amount: 0
				}}
			>
				<div className="installStore__create__body__left">
					<div className="installStore__create__body__left__information">
						<div
							style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}
						>
							<h4>Thông tin nhập kho</h4>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
								<div className="searchButton" style={{ marginRight: "8px" }}>
									<SvgImport style={{ transform: "scale(0.7)" }} />
									&nbsp;Nhập file
								</div>
								<div onClick={() => formCreate.submit()} className="defaultButton">
									<SvgIconPlus style={{ transform: "scale(0.7)" }} />
									&nbsp;Tạo đơn và duyệt
								</div>
							</div>
						</div>

						<Form
							className="installStore__create__body__left__information__add"
							layout="vertical"
							form={formAdd}
							onFinishFailed={() => notifyWarning("Vui lòng nhập đủ thông tin!")}
							onFinish={submitFinishAdd}
							initialValues={{
								qty: 0,
								price: 0
							}}
						>
							<div
								style={{ zIndex: "96", width: "calc((100% - 32px)/3)", marginTop: "-0.5px" }}
								className="installStore__create__body__left__information__showProduct"
							>
								<div style={{}}>Sản phẩm</div>
								<Input
									className="defaultInput"
									onChange={(e: any) => {
										setSearchKeyword(e.target.value);
										if (e.target.value.length > 0) {
											setShowProduct(true);
										} else {
											setShowProduct(false);
											setListProduct([]);
										}
									}}
									value={searchKeyword}
									onClick={() => setShowProduct(false)}
									placeholder="Nhập SKU, barcode, tên sản phẩm"
								/>
								{showProduct && (
									<div className="installStore__create__body__left__information__showProduct__table">
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
							<Form.Item
								label="Số lượng"
								style={{ margin: "0" }}
								name="qty"
								className="labelRight"
								rules={[
									{
										required: true,
										message: messageRequired
									}
								]}
							>
								<InputNumber
									className="defaultInputNumber"
									min={0}
									max={10000}
									formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
								/>
							</Form.Item>{" "}
							<Form.Item
								label="Đơn giá (vnđ)"
								style={{ margin: "0" }}
								name="price"
								className="labelRight"
								rules={[
									{
										required: true,
										message: messageRequired
									}
								]}
							>
								<InputNumber
									className="defaultInputNumber"
									min={0}
									max={10000000000}
									formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
								/>
							</Form.Item>
							<div className="defaultButton" style={{ marginTop: "22px" }} onClick={() => formAdd.submit()}>
								<SvgIconPlus style={{ transform: "scale(0.7)" }} />
								&nbsp;Thêm
							</div>
						</Form>
						<TableStyledAntd
							style={{ marginTop: "16px" }}
							rowKey="product_id"
							dataSource={[...listAddProducts] || []}
							bordered
							columns={columnsData({ deleteProduct, editProduct }) as any}
							widthCol1="calc(15% - 20px)"
							widthCol2="calc(30% - 20px)"
							widthCol3="calc(15% - 20px)"
							widthCol4="calc(20% - 20px)"
							widthCol5="calc(20% - 20px)"
							widthCol6="100px"
						/>
					</div>
				</div>
				<div className="installStore__create__body__right">
					<div className="installStore__create__body__right__information">
						<h4>Thông tin nhà cung cấp</h4>
						<Form.Item
							label="Nhà cung cấp"
							style={{ margin: "0" }}
							name="supplier_id"
							rules={[{ required: true, message: "Vui lòng chọn nhà cung cấp!" }]}
						>
							<Select
								options={listSuppliers}
								className="defaultSelect"
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
							/>
						</Form.Item>
					</div>
					<div className="installStore__create__body__right__information" style={{ marginTop: "16px" }}>
						<h4>Thông tin thanh toán</h4>
						<Form.Item style={{ margin: "0 0 0 0" }}>
							<Checkbox onChange={(e) => setExpandInformation(!expandInformation)}>
								Thanh toán với nhà cung cấp
							</Checkbox>
						</Form.Item>

						{/* <Form.Item
							hidden={!expandInformation}
							label="Số tiền cần thanh toán (vnđ)"
							style={{ margin: "0 0 8px 0" }}
							name="minimum_amount"
						>
							<InputNumber
								className="defaultInputNumber"
								min={0}
								max={10000000000}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</Form.Item> */}
						<Form.Item
							hidden={!expandInformation}
							label="Số tiền cần thanh toán (vnđ)"
							style={{ margin: "0 0 8px 0" }}
							name="total_amount"
						>
							<InputNumber
								disabled
								className="defaultInputNumber"
								min={0}
								max={10000000000}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</Form.Item>
						<Form.Item
							hidden={!expandInformation}
							label="Số tiền thanh toán (vnđ)"
							style={{ margin: "0 0 8px 0" }}
							name="paid_amount"
						>
							<InputNumber
								onChange={(e) => setPriceChange(e)}
								className="defaultInputNumber"
								min={0}
								max={Number(sumPrice(listAddProducts))}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</Form.Item>
						<Form.Item
							hidden={!expandInformation}
							label="Số tiền còn lại (công nợ) (vnđ)"
							style={{ margin: "0 0 8px 0" }}
							name="debit_amount"
						>
							<InputNumber
								disabled
								className="defaultInputNumber"
								min={0}
								max={10000000000}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</Form.Item>
						<Form.Item
							hidden={!expandInformation}
							label="Hình thức thanh toán"
							style={{ margin: "0 0 8px 0" }}
							name="payment_method"
						>
							<Select
								options={[
									{ label: "Tiền mặt", value: 1 },
									{ label: "Chuyển khoản", value: 2 }
								]}
								className="defaultSelect"
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
							/>
						</Form.Item>

						<Form.Item
							hidden={!expandInformation}
							label="Mã tham chiếu"
							style={{ margin: "0 0 8px 0" }}
							name="payment_code"
						>
							<Input className="defaultInput" />
						</Form.Item>
						<Form.Item
							hidden={!expandInformation}
							label="Người thanh toán"
							style={{ margin: "0 0 8px 0" }}
							name="payment_by"
						>
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								className="defaultSelect"
								placeholder="Chọn nhân viên"
								options={listStaff}
							/>
						</Form.Item>
						<Form.Item
							hidden={!expandInformation}
							label="Ngày thanh toán"
							style={{ margin: "0 0 8px 0" }}
							name="payment_at"
						>
							<DatePicker showTime className="defaultInput" />
						</Form.Item>
					</div>
					<div className="installStore__create__body__right__information" style={{ marginTop: "16px" }}>
						<h4>Thông tin nhập kho</h4>
						<Form.Item style={{ margin: "0" }} name="import">
							<Checkbox onChange={() => setVisibleWarehouse(!visibleWarehouse)}>Nhập hàng vào kho</Checkbox>
						</Form.Item>
						<Form.Item hidden={!visibleWarehouse} label="Kho hàng" style={{ margin: "0" }} name="warehouse_id">
							<Select
								options={listStores}
								className="defaultSelect"
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
							/>
						</Form.Item>
						<Form.Item hidden={!visibleWarehouse} label="Người nhập" style={{ margin: "0" }} name="input_by">
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								className="defaultSelect"
								placeholder="Chọn nhân viên"
								options={listStaff}
							/>
						</Form.Item>

						<Form.Item hidden={!visibleWarehouse} label="Ngày nhập kho" style={{ margin: "0 0 8px 0" }} name="input_at">
							<DatePicker showTime className="defaultInput" />
						</Form.Item>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default InstallStoreCreate;
