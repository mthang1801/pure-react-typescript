import { DatePicker, Form, Input, Select, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SvgFilter from "src/assets/svg/SvgFilter";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgImport from "src/assets/svg/SvgImport";
import NavSearch from "src/components/navSearch/NavSearch";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { getListImport } from "src/services/actions/importStore.actions";
import { fetchProductsList } from "src/services/actions/product.actions";
import { getListSuppliers } from "src/services/actions/suppliers.actions";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { removeSign } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { columnsData, data } from "./data";

const InstallStoreList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [openNav, setOpenNav] = useState(false);
	const [formSearch] = Form.useForm();
	const [listSuppliers, setListSuppliers] = useState<any[]>([]);

	const [paramsFilter, setParamsFilter] = useState<any>({
		q: undefined,
		transaction_status: undefined,
		supplier_id: undefined,
		payment_status: undefined,
		input_status: undefined,
		from_date: undefined,
		to_date: undefined,
		page: 1,
		limit: 10
	});
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	const { stateListImport } = useSelector((e: AppState) => e.importReducer);
	const { stateListSuppliers } = useSelector((state: AppState) => state.suppliersReducer);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateListImport;
		if (!isLoading) {
			if (success) {
			} else if (success === false || error) {
			}
		}
	}, [stateListImport.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateListSuppliers;
		if (!isLoading) {
			if (success) {
				console.log("sup", data);
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
		dispatch(getListSuppliers());
	}, []);

	useEffect(() => {
		if (features.includes("MODULE_PRODUCTS__INSTALLSTORE__VIEWS")) {
			dispatch(getListImport(paramsFilter));
		}
	}, [paramsFilter]);

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			...paramsFilter,

			page: page,
			limit: pageSize
		});
	};
	const submitSearch = (values: any) => {
		let params = {
			q: values?.q,
			transaction_status: values?.transaction_status,
			supplier_id: values?.supplier_id,
			payment_status: values?.payment_status,
			input_status: values?.input_status,
			from_date: values?.dateTime ? moment(values?.dateTime[0]).format("YYYY-MM-DD") + " 0:0:0" : undefined,
			to_date: values?.dateTime ? moment(values?.dateTime[1]).format("YYYY-MM-DD") + " 23:59:59" : undefined
		};
		setParamsFilter({ ...paramsFilter, ...params, page: 1 });
	};

	const submitRefresh = () => {
		setParamsFilter({
			q: undefined,
			transaction_status: undefined,
			supplier_id: undefined,
			payment_status: undefined,
			input_status: undefined,
			from_date: undefined,
			to_date: undefined,
			page: 1,
			limit: 10
		});
		formSearch.resetFields();
	};
	return (
		<div className="mainPages ordersPage">
			<OverlaySpinner open={openNav} onClickCallback={() => setOpenNav(false)} />

			<SubHeader breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Nhập hàng" }]} />
			<div className="ordersPage__search" style={{ padding: "8px 16px 16px 16px" }}>
				<Form
					id="formSearch"
					form={formSearch}
					layout="vertical"
					className="ordersPage__search__form"
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
							<Form.Item name="payment_status" label="Trạng thái thanh toán" style={{ margin: "0 0 13px 0" }}>
								<Select
									options={[
										{
											label: "Tất cả",
											value: null
										},
										{
											label: "Chưa thanh toán",
											value: 1
										},
										{
											label: "Đã thanh toán",
											value: 2
										}
									]}
									className="defaultSelect"
									placeholder="Chọn trạng thái"
									filterOption={(input: any, option: any) =>
										removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
									}
									showSearch
								/>
							</Form.Item>
							<Form.Item name="input_status" label="Trạng thái nhập kho" style={{ margin: "0 0 13px 0" }}>
								<Select
									showSearch
									filterOption={(input: any, option: any) =>
										removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
									}
									options={[
										{
											label: "Tất cả",
											value: null
										},
										{
											label: "Chưa nhập kho",
											value: 1
										},
										{
											label: "Đã nhập kho",
											value: 2
										}
									]}
									className="defaultSelect"
									placeholder="Chọn trạng thái"
								/>
							</Form.Item>
							<Form.Item name="dateTime" style={{ margin: "0 0 13px 0" }} label="Ngày tạo">
								<DatePicker.RangePicker className="defaultDate" />
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
										submitRefresh();
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
						name="q"
						label="Mã phiếu"
						className="ordersPage__search__form__item"
						style={{
							width: features.includes("MODULE_PRODUCTS__INSTALLSTORE__CREATE")
								? "calc((100% - 530px) / 3)"
								: "calc((100% - 402px) / 3)",
							margin: "0"
						}}
					>
						<Input className="defaultInput" placeholder="Nhập mã phiếu" />
					</Form.Item>

					<Form.Item
						name="supplier_id"
						label="Nhà cung cấp"
						style={{
							width: features.includes("MODULE_PRODUCTS__INSTALLSTORE__CREATE")
								? "calc((100% - 530px) / 3)"
								: "calc((100% - 402px) / 3)",
							margin: "0"
						}}
					>
						<Select
							showSearch
							filterOption={(input: any, option: any) =>
								removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
							}
							options={listSuppliers || []}
							className="defaultSelect"
							placeholder="Chọn nhà cung cấp"
						/>
					</Form.Item>
					<Form.Item
						name="transaction_status"
						label="Trạng thái"
						style={{
							width: features.includes("MODULE_PRODUCTS__INSTALLSTORE__CREATE")
								? "calc((100% - 530px) / 3)"
								: "calc((100% - 402px) / 3)",
							margin: "0"
						}}
					>
						<Select
							options={[
								{
									label: "Chưa hoàn thành",
									value: 1
								},
								{
									label: "Hoàn thành",
									value: 2
								}
							]}
							placeholder="Chọn trạng thái"
							className="defaultSelect"
						/>
					</Form.Item>

					<button className="searchButton" style={{ marginTop: "19px" }} type="submit" form="formSearch">
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp; Tìm kiếm
					</button>
					<div className="searchButton" style={{ marginTop: "19px" }} onClick={() => submitRefresh()}>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</div>
					<div className="searchButton" style={{ marginTop: "19px" }} onClick={() => setOpenNav(true)}>
						<SvgFilter style={{ transform: "scale(0.6)" }} />
						&nbsp; Lọc nâng cao
					</div>
					{features.includes("MODULE_PRODUCTS__INSTALLSTORE__CREATE") && (
						<Link to={routerNames.INSTALL_STORE_CREATE}>
							<button className="defaultButton " style={{ margin: "19px 0 0 0" }}>
								<SvgIconPlus style={{ path: "#fcd804", transform: "scale(0.8)" }} />
								&nbsp;Nhập hàng
							</button>
						</Link>
					)}
				</Form>
			</div>
			<div className="contentSection">
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						marginBottom: "13px"
					}}
				>
					<div className="searchButton" style={{ cursor: "not-allowed" }}>
						<SvgImport style={{ transform: "scale(0.7)" }} />
						&nbsp; Xuất file
					</div>
				</div>
				<TableStyledAntd
					scroll={{ y: "calc(100vh - 388px)" }}
					rowKey="id"
					dataSource={stateListImport?.data?.data}
					bordered
					rowSelection={false}
					pagination={false}
					columns={columnsData({ features }) as any}
					widthCol1="80px"
					widthCol3="130px"
					widthCol4="155px"
					widthCol5="155px"
					widthCol6="155px"
					widthCol7="12.5%"
					widthCol8="12.5%"
				/>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateListImport?.data?.paging?.total} đơn `}
					total={stateListImport?.data?.paging?.total}
				/>
			</div>
		</div>
	);
};

export default InstallStoreList;
