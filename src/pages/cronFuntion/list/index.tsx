import { DatePicker, Form, Input, Modal, Select, Switch, Table } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyError, notifySuccess } from "src/components/notification";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import {
	createCronFunctions,
	getCronFunctions,
	getListSchedulers,
	updateCronFunctions
} from "src/services/actions/user.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import { columnsData } from "./data";

const CronFuntionList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [searchForm] = Form.useForm();
	const [createForm] = Form.useForm();
	const [platforms, setPlatforms] = useState<any[]>([]);
	const [isCreate, setIsCreate] = useState<any>(true);
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [dataTypes, setDataTypes] = useState<any[]>([]);
	const [listSchedulers, setListSchedulers] = useState<any[]>([]);
	const [editData, setEditData] = useState<any>({});
	const [cronFunctions, setCronFunctions] = useState<any[]>([]);
	const [paramsFilter, setParamsFilter] = useState({
		data_type_id: undefined,
		platform_id: undefined,
		status: undefined,
		page: 1,
		limit: 10
	});
	const { stateGetCronFunctions, stateCreateCronFunctions, stateUpdateCronFunctions } = useSelector(
		(e: AppState) => e.userReducer
	);
	useEffect(() => {
		if (!stateCreateCronFunctions.isLoading && !stateUpdateCronFunctions.isLoading) {
			dispatch(getCronFunctions(paramsFilter));
		}
	}, [paramsFilter, stateCreateCronFunctions.isLoading, stateUpdateCronFunctions.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateGetCronFunctions;
		if (success) {
			setCronFunctions(data?.data);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateGetCronFunctions.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateCreateCronFunctions;
		if (success) {
			createForm.resetFields();
			setVisibleCreate(false);
			setIsCreate(true);
			return notifySuccess("Tạo thành công !");
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateCreateCronFunctions.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateCronFunctions;
		if (success) {
			createForm.resetFields();
			setVisibleCreate(false);
			setIsCreate(true);
			return notifySuccess("Cập nhật thành công !");
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateCronFunctions.isLoading]);
	useEffect(() => {
		const getDataTypes = async () => {
			let headers: any = {
				"Content-Type": "application/json,text/plain, */*"
			};
			let token = localGetToken();
			let uuid = localGetAuthUUID();
			if (token) {
				headers.Authorization = token;
				headers["x-auth-uuid"] = uuid;
			}
			try {
				const { data } = await axios.get(
					`${API_URL}/data-types
          `,
					{
						headers: headers
					}
				);
				if (data) {
					let array = [];
					for (let i = 0; i < data?.data?.length; i++) {
						array.push({
							value: data?.data[i]?.id,
							label: data?.data[i]?.data_type
						});
					}
					setDataTypes(array);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getDataTypes();
		return () => {
			setDataTypes([]);
		};
	}, []);

	useEffect(() => {
		const getPlatforms = async (params: any) => {
			try {
				const { data } = (await api.get(`${API_URL}/seller-platforms/by-seller-id`, params)) as any;
				if (data) {
					let array = [];
					let fakeData = data;
					for (let i = 0; i < fakeData?.length; i++) {
						array.push({
							value: fakeData[i]?.platform?.id,
							label: fakeData[i]?.platform?.platform_name
						});
					}
					setPlatforms(array);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getPlatforms({ page: 1, limit: 10000, status: true });
		return () => {
			setPlatforms([]);
		};
	}, []);

	const { stateGetListSchedulers } = useSelector((e: AppState) => e.userReducer);
	useEffect(() => {
		dispatch(getListSchedulers("1", paramsFilter));
	}, []);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateGetListSchedulers;
		if (success) {
			let array = [];
			for (let i = 0; i < data?.data?.length; i++) {
				array.push({
					value: data?.data[i]?.id,
					label: data?.data[i]?.description
				});
			}
			setListSchedulers(array);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateGetListSchedulers.isLoading]);

	const handleCancelCreate = () => {
		setVisibleCreate(false);
		createForm.setFieldsValue({
			platform_id: undefined,
			data_type_id: undefined,
			scheduler_id: undefined,
			description: undefined,
			timeStart: undefined,
			status: undefined
		});
	};
	const handleSubmitSearch = (values: any) => {
		setParamsFilter({
			platform_id: values?.platform_id,
			data_type_id: values?.data_type_id,
			status: values?.status,
			page: 1,
			limit: 10
		});
	};
	const submitCreate = (values: any) => {
		let params = {
			platform_id: values?.platform_id,
			data_type_id: values?.data_type_id,
			description: values?.description,
			status: values?.status
		};
		if (isCreate) {
			dispatch(createCronFunctions(params));
		} else {
			dispatch(updateCronFunctions(editData?.id, params));
		}
	};

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			...paramsFilter,

			page: page,
			limit: pageSize
		});
	};

	const onChangeStatus = (record: any, value: any) => {
		setEditData(record);
		let params = {
			platform_id: record?.platform_id,
			data_type_id: record?.data_type_id,
			description: record?.description,
			status: value
		};
		dispatch(updateCronFunctions(record?.id, params));
	};

	const openEdit = (record: any) => {
		setEditData(record);
		setIsCreate(false);
		setVisibleCreate(true);
		createForm.setFieldsValue({
			platform_id: record?.platform_id,
			data_type_id: record?.data_type_id,
			description: record?.description,

			status: record?.status
		});
	};
	return (
		<div className="mainPages cronFunction">
			<Modal
				open={visibleCreate}
				title={isCreate ? "Thêm mới" : "Chi tiết"}
				centered
				className="modalEditSender"
				footer={null}
				onCancel={() => handleCancelCreate()}
				width={500}
			>
				<Form
					form={createForm}
					id="createForm"
					onFinish={submitCreate}
					layout="vertical"
					initialValues={{
						status: false,
						platform_id: platforms.length > 0 ? platforms[0]?.value : undefined,
						data_type_id: 1
					}}
				>
					<Form.Item label="Sàn thương mại điện tử" name="platform_id" style={{ margin: "0 0 13px 0" }}>
						<Select options={platforms} className="defaultSelect" />
					</Form.Item>
					<Form.Item label="Chức năng" name="data_type_id" style={{ margin: "0 0 13px 0" }}>
						<Select options={dataTypes} className="defaultSelect" />
					</Form.Item>
					<Form.Item label="Mô tả" name="description" style={{ margin: "0 0 13px 0" }}>
						<Input.TextArea placeholder="Nhập nội dung" className="defaultSelect" />
					</Form.Item>

					<div className="center" style={{ marginTop: "29px" }}>
						<div className="center">
							<span>Trạng thái</span>&nbsp;&nbsp;
							<Form.Item name="status" valuePropName="checked" style={{ margin: "0" }}>
								<Switch />
							</Form.Item>
						</div>
						<button type="submit" form="createForm" className="defaultButton">
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp; Lưu
						</button>
					</div>
				</Form>
			</Modal>
			<SubHeader breadcrumb={[{ text: "Thiết lập hệ thống" }, { text: "Cron function" }]} />
			<div className="configPlatform__search" style={{ padding: "8px 16px 16px 16px" }}>
				<Form
					layout="vertical"
					form={searchForm}
					id="searchForm"
					onFinish={handleSubmitSearch}
					className="configPlatform__search__form"
					style={{ width: "calc(100% - 128px)" }}
				>
					<Form.Item style={{ width: "calc(33% - 88px )", margin: "0" }} label="Lọc theo sàn" name="platform_id">
						<Select placeholder="Chọn sàn" className="defaultSelect" options={platforms} />
					</Form.Item>
					<Form.Item style={{ width: "calc(33% - 88px)", margin: "0" }} label="Lọc theo chức năng" name="data_type_id">
						<Select placeholder="Chọn chức năng" className="defaultSelect" options={dataTypes} />
					</Form.Item>
					<Form.Item style={{ width: "calc(34% - 88px)", margin: "0" }} label="Trạng thái" name="status">
						<Select
							options={[
								{ label: "Hoạt động", value: true },
								{ label: "Ngừng hoạt động", value: false }
							]}
							className="defaultSelect"
							placeholder="Trạng thái hoạt động"
						/>
					</Form.Item>
					<button className="searchButton" style={{ marginTop: "19px" }}>
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp;Tìm kiếm
					</button>
					<div
						className="searchButton"
						style={{ marginTop: "19px" }}
						onClick={() => {
							searchForm.resetFields();
							setParamsFilter({
								platform_id: undefined,
								data_type_id: undefined,
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
				<button
					className="defaultButton"
					style={{ marginTop: "19px" }}
					onClick={() => {
						setVisibleCreate(true);
						setIsCreate(true);
						createForm.setFieldsValue({
							status: false,
							platform_id: platforms.length > 0 ? platforms[0]?.value : undefined,
							data_type_id: 1
						});
					}}
				>
					<SvgIconPlus style={{ transform: "scale(0.8)" }} />
					&nbsp;Thêm mới
				</button>
			</div>
			<div className="contentSection">
				<TableStyledAntd
					scroll={{ y: "calc(100vh - 345px)" }}
					rowKey="id"
					dataSource={cronFunctions}
					bordered
					loading={stateGetCronFunctions.isLoading}
					pagination={false}
					columns={columnsData({ onChangeStatus, openEdit }) as any}
					widthCol1="5%"
					widthCol2="16%"
					widthCol3="16%"
					widthCol4="21%"
					widthCol5="16%"
					widthCol6="16%"
					widthCol7="10%"
				/>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateGetCronFunctions?.data?.paging.total} functions `}
					total={stateGetCronFunctions?.data?.paging.total}
				/>
			</div>
		</div>
	);
};

export default CronFuntionList;
