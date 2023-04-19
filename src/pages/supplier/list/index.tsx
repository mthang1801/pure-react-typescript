import { Form, Input, Modal, Select, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgExport from "src/assets/svg/SvgExport";
import SvgIconExportFile from "src/assets/svg/SvgIconExportFile";
import SvgIconFilter from "src/assets/svg/SvgIconFilter";
import SvgIconImportFile from "src/assets/svg/SvgIconImportFile";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgImport from "src/assets/svg/SvgImport";
import SvgSort from "src/assets/svg/SvgSort";
import { notifyError, notifySuccess } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { createOneSuppliers, getListSuppliers, updateOneSuppliers } from "src/services/actions/suppliers.actions";
import { API_URL, API_URL_MASTER } from "src/services/api/config";
import { AppState } from "src/types";
import { platforms } from "src/utils/helpers/functions/data";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import AddSupplier from "../components/AddSupplier";
import { columnsData } from "./data";

const SupplierList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [searchForm] = Form.useForm();
	const [createForm] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [recordEdit, setRecordEdit] = useState<any>({});
	const [isCreate, setIsCreate] = useState(false);
	const [statusEdit, setStatusEdit] = useState(false);
	const [paramsFilter, setParamsFilter] = useState({
		q: undefined,
		status: undefined,
		page: 1,
		limit: 10
	});
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	const { stateListSuppliers, stateUpdateOneSupplier, stateCreateOneSupplier } = useSelector(
		(state: AppState) => state.suppliersReducer
	);

	useEffect(() => {
		if (features.includes("MODULE_PRODUCTS__SUPPLIER__VIEWS")) {
			if (!stateUpdateOneSupplier.isLoading && !stateCreateOneSupplier.isLoading) {
				dispatch(getListSuppliers(paramsFilter));
			}
		}
	}, [paramsFilter, stateUpdateOneSupplier.isLoading, stateCreateOneSupplier.isLoading]);
	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error, message } = stateListSuppliers;
		if (!isLoading) {
			if (success) {
			} else if (success === false || error) {
				notifyError("Lấy dữ liệu thất bại!" + message);
			}
		}
	}, [stateListSuppliers.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { message, success, data, isLoading, error } = stateUpdateOneSupplier;
		if (!isLoading) {
			if (success) {
				notifySuccess("Cập nhật thành công!");
				setVisible(false);
				createForm.resetFields();
			} else if (success === false || error) {
				notifyError(message + "");
			}
		}
	}, [stateUpdateOneSupplier.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { message, success, data, isLoading, error } = stateCreateOneSupplier;
		if (!isLoading) {
			if (success) {
				notifySuccess("Tạo nhà cung cấp thành công!");
				setVisible(false);
				createForm.resetFields();
			} else if (success === false || error) {
				notifyError(message + "");
			}
		}
	}, [stateCreateOneSupplier.isLoading]);

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			...paramsFilter,

			page: page,
			limit: pageSize
		});
	};

	const changeStatus = (value: any, record: any) => {
		dispatch(updateOneSuppliers(record.id, { status: value }));
	};

	const submitSearch = (values: any) => {
		setParamsFilter({ ...paramsFilter, ...values, page: 1 });
	};

	const editRecord = (record: any) => {
		createForm.setFieldsValue({
			supplier_code: record.supplier_code,
			supplier_name: record.supplier_name,
			phone: record.phone,
			email: record.email,
			province_id: record.province_id,
			district_id: record.district_id,
			ward_id: record.ward_id,
			address: record.address,
			tax_code: record.tax_code,
			fax: record.fax,
			website: record.website,
			payment_method_id: record.payment_method_id,
			account_number: record.account_number,
			account_name: record.account_name,
			bank_id: record.bank_id,
			bank_branch_id: record?.bank_branch_id,
			status: record.status
		});
		setRecordEdit(record);
		setVisible(true);
		setIsCreate(false);
		setStatusEdit(record.status);
	};

	const submitForm = (values: any) => {
		if (isCreate) {
			dispatch(
				createOneSuppliers({
					supplier_code: values.supplier_code,
					supplier_name: values.supplier_name,
					phone: values.phone,
					email: values.email === "" ? undefined : values.email,
					province_id: values.province_id && Number(values.province_id),
					district_id: values.district_id && Number(values.district_id),
					ward_id: values.ward_id && Number(values.ward_id),
					address: values.address,
					tax_code: values.tax_code,
					fax: values.fax,
					website: values.website,
					payment_method_id: values.payment_method_id,
					account_number: values.account_number,
					account_name: values.account_name,
					bank_id: values.bank_id,
					bank_branch_id: values?.bank_branch_id,
					status: statusEdit
				})
			);
		} else {
			dispatch(
				updateOneSuppliers(recordEdit.id, {
					supplier_name: values.supplier_name,
					phone: values.phone,
					email: values.email === "" ? undefined : values.email,
					province_id: values.province_id && Number(values.province_id),
					district_id: values.district_id && Number(values.district_id),
					ward_id: values.ward_id && Number(values.ward_id),
					address: values.address,
					tax_code: values.tax_code,
					fax: values.fax,
					website: values.website,
					payment_method_id: values.payment_method_id,
					account_number: values.account_number,
					account_name: values.account_name,
					bank_branch_id: values?.bank_branch_id,
					bank_id: values.bank_id,
					status: statusEdit
				})
			);
		}
	};
	return (
		<div className="mainPages supplierList">
			<OverlaySpinner text="Đang xử lý..." open={stateUpdateOneSupplier.isLoading} />
			<OverlaySpinner text="Đang xử lý..." open={stateCreateOneSupplier.isLoading} />
			<Modal
				open={visible}
				centered
				title={isCreate ? "Thêm mới" : "Chi tiết"}
				onCancel={() => setVisible(false)}
				footer={false}
				width={800}
			>
				<Form className="formAddSupplier" layout="vertical" form={createForm} id="createForm" onFinish={submitForm}>
					<AddSupplier
						form={createForm}
						status={statusEdit}
						setStatus={(e: any) => setStatusEdit(e)}
						dataEdit={!isCreate && recordEdit}
						features={features}
					/>
				</Form>
			</Modal>
			<SubHeader breadcrumb={[{ text: "Quản lý sản phẩm" }, { text: "Nhà cung cấp" }]} />
			<div className="supplierList__search" style={{ padding: "8px 16px 16px 16px" }}>
				<Form
					layout="vertical"
					form={searchForm}
					id="searchForm"
					className="supplierList__search__form"
					onFinish={submitSearch}
				>
					<Form.Item className="supplierList__search__form__input" label="Tìm kiếm" name="q" style={{ margin: "0" }}>
						<Input className="defaultInput" placeholder="Nhập mã, tên nhà cung cấp, số điện thoại" />
					</Form.Item>
					<Form.Item style={{ width: "calc((100% - 256px)/2)", margin: "0" }} label="Trạng thái" name="status">
						<Select
							options={[
								{ label: "Hoạt động", value: true },
								{ label: "Ngừng hoạt động", value: false }
							]}
							className="defaultSelect"
							placeholder="Chọn trạng thái"
						/>
					</Form.Item>
					<button className="searchButton" style={{ marginTop: "19px" }} type="submit" form="searchForm">
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp;Tìm kiếm
					</button>
					<div
						className="searchButton"
						style={{ marginTop: "19px" }}
						onClick={() => {
							searchForm.resetFields();
							setParamsFilter({
								q: undefined,
								status: undefined,
								page: 1,
								limit: 10
							});
						}}
					>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</div>
				</Form>
				{features.includes("MODULE_PRODUCTS__SUPPLIER__CREATE") && (
					<button
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
					</button>
				)}
			</div>
			<div className="contentSection">
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						marginBottom: "8px"
					}}
				>
					<div className="searchButton" style={{ marginRight: "8px", cursor: "not-allowed" }}>
						<SvgImport style={{ transform: "scale(0.7)" }} />
						&nbsp; Tải file mẫu
					</div>
					<div className="searchButton" style={{ marginRight: "8px", cursor: "not-allowed" }}>
						<SvgExport style={{ transform: "scale(0.7)" }} />
						&nbsp; Nhập file
					</div>
					<div className="searchButton" style={{ cursor: "not-allowed" }}>
						<SvgSort style={{ transform: "scale(0.7)" }} />
						&nbsp;Sắp xếp
					</div>
				</div>
				<TableStyledAntd
					scroll={{ y: "calc(100vh - 385px)" }}
					rowKey="id"
					dataSource={stateListSuppliers?.data?.data}
					bordered
					pagination={false}
					loading={stateListSuppliers.isLoading}
					columns={columnsData({ changeStatus, editRecord, features }) as any}
					widthCol1="15%"
					widthCol2="18%"
					widthCol3="12%"
					widthCol4="15%"
					widthCol5="15%"
					widthCol6="15%"
					widthCol7="10%"
				/>

				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateListSuppliers?.data?.paging.total} nhà cung cấp	 `}
					total={stateListSuppliers?.data?.paging.total}
				/>
			</div>
		</div>
	);
};

export default SupplierList;
