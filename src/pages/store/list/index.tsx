import { DatePicker, Form, Input, Modal, Select, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import { notifyError, notifySuccess } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { createOneStore, getListStores, updateOneStore } from "src/services/actions/stores.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import AddStore from "../components/AddStore";
import { columnsData } from "./data";

const StoreList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [createForm] = Form.useForm();
	const [formSearch] = Form.useForm();
	const [recordEdit, setRecordEdit] = useState<any>({});
	const [visible, setVisible] = useState(false);
	const [stateName, setStateName] = useState<any>({
		province_name: undefined,
		district_name: undefined,
		ward_name: undefined
	});
	const [isCreate, setIsCreate] = useState(false);
	const [statusEdit, setStatusEdit] = useState(false);
	const [paramsFilter, setParamsFilter] = useState({
		q: undefined,
		status: undefined,
		qty_in_stock: 0,
		page: 1,
		limit: 10
	});
	const [listStaffAdd, setListStaffAdd] = useState<any[]>([]);
	const { stateCreateOneStore, stateUpdateOneStore, stateListStores } = useSelector(
		(state: AppState) => state.storesReducer
	);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	// useEffect(() => {
	// 	const getCities = async () => {
	// 		let headers: any = {
	// 			"Content-Type": "application/json,text/plain, */*"
	// 		};
	// 		let token = localGetToken();
	// 		let uuid = localGetAuthUUID();
	// 		if (token) {
	// 			headers.Authorization = token;
	// 			headers["x-auth-uuid"] = uuid;
	// 		}

	// 		try {
	// 			const { data } = await axios.get(`${API_URL}/warehouse-staffs?level=1`, {
	// 				headers: headers
	// 			});
	// 			if (data) {
	// 				let fake = [];
	// 				for (let i = 0; i < data?.data?.length; i++) {
	// 					fake.push({
	// 						value: data?.data[i]?.id,
	// 						label: data?.data[i]?.warehouse_staff_name
	// 					});
	// 				}
	// 				setListStaff(fake);
	// 			}
	// 		} catch (error) {}
	// 	};
	// 	getCities();
	// }, []);
	useEffect(() => {
		if (features.includes("MODULE_PRODUCTS__STORES__VIEWS")) {
			if (!stateUpdateOneStore.isLoading && !stateCreateOneStore.isLoading) {
				dispatch(getListStores(paramsFilter));
			}
		}
	}, [paramsFilter, stateUpdateOneStore.isLoading, stateCreateOneStore.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, isLoading, error } = stateListStores;
		if (!isLoading) {
			if (success) {
			} else if (success === false || error) {
			}
		}
	}, [stateListStores.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { message, success, isLoading, error } = stateUpdateOneStore;
		if (!isLoading) {
			if (success) {
				notifySuccess("Cập nhật thành công!");
				setVisible(false);
				createForm.resetFields();
			} else if (success === false || error) {
				notifyError(message + "");
			}
		}
	}, [stateUpdateOneStore.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { message, success, isLoading, error } = stateCreateOneStore;
		if (!isLoading) {
			if (success) {
				notifySuccess("Tạo kho thành công!");
				setVisible(false);
				createForm.resetFields();
			} else if (success === false || error) {
				notifyError(message + "");
			}
		}
	}, [stateCreateOneStore.isLoading]);

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			...paramsFilter,

			page: page,
			limit: pageSize
		});
	};

	const changeStatus = (value: any, record: any) => {
		dispatch(updateOneStore(record.id, { ...record, status: value }));
	};
	const submitSearch = (values: any) => {
		setParamsFilter({ ...paramsFilter, ...values, page: 1 });
	};
	const editRecord = (record: any) => {
		createForm.setFieldsValue({
			warehouse_code: record.warehouse_code,
			warehouse_name: record.warehouse_name,
			phone: record.phone,
			province_id: record.province_id,
			district_id: record.district_id,
			ward_id: record.ward_id,
			address: record.address,
			longitude: record.longitude,
			latitude: record.latitude,
			contact_id: record.warehouse_manager_id,
			status: record.status,
			stock_quantity: record.qty_in_stock
		});
		let fakeListStaff = [];
		for (let i = 0; i < record?.warehouse_staff?.length; i++) {
			fakeListStaff.push({
				user_id: record?.warehouse_staff[i]?.user_id,
				status: record?.warehouse_staff[i]?.status,
				fullname: record?.warehouse_staff[i]?.user_info?.fullname,
				phone: record?.warehouse_staff[i]?.user_info?.phone,
				role_name: record?.warehouse_staff[i]?.user_info?.userRole?.role?.role_name,
				email: record?.warehouse_staff[i]?.user_info?.email
			});
		}
		setListStaffAdd(fakeListStaff);
		setRecordEdit(record);
		setVisible(true);
		setIsCreate(false);
		setStatusEdit(record.status);
	};

	const submitForm = (values: any) => {
		let staffFake = [];
		let newStaffFake = [];
		for (let i = 0; i < listStaffAdd.length; i++) {
			if (listStaffAdd[i].new) {
				newStaffFake.push({ user_id: listStaffAdd[i].user_id, status: listStaffAdd[i].status });
			} else {
				staffFake.push({ user_id: listStaffAdd[i].user_id, status: listStaffAdd[i].status });
			}
		}

		if (isCreate) {
			dispatch(
				createOneStore({
					warehouse_code: values.warehouse_code,
					warehouse_name: values.warehouse_name,
					phone: values.phone,
					province_id: values.province_id,
					district_id: values.district_id,
					ward_id: values.ward_id,
					province_name: stateName.province_name,
					district_name: stateName.district_name,
					ward_name: stateName.ward_name,
					address: values.address,
					longitude: values?.longitude.toString(),
					latitude: values?.latitude.toString(),
					warehouse_manager_id: values.contact_id || 1,
					status: statusEdit,
					staffs: newStaffFake
				})
			);
		} else {
			dispatch(
				updateOneStore(recordEdit.id, {
					warehouse_code: values.warehouse_code,
					warehouse_name: values.warehouse_name,
					phone: values.phone,
					province_id: values.province_id,
					district_id: values.district_id,
					ward_id: values.ward_id,
					address: values.address,
					province_name: stateName.province_name,
					district_name: stateName.district_name,
					ward_name: stateName.ward_name,
					longitude: values?.longitude.toString(),
					latitude: values?.latitude.toString(),
					warehouse_manager_id: values.contact_id || 1,
					status: statusEdit,
					staffs: staffFake?.length > 0 ? staffFake : undefined,
					more_staffs: newStaffFake?.length > 0 ? newStaffFake : undefined
				})
			);
		}
	};
	const getNameCallback = (value: any, type: any) => {
		console.log(value);
		if (type === 1) {
			setStateName({ ...stateName, province_name: value });
		}

		if (type === 2) {
			setStateName({ ...stateName, district_name: value });
		}

		if (type === 3) {
			setStateName({ ...stateName, ward_name: value });
		}
	};
	return (
		<div className="mainPages ordersPage">
			<OverlaySpinner text="Đang xử lý..." open={stateCreateOneStore.isLoading || stateUpdateOneStore.isLoading} />
			<Modal
				title={isCreate ? "Thêm mới" : "Chi tiết"}
				open={visible}
				onCancel={() => {
					setVisible(false);
					setRecordEdit({});
				}}
				footer={null}
				width={900}
			>
				<Form className="formAddStore" layout="vertical" form={createForm} id="createForm" onFinish={submitForm}>
					<AddStore
						form={createForm}
						status={statusEdit}
						getNameCallback={getNameCallback}
						setStatus={setStatusEdit}
						dataEdit={recordEdit}
						listStaffAdd={listStaffAdd}
						setListStaffAdd={setListStaffAdd}
						features={features}
					/>
				</Form>
			</Modal>
			<SubHeader breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Quản lý kho" }]} />
			<div className="ordersPage__search" style={{ padding: "8px 16px 16px 16px" }}>
				<Form
					id="formSearch"
					form={formSearch}
					layout="vertical"
					className="ordersPage__search__form"
					onFinish={submitSearch}
					initialValues={{
						qty_in_stock: 0
					}}
				>
					<Form.Item
						name="q"
						label="Tìm kiếm"
						className="ordersPage__search__form__item"
						style={{
							width: features.includes("MODULE_PRODUCTS__STORES__CREATE")
								? "calc((100% - 400px) / 3)"
								: "calc((100% - 272px) / 3)",
							margin: "0"
						}}
					>
						<Input className="defaultInput" placeholder="Tên, mã kho" />
					</Form.Item>
					<Form.Item
						name="qty_in_stock"
						label="Tồn kho >"
						className="ordersPage__search__form__item"
						style={{
							width: features.includes("MODULE_PRODUCTS__STORES__CREATE")
								? "calc((100% - 400px) / 3)"
								: "calc((100% - 272px) / 3)",
							margin: "0"
						}}
					>
						<Input className="defaultInput" />
					</Form.Item>
					<Form.Item
						name="status"
						label="Trạng thái hoạt động"
						className="ordersPage__search__form__item"
						style={{
							width: features.includes("MODULE_PRODUCTS__STORES__CREATE")
								? "calc((100% - 400px) / 3)"
								: "calc((100% - 272px) / 3)",
							margin: "0"
						}}
					>
						<Select
							options={[
								{ label: "Hoạt động", value: true },
								{ label: "Ngừng hoạt động", value: false }
							]}
							placeholder="Chọn trạng thái"
							className="defaultSelect"
						/>
					</Form.Item>

					<button className="searchButton" style={{ marginTop: "19px" }} type="submit" form="formSearch">
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp; Tìm kiếm
					</button>
					<button
						className="searchButton"
						style={{ marginTop: "19px" }}
						onClick={() => {
							formSearch.resetFields();
							setParamsFilter({
								q: undefined,
								status: undefined,
								qty_in_stock: 0,
								page: 1,
								limit: 10
							});
						}}
					>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</button>
					{features.includes("MODULE_PRODUCTS__STORES__CREATE") && (
						<div
							className="defaultButton"
							style={{ marginTop: "19px" }}
							onClick={() => {
								setIsCreate(true);
								setVisible(true);
								createForm.resetFields();
							}}
						>
							<SvgIconPlus style={{ transform: "scale(0.8)" }} />
							&nbsp;Thêm mới
						</div>
					)}
				</Form>
			</div>
			<div className="contentSection">
				<TableStyledAntd
					scroll={{ y: "calc(100vh - 345px)" }}
					rowKey="warehouse_id"
					dataSource={stateListStores?.data?.data}
					pagination={false}
					bordered
					columns={columnsData({ changeStatus, editRecord, features }) as any}
					widthCol1="8%"
					widthCol2="17%"
					widthCol3="22%"
					widthCol4="14%"
					widthCol5="11%"
					widthCol6="9%"
					widthCol7="9%"
					widthCol8="9%"
				/>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateListStores?.data?.paging.total} kho `}
					total={stateListStores?.data?.paging.total}
				/>
			</div>
		</div>
	);
};

export default StoreList;
