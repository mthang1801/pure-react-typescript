import { DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SvgFilter from "src/assets/svg/SvgFilter";
import SvgIconFilter from "src/assets/svg/SvgIconFilter";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import NavSearch from "src/components/navSearch/NavSearch";
import { notifyError } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";

import { AttributeTypeEnum } from "src/constants/enum";
import { fetchAttributesList, updateAttribute } from "src/services/actions/attribute.actions";
import { getListInventory } from "src/services/actions/inventoryReceipts.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_STORES } from "src/services/api/url.index";
import { AppState } from "src/types";
import routerNames from "src/utils/data/routerName";
import { removeSign } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifySuccess } from "../../../components/notification/index";
import { columnsData } from "./data";
const { Option } = Select;

const InventoryReceiptsList = () => {
	const [formSearch] = Form.useForm();
	const isMount = useIsMount();
	const dispatch = useDispatch();
	const [listWarehouse, setListWarehouse] = useState<any[]>([]);
	const [openNav, setOpenNav] = useState(false);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	const { stateListInventory } = useSelector((e: AppState) => e.inventoryReceiptsReducer);
	const [inventoryList, setInventoryList] = useState<any[]>([]);

	const [paramsFilter, setParamsFiler] = useState<any>({
		q: "",
		page: 1,
		limit: 10,
		status: undefined,
		warehouse_id: undefined,
		from_created_date: undefined,
		to_created_date: undefined,
		from_inventory_date: undefined,
		to_inventory_date: undefined,
		from_completed_date: undefined,
		to_completed_date: undefined
	});

	useEffect(() => {
		if (features.includes("MODULE_PRODUCTS__CHECK__VIEWS")) {
			dispatch(getListInventory(paramsFilter));
		}
	}, [paramsFilter]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateListInventory;
		if (success) {
			setInventoryList(data.data);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateListInventory.isLoading]);

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

	const onFilterStatus = (value: string) => {
		setParamsFiler((prevState: any) => ({ ...prevState, status: value }));
	};

	const onSubmitSearchFilter = (values: any) => {
		setParamsFiler({
			q: values?.q,
			page: 1,
			limit: 10,
			status: values?.status,
			warehouse_id: values?.warehouse_id,
			from_created_date: values?.pickerCreate
				? moment(values?.pickerCreate[0]).format("YYYY-MM-DD") + " 0:0:0"
				: undefined,
			to_created_date: values?.pickerCreate
				? moment(values?.pickerCreate[1]).format("YYYY-MM-DD") + " 23:59:59"
				: undefined,
			from_inventory_date: values?.pickerCheck
				? moment(values?.pickerCheck[0]).format("YYYY-MM-DD") + " 0:0:0"
				: undefined,
			to_inventory_date: values?.pickerCheck
				? moment(values?.pickerCheck[1]).format("YYYY-MM-DD") + " 23:59:59"
				: undefined,
			from_completed_date: values?.pickerComplete
				? moment(values?.pickerComplete[0]).format("YYYY-MM-DD") + " 0:0:0"
				: undefined,
			to_completed_date: values?.pickerComplete
				? moment(values?.pickerComplete[1]).format("YYYY-MM-DD") + " 23:59:59"
				: undefined
		});
	};

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFiler({
			...paramsFilter,
			page,
			limit: pageSize
		});
	};

	const onResetFilterParams = () => {
		setParamsFiler({
			q: undefined,
			page: 1,
			limit: 10,
			status: undefined,
			warehouse_id: undefined
		});
		formSearch.resetFields();
	};

	return (
		<div className="mainPages productPage">
			<OverlaySpinner open={openNav} onClickCallback={() => setOpenNav(false)} />

			<SubHeader breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Kiểm hàng" }]} />
			<div className="ordersPage__search" style={{ padding: "8px 16px 16px 16px" }}>
				<Form
					id="formSearch"
					form={formSearch}
					layout="vertical"
					onFinish={onSubmitSearchFilter}
					style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}
				>
					<NavSearch open={openNav}>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<h4>Tìm kiếm nâng cao</h4>
							<h4 style={{ cursor: "pointer", transform: "scale(1.5)" }} onClick={() => setOpenNav(false)}>
								X
							</h4>
						</div>
						<div>
							<Form.Item name="pickerCreate" label="Ngày tạo" style={{ margin: "4px 0 0 0", width: "100%" }}>
								<DatePicker.RangePicker className="defaultDate" format={"YYYY-MM-DD"} />
							</Form.Item>
							<Form.Item name="pickerCheck" label="Ngày kiểm hàng" style={{ margin: "4px 0 0 0", width: "100%" }}>
								<DatePicker.RangePicker className="defaultDate" format={"YYYY-MM-DD"} />
							</Form.Item>
							<Form.Item name="pickerComplete" label="Ngày hoàn thành" style={{ margin: "4px 0 0 0", width: "100%" }}>
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
						label="Mã phiếu"
						style={{
							margin: "0",
							width: features.includes("MODULE_PRODUCTS__CHECK__CREATE")
								? "calc((100% - 536px) / 3 )"
								: "calc((100% - 396px) / 3 )",
							minWidth: "120px"
						}}
					>
						<Input className="defaultInput" placeholder="Nhập mã phiếu" />
					</Form.Item>
					<Form.Item
						name="warehouse_id"
						label="Kho hàng"
						style={{
							margin: "0",
							width: features.includes("MODULE_PRODUCTS__CHECK__CREATE")
								? "calc((100% - 536px) / 3 )"
								: "calc((100% - 396px) / 3 )",
							minWidth: "120px"
						}}
					>
						<Select
							options={listWarehouse}
							className="defaultSelect"
							placeholder="Chọn kho hàng"
							showSearch
							filterOption={(input: any, option: any) =>
								removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
							}
						/>
					</Form.Item>
					<Form.Item
						name="status"
						label="Trạng thái"
						style={{
							margin: "0",
							width: features.includes("MODULE_PRODUCTS__CHECK__CREATE")
								? "calc((100% - 536px) / 3 )"
								: "calc((100% - 396px) / 3 )",
							minWidth: "120px"
						}}
					>
						<Select
							filterOption={(input: any, option: any) =>
								removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
							}
							showSearch
							defaultValue={null}
							options={[
								{ value: null, label: "Tất cả" },
								{ value: 1, label: "Đang kiểm hàng" },
								{ value: 2, label: "Đã kiểm hàng" },
								{ value: 3, label: "Đã huỷ" }
							]}
							className="defaultSelect"
						/>
					</Form.Item>

					{/* <Form.Item name="purposes" label="Mục đích" className="ordersPage__search__form__item hidden xl:block">
						<Select className="defaultSelect" placeholder="Tất cả" onChange={onChangePurpose}>
							<Option value="">""</Option>
							{Object.entries(AttributePurposeEnum).map(([key, val], i) => (
								<Option value={val} key={key}>
									{key}
								</Option>
							))}
						</Select>
							</Form.Item> */}

					<button className="searchButton " style={{ marginTop: "19px" }}>
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp; Tìm kiếm
					</button>
					<button className="searchButton  " onClick={onResetFilterParams} style={{ marginTop: "21px" }}>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</button>
					<button className="searchButton " style={{ marginTop: "19px" }} onClick={() => setOpenNav(true)}>
						<SvgFilter style={{ transform: "scale(0.6)" }} />
						&nbsp;Lọc nâng cao
					</button>
					{features.includes("MODULE_PRODUCTS__CHECK__CREATE") && (
						<Link to={routerNames.INVENTORY_RECEIPTS_CREATE}>
							<button className="defaultButton " style={{ margin: "19px 0 0 0" }}>
								<SvgIconPlus style={{ path: "#fcd804", transform: "scale(0.8)" }} />
								&nbsp;Tạo phiếu
							</button>
						</Link>
					)}
				</Form>
			</div>
			<div className="contentSection">
				<TableStyledAntd
					scroll={{ y: "calc(100vh - 340px)" }}
					rowKey="id"
					dataSource={inventoryList || []}
					bordered
					loading={stateListInventory.isLoading || false}
					columns={columnsData({ features }) as any}
					pagination={false}
					widthCol1="10%"
					widthCol2="15%"
					widthCol3="15%"
					widthCol4="15%"
					widthCol5="15%"
					widthCol6="15%"
					widthCol7="15%"
				/>
				<PanigationAntStyled
					style={{ marginTop: "0.5rem" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					onChange={onChangePaging}
					showSizeChanger
					showTotal={() => `Tổng ${stateListInventory?.data?.paging.total} phiếu `}
					total={stateListInventory?.data?.paging.total}
				/>
			</div>
		</div>
	);
};

export default InventoryReceiptsList;
