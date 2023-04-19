import { DatePicker, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgImport from "src/assets/svg/SvgImport";
import SvgMoneyPayment from "src/assets/svg/SvgMoneyPayment";
import { notifySuccess, notifyWarning } from "src/components/notification";
import Roadmap from "src/components/roadmap";
import SubHeader from "src/components/subHeader/SubHeader";
import { messageRequired } from "src/constants";
import { getImportById, updateOneImport } from "src/services/actions/importStore.actions";
import { fetchProductsList } from "src/services/actions/product.actions";
import { getListStores } from "src/services/actions/stores.actions";
import { getListSuppliers } from "src/services/actions/suppliers.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { AppState } from "src/types";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { removeSign } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import ModalAddProduct from "../components/ModalAddProduct";
import { columnsData } from "./data";
const InstallStoreEdit = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const history = useHistory() as any;
	const [formCreate] = Form.useForm();
	const [formAdd] = Form.useForm();
	const [typeSubmit, setTypeSubmit] = useState<any>(1);
	const [expandInformation, setExpandInformation] = useState(false);
	const [expandSubInformation, setExpandSubInformation] = useState(false);
	const paramsURL: any = useParams();
	const [priceChange, setPriceChange] = useState<any>(0);

	const [showProduct, setShowProduct] = useState(false);
	const [openModalAdd, setOpenModalAdd] = useState(false);
	const [listSuppliers, setListSuppliers] = useState<any[]>([]);
	const [listStores, setListStores] = useState<any[]>([]);
	const [listAddProducts, setListAddProducts] = useState<any[]>([]);
	const [searchKeyword, setSearchKeyword] = useState<any>(undefined);
	const [listProduct, setListProduct] = useState<any[]>([]);
	const [pickedProduct, setPickProduct] = useState<any>();
	const [dataImport, setDataImport] = useState<any>(undefined);
	const { stateProductsList } = useSelector((state: AppState) => state.productReducer);

	const { stateImportById, stateUpdateOneImport } = useSelector((e: AppState) => e.importReducer);
	const { stateListSuppliers } = useSelector((state: AppState) => state.suppliersReducer);
	const { stateListStores } = useSelector((state: AppState) => state.storesReducer);
	const [listStaff, setListStaff] = useState<any[]>([]);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

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
		if (isMount) return;
		const { success, data: dataMain, isLoading, error } = stateImportById;
		if (!isLoading) {
			if (success) {
				let data = dataMain?.data;
				setDataImport(data);
				let fakeDetails = [...data?.details];
				let fakeArray = [];
				for (let i = 0; i < fakeDetails.length; i++) {
					fakeArray.push({
						unit_id: fakeDetails[i]?.unit_id,
						sku: fakeDetails[i].sku,
						product_id: fakeDetails[i].id,
						product: fakeDetails[i].product,
						price: Number(fakeDetails[i].price),
						qty: Number(fakeDetails[i].qty)
					});
				}
				setListAddProducts(fakeArray);
				setPriceChange(data?.paid_amount);
				formCreate.setFieldsValue({
					supplier_id: data?.supplier_id,
					warehouse_id: data?.warehouse_id,
					total_amount: data?.total_amount ? data?.total_amount : 0,
					input_by: data?.input_by,
					input_at: data?.input_at ? moment(data?.input_at) : undefined,
					payment_code: data?.payment_code,
					payment_by: data?.payment_by,
					payment_at: data?.payment_at ? moment(data?.payment_at) : undefined,
					paid_amount: data?.paid_amount ? data?.paid_amount : 0,
					debit_amount: data?.debit_amount ? data?.debit_amount : 0,
					payment_method: data?.payment_method
				});
			} else if (success === false || error) {
			}
		}
	}, [stateImportById.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateListStores;
		if (!isLoading) {
			if (success) {
				let fakeArray = [];
				console.log(data?.data);
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
		const timer = setTimeout(() => {
			dispatch(fetchProductsList({ search: searchKeyword, page: 1, limit: 10 }));
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
				for (var i = 0; i < data?.data?.length; i++) {
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
		const { success, data, isLoading, error } = stateUpdateOneImport;
		if (!isLoading) {
			if (success) {
				if (typeSubmit === 1) {
					notifySuccess("Cập nhập thanh toán thành công");
				} else {
					notifySuccess("Nhập kho thành công");
				}
			} else if (success === false || error) {
				if (typeSubmit === 1) {
					notifySuccess("Cập nhập thanh toán thất bại");
				} else {
					notifySuccess("Nhập kho thất bại");
				}
			}
		}
	}, [stateUpdateOneImport.isLoading]);

	useEffect(() => {
		if (features.includes("MODULE_PRODUCTS__INSTALLSTORE__VIEW_DETAIL")) {
			if (!stateUpdateOneImport.isLoading) {
				dispatch(getImportById(paramsURL?.id));
			}
		} else {
			notifyWarning("Bạn không được quyền truy cập");
			history.push("/install-store");
		}
	}, [paramsURL, stateUpdateOneImport.isLoading]);

	useEffect(() => {
		dispatch(getListStores());
	}, []);

	useEffect(() => {
		dispatch(getListSuppliers());
	}, []);

	const submitCreate = (values: any) => {
		if (typeSubmit === 1) {
			if (!values.total_amount || (values?.payment_method === 2 && !values?.payment_code) || !values.paid_amount) {
				return notifyWarning("Vui lòng nhập đầy đủ thông tin thanh toán");
			}

			let params = {
				supplier_id: values.supplier_id,
				warehouse_id: values?.warehouse_id,
				total_amount: Number(values?.total_amount),
				payment_code: values?.payment_code,
				payment_by: listStaff.find((x: any) => x.value === values?.payment_by)?.label || undefined,

				payment_at: moment(values?.payment_at).format("YYYY-MM-DD HH:mm:ss"),
				paid_amount: Number(values?.paid_amount),
				minimum_amount: Number(values?.minimum_amount),
				debit_amount: Number(values?.debit_amount),
				payment_method: values?.payment_method,
				input_by: stateImportById?.data?.data?.input_by,
				input_ay: moment(stateImportById?.data?.data?.payment_at).format("YYYY-MM-DD HH:mm:ss"),
				payment_status: typeSubmit === 1 ? 2 : stateImportById?.data?.data?.payment_status,
				input_status: typeSubmit === 2 ? 2 : stateImportById?.data?.data?.input_status,

				details: listAddProducts
			};
			dispatch(updateOneImport(paramsURL?.id, params));
		} else {
			if (!values?.warehouse_id) {
				return notifyWarning("Vui lòng chọn kho");
			}
			let params = {
				supplier_id: stateImportById?.data?.data?.supplier_id,
				warehouse_id: values?.warehouse_id,
				total_amount: Number(stateImportById?.data?.data?.total_amount),
				payment_code: stateImportById?.data?.data?.payment_code,
				payment_by: stateImportById?.data?.data?.payment_by,
				payment_at: stateImportById?.data?.data?.payment_at
					? moment(stateImportById?.data?.data?.payment_at).format("YYYY-MM-DD HH:mm:ss")
					: undefined,
				paid_amount: Number(stateImportById?.data?.data?.paid_amount),
				minimum_amount: Number(stateImportById?.data?.data?.minimum_amount),
				debit_amount: Number(stateImportById?.data?.data?.debit_amount),
				payment_method: stateImportById?.data?.data?.payment_method,
				input_by: listStaff.find((x: any) => x.value === values?.input_by)?.label || undefined,
				input_at: moment(values?.input_at).format("YYYY-MM-DD HH:mm:ss"),
				payment_status: typeSubmit === 1 ? 2 : stateImportById?.data?.data?.payment_status,
				input_status: typeSubmit === 2 ? 2 : stateImportById?.data?.data?.input_status,

				details: listAddProducts
			};
			dispatch(updateOneImport(paramsURL?.id, params));
		}
	};
	const deleteProduct = (record: any) => {
		let a = [...listAddProducts];
		a = a.filter((x: any) => x.product_id !== record.product_id);
		setListAddProducts(a);
	};

	const submitFinishAdd = (values: any) => {
		let a = [...listAddProducts];
		let checked = a.find((x: any) => x.product_id === pickedProduct.id);
		if (!pickedProduct) {
			notifyWarning("Vui lòng chọn sản phẩm");
			return;
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
	const submitForm = (value: any) => {
		setTypeSubmit(value);
		formCreate.submit();
	};

	const sumPrice = (array: any[]) => {
		let price = 0;
		for (let i = 0; i < array.length; i++) {
			price = price + array[i].price * array[i].qty;
		}
		return price;
	};
	useEffect(() => {
		formCreate.setFieldsValue({
			total_amount: Number(sumPrice(listAddProducts)),
			debit_amount: Number(sumPrice(listAddProducts)) - priceChange
		});
	}, [listAddProducts, priceChange]);
	return (
		<div className="mainPages installStore__edit">
			<Modal visible={openModalAdd} title="Thêm mới sản phẩm" footer={null} onCancel={() => setOpenModalAdd(false)}>
				<ModalAddProduct handleCloseCallback={() => setOpenModalAdd(false)} />
			</Modal>
			<SubHeader
				breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Nhập hàng", link: "/install-store" }, { text: "Chi tiết" }]}
			/>

			<Roadmap
				array={[
					{
						title: "Tạo đơn",
						status: dataImport?.createdAt ? "A" : "D",
						description: ISO8601Formats(dataImport?.createdAt)
					},
					{
						title: "Duyệt",
						status: dataImport?.createdAt ? "A" : "D",
						description: ISO8601Formats(dataImport?.createdAt)
					},
					{
						title: "Nhập kho",
						status: dataImport?.input_status === 2 ? "A" : "D",
						description: dataImport?.input_status === 2 ? ISO8601Formats(dataImport?.input_at) : ""
					},
					{
						title: "Hoàn thành",
						status: dataImport?.input_status === 2 && dataImport?.payment_status === 2 ? "A" : "D",
						description:
							dataImport?.input_status === 2 && dataImport?.payment_status === 2
								? ISO8601Formats(dataImport?.input_at)
								: ""
					}
				]}
				data={dataImport}
			/>

			<Form
				layout="vertical"
				className="installStore__edit__body"
				form={formCreate}
				id="formCreate"
				onFinish={submitCreate}
				style={{ marginTop: "13px" }}
			>
				<div className="installStore__edit__body__left">
					<div className="installStore__edit__body__left__information">
						<div
							style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}
						>
							<h4>Thông tin nhập kho</h4>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
								{features.includes("MODULE_PRODUCTS__INSTALLSTORE__UPDATE") && dataImport?.payment_status === 1 && (
									<div onClick={() => submitForm(1)} className="defaultButton" style={{ marginRight: "8px" }}>
										<SvgMoneyPayment style={{ transform: "scale(0.8)" }} />
										&nbsp;Xác nhận thanh toán
									</div>
								)}
								{features.includes("MODULE_PRODUCTS__INSTALLSTORE__UPDATE") && dataImport?.input_status === 1 && (
									<div className="defaultButton" onClick={() => submitForm(2)}>
										<SvgIconPlus style={{ transform: "scale(0.8)" }} />
										&nbsp;Nhập kho
									</div>
								)}
							</div>
						</div>
						<Table
							style={{ marginTop: "13px" }}
							rowKey="product_id"
							dataSource={[...listAddProducts] || []}
							bordered
							columns={columnsData({ deleteProduct }) as any}
						/>
					</div>
				</div>
				<div className="installStore__edit__body__right">
					<div className="installStore__edit__body__right__information">
						<h4>Thông tin nhà cung cấp</h4>
						<Form.Item label="Nhà cung cấp" style={{ margin: "0" }} name="supplier_id">
							<Select
								options={listSuppliers}
								className="defaultSelect"
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
								disabled
							/>
						</Form.Item>
					</div>
					<div className="installStore__edit__body__right__information" style={{ marginTop: "16px" }}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between"
							}}
						>
							<h4 style={{ margin: "0" }}>Thông tin thanh toán</h4>{" "}
							<span
								className="roadmap__information__success"
								style={dataImport?.payment_status === 1 ? { background: "rgb(231,171,66)" } : {}}
							>
								{dataImport?.payment_status === 1 ? "Chưa thanh toán" : "Đã thanh toán"}
							</span>
						</div>

						<Form.Item label="Số tiền cần thanh toán (vnđ)" style={{ margin: "0 0 8px 0" }} name="total_amount">
							<InputNumber
								disabled
								className="defaultInputNumber"
								min={0}
								max={10000000000}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</Form.Item>
						<Form.Item label="Đã thanh toán (vnđ)" style={{ margin: "0 0 8px 0" }} name="paid_amount">
							<InputNumber
								onChange={(e) => setPriceChange(e)}
								disabled={dataImport?.payment_status === 2}
								className="defaultInputNumber"
								min={0}
								max={Number(sumPrice(listAddProducts))}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</Form.Item>
						<Form.Item label="Số tiền còn lại (công nợ) (vnđ)" style={{ margin: "0 0 8px 0" }} name="debit_amount">
							<InputNumber
								disabled={dataImport?.payment_status === 2}
								className="defaultInputNumber"
								min={0}
								max={10000000000}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</Form.Item>
						{/* <Form.Item label="Thanh toán tối thiểu (vnđ)" style={{ margin: "0 0 8px 0" }} name="minimum_amount">
							<InputNumber
								disabled={dataImport?.payment_status === 2}
								className="defaultInputNumber"
								min={0}
								max={10000000000}
								formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
							/>
						</Form.Item> */}
						{expandInformation && (
							<>
								<Form.Item label="Hình thức thanh toán" style={{ margin: "0 0 8px 0" }} name="payment_method">
									<Select
										filterOption={(input: any, option: any) =>
											removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
										}
										showSearch
										disabled={dataImport?.payment_status === 2}
										options={[
											{ label: "Tiền mặt", value: 1 },
											{ label: "Chuyển khoản", value: 2 }
										]}
										className="defaultSelect"
									/>
								</Form.Item>
								<Form.Item label="Mã tham chiếu" style={{ margin: "0 0 8px 0" }} name="payment_code">
									<Input disabled={dataImport?.payment_status === 2} className="defaultInput" />
								</Form.Item>
								<Form.Item label="Người thanh toán" style={{ margin: "0 0 8px 0" }} name="payment_by">
									<Select
										disabled={dataImport?.payment_status === 2}
										showSearch
										filterOption={(input: any, option: any) =>
											removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
										}
										className="defaultSelect"
										placeholder="Chọn nhân viên"
										options={listStaff}
									/>
								</Form.Item>
								<Form.Item label="Ngày thanh toán" style={{ margin: "0 0 8px 0" }} name="payment_at">
									<DatePicker showTime disabled={dataImport?.payment_status === 2} className="defaultInput" />
								</Form.Item>
							</>
						)}

						{!expandInformation && (
							<div
								style={{
									width: "100%",
									textAlign: "center",
									color: "#2980B0",
									cursor: "pointer"
								}}
								onClick={() => setExpandInformation(true)}
							>
								Xem thêm&nbsp;
							</div>
						)}
						{expandInformation && (
							<div
								style={{
									width: "100%",
									textAlign: "center",
									color: "#2980B0",
									cursor: "pointer"
								}}
								onClick={() => setExpandInformation(false)}
							>
								Rút gọn&nbsp;
							</div>
						)}
					</div>
					<div className="installStore__edit__body__right__information" style={{ marginTop: "16px" }}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between"
							}}
						>
							<h4 style={{ margin: "0" }}>Thông tin nhập kho</h4>{" "}
							<span
								className="roadmap__information__success"
								style={dataImport?.input_status === 1 ? { background: "rgb(231,171,66)" } : {}}
							>
								{dataImport?.input_status === 1 ? "Chưa nhập kho" : "Đã nhập kho"}
							</span>
						</div>

						<Form.Item label="Kho hàng" style={{ margin: "0" }} name="warehouse_id">
							<Select
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								showSearch
								options={listStores}
								className="defaultSelect"
								disabled={dataImport?.input_at}
							/>
						</Form.Item>
						{expandSubInformation && (
							<>
								<Form.Item label="Người nhập" style={{ margin: "0" }} name="input_by">
									<Select
										disabled={dataImport?.input_at}
										showSearch
										filterOption={(input: any, option: any) =>
											removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
										}
										className="defaultSelect"
										placeholder="Chọn nhân viên"
										options={listStaff}
									/>
								</Form.Item>
								<Form.Item label="Ngày nhập kho" style={{ margin: "0 0 8px 0" }} name="input_at">
									<DatePicker showTime className="defaultInput" disabled={dataImport?.input_at} />
								</Form.Item>
							</>
						)}

						{!expandSubInformation && (
							<div
								style={{
									width: "100%",
									textAlign: "center",
									color: "#2980B0",
									cursor: "pointer"
								}}
								onClick={() => setExpandSubInformation(true)}
							>
								{" "}
								Xem thêm&nbsp;
							</div>
						)}
						{expandSubInformation && (
							<div
								style={{
									width: "100%",
									textAlign: "center",
									color: "#2980B0",
									cursor: "pointer"
								}}
								onClick={() => setExpandSubInformation(false)}
							>
								Rút gọn&nbsp;
							</div>
						)}
					</div>
				</div>
			</Form>
		</div>
	);
};

export default InstallStoreEdit;
