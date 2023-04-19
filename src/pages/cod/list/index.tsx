import { DatePicker, Form, Input, Select, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SvgExport from "src/assets/svg/SvgExport";
import SvgFilter from "src/assets/svg/SvgFilter";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgImport from "src/assets/svg/SvgImport";
import SvgSort from "src/assets/svg/SvgSort";
import NavSearch from "src/components/navSearch/NavSearch";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { getListCod } from "src/services/actions/cod.actions";
import { fetchProductsList } from "src/services/actions/product.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { removeSign } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { columnsData } from "./data";

const CODList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [formSearch] = Form.useForm();
	const [paramsFilter, setParamsFilter] = useState<any>({
		q: undefined,
		shipping_unit_id: undefined,
		for_control_status: undefined,
		payment_status: undefined,
		from_date: undefined,
		to_date: undefined,
		page: 1,
		limit: 10
	});
	const [listShipping, setListShipping] = useState<any[]>([]);
	const [openNav, setOpenNav] = useState(false);
	const { stateListCod } = useSelector((state: AppState) => state.codReducer);
	useEffect(() => {
		dispatch(getListCod(paramsFilter));
	}, [paramsFilter]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateListCod;
		if (!isLoading) {
			if (success) {
			} else if (success === false || error) {
			}
		}
	}, [stateListCod.isLoading]);

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			...paramsFilter,

			page: page,
			limit: pageSize
		});
	};
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

	const onSubmitSearchFilter = (values: any) => {
		setParamsFilter({
			q: values?.q,
			page: 1,
			limit: 10,
			shipping_unit_id: values?.shipping_unit_id,
			for_control_status: values?.for_control_status,
			payment_status: values?.payment_status,
			from_date: values?.dateTime ? moment(values?.dateTime[0]).format("YYYY-MM-DD") + " 0:0:0" : undefined,
			to_date: values?.dateTime ? moment(values?.dateTime[1]).format("YYYY-MM-DD") + " 23:59:59" : undefined
		});
	};

	const onResetFilterParams = () => {
		setParamsFilter({
			q: undefined,
			shipping_unit_id: undefined,
			for_control_status: undefined,
			payment_status: undefined,
			from_date: undefined,
			to_date: undefined,
			page: 1,
			limit: 10
		});
		formSearch.resetFields();
	};
	return (
		<div className="mainPages productPage">
			<OverlaySpinner open={openNav} onClickCallback={() => setOpenNav(false)} />
			<SubHeader breadcrumb={[{ text: "Vận chuyển" }, { text: "Đối soát COD và cước phí" }]} />
			<div className="ordersPage__search">
				<Form
					id="formSearch"
					form={formSearch}
					onFinish={onSubmitSearchFilter}
					layout="vertical"
					className="ordersPage__search__form"
				>
					<NavSearch open={openNav}>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<h4>Tìm kiếm nâng cao</h4>
							<h4 style={{ cursor: "pointer", transform: "scale(1.5)" }} onClick={() => setOpenNav(false)}>
								X
							</h4>
						</div>
						<div>
							<Form.Item
								name="payment_status"
								label="Trạng thái thanh toán"
								className="ordersPage__search__form__item"
								style={{ width: "100%", margin: "0" }}
							>
								<Select
									placeholder="Chọn trạng thái thanh toán"
									options={[
										{ label: "Chưa thanh toán", value: 1 },
										{ label: "Đã thanh toán", value: 2 }
									]}
									className="defaultSelect"
									showSearch
									filterOption={(input: any, option: any) =>
										removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
									}
								/>
							</Form.Item>
							<Form.Item name="dateTime" label="Ngày tạo" style={{ margin: "4px 0 0 0", width: "100%" }}>
								<DatePicker.RangePicker className="defaultDate" format={"YYYY-MM-DD"} />
							</Form.Item>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
								<button className="searchButton" style={{ width: "calc(50% - 4px)" }}>
									<SvgIconSearch />
									&nbsp; Tìm kiếm
								</button>
								<div
									className="searchButton"
									style={{ width: "calc(50% - 4px)" }}
									onClick={() => {
										onResetFilterParams();
										formSearch.resetFields();
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
						label="Mã phiếu đối soát"
						className="ordersPage__search__form__item"
						style={{ width: "calc((100% - 590px) / 3)", margin: "0" }}
					>
						<Input className="defaultInput" placeholder="Nhập mã" />
					</Form.Item>
					<Form.Item
						name="shipping_unit_id"
						label="Đối tác vận chuyển"
						className="ordersPage__search__form__item"
						style={{ width: "calc((100% - 590px) / 3)", margin: "0" }}
					>
						<Select
							placeholder="Chọn đối tác vận chuyển"
							options={listShipping}
							className="defaultSelect"
							showSearch
							filterOption={(input: any, option: any) =>
								removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
							}
						/>
					</Form.Item>
					<Form.Item
						name="for_control_status"
						label="Trạng thái đối soát"
						className="ordersPage__search__form__item"
						style={{ width: "calc((100% - 590px) / 3)", margin: "0" }}
					>
						<Select
							placeholder="Chọn trạng thái đối tác"
							options={[
								{ label: "Đang đối soát", value: 1 },
								{ label: "Đã đối soát", value: 2 },
								{ label: "Đã huỷ", value: 3 }
							]}
							className="defaultSelect"
							showSearch
							filterOption={(input: any, option: any) =>
								removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
							}
						/>
					</Form.Item>

					<button className="searchButton" style={{ marginTop: "19px" }}>
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp; Tìm kiếm
					</button>
					<button
						className="searchButton"
						style={{ marginTop: "19px" }}
						onClick={() => {
							onResetFilterParams();
							formSearch.resetFields();
						}}
					>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</button>
					<button className="searchButton" style={{ marginTop: "19px" }} onClick={() => setOpenNav(true)}>
						<SvgFilter style={{ transform: "scale(0.7)" }} />
						&nbsp;Lọc nâng cao
					</button>
					<Link to={routerNames.COD_CREATE}>
						<button
							className="defaultButton"
							style={{ marginTop: "19px" }}
							// onClick={() => setModalAddStore(true)}
						>
							<SvgIconPlus style={{ transform: "scale(0.7)" }} />
							&nbsp;Tạo phiếu đối soát
						</button>
					</Link>
				</Form>
			</div>
			<div className="contentSection">
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						marginBottom: "8px"
					}}
				>
					<div className="searchButton" style={{ marginRight: "8px" }}>
						<SvgImport style={{ transform: "scale(0.7)" }} />
						&nbsp; Tải file mẫu
					</div>
					{/* <div className="searchButton" style={{ marginRight: "8px" }}>
						<SvgImport style={{ transform: "scale(0.7)" }} />
						&nbsp; Nhập file
					</div> */}
					<div className="searchButton" style={{ marginRight: "8px" }}>
						<SvgExport style={{ transform: "scale(0.7)" }} />
						&nbsp; Xuất file
					</div>
				</div>
				<TableStyledAntd
					rowKey="id"
					dataSource={stateListCod?.data?.data}
					bordered
					rowSelection={{}}
					pagination={false}
					loading={stateListCod?.data?.isLoading}
					columns={columnsData() as any}
					widthCol1="50px"
					widthCol2="100px"
					widthCol3="calc((100% - 390px ) / 6)"
					widthCol4="140px"
					widthCol5="100px"
					widthCol6="calc((100% - 390px ) / 6)"
					widthCol7="calc((100% - 390px ) / 6)"
					widthCol8="calc((100% - 390px ) / 6)"
					widthCol9="calc((100% - 390px ) / 6)"
					widthCol10="calc(((100% - 390px ) / 6) - 60px)"
				/>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateListCod?.data?.paging.total || 0} phiếu `}
					total={stateListCod?.data?.paging.total}
				/>
			</div>
		</div>
	);
};

export default CODList;
