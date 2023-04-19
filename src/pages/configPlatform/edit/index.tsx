import { DatePicker, Form, Input, Modal, Select, Switch, Table } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SubHeader from "src/components/subHeader/SubHeader";
import { platformsList } from "src/constants";
import {
	createOneShopDetailPlatform,
	getCronFunctions,
	getListSchedulers,
	getShopDetail,
	updateOneShopDetailPlatform,
	updateOneShopStatus
} from "src/services/actions/user.actions";
import { API_URL } from "src/services/api/config";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetAuthUUID, localGetToken } from "src/utils/localStorage";
import { columnsData, dataPlatform } from "./data";

const PlatformEdit = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [updateForm] = Form.useForm();
	const [updateFormMain] = Form.useForm();
	const [updateConfigForm] = Form.useForm();
	const [visibleConfig, setVisibleConfig] = useState(false);
	const [listPlatform, setListplatform] = useState<any[]>([]);
	const [editRecord, setEditRecord] = useState<any>({});
	const [dataTypes, setDataTypes] = useState<any[]>([]);
	const [platforms, setPlatforms] = useState<any[]>([]);
	const [cronFunctions, setCronFunctions] = useState<any[]>([]);
	const [selectedDataType, setSelectedDataType] = useState<any>(undefined);
	const [isCreate, setIsCreate] = useState<any>(true);
	const paramsURL = useParams() as any;
	const [paramsFilter, setParamsFilter] = useState({});

	const { stateCreateShopPlatform, stateUpdateShopPlatform, startShopDetail, stateUpdateShopStatus } = useSelector(
		(e: AppState) => e.userReducer
	);

	const [listSchedulers, setListSchedulers] = useState<any[]>([]);
	const { stateGetCronFunctions, stateCreateCronFunctions, stateUpdateCronFunctions } = useSelector(
		(e: AppState) => e.userReducer
	);
	const { stateGetListSchedulers, stateCreateOneScheduler } = useSelector((e: AppState) => e.userReducer);
	useEffect(() => {
		if (!stateCreateOneScheduler.isLoading) {
			dispatch(getListSchedulers(paramsURL?.id, { page: 1, limit: 100000, status: true }));
		}
	}, []);

	useEffect(() => {
		if (!stateCreateShopPlatform.isLoading && !stateUpdateShopPlatform.isLoading) {
			dispatch(getShopDetail(paramsURL?.id, {}));
		}
	}, [paramsURL, stateCreateShopPlatform.isLoading, stateUpdateShopPlatform.isLoading]);

	useEffect(() => {
		dispatch(getCronFunctions({ platform_id: paramsURL?.id, page: 1, limit: 10000, status: true }));
	}, [paramsFilter]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateGetCronFunctions;
		if (success) {
			let array = [];
			for (let i = 0; i < data?.data?.length; i++) {
				array.push({
					label: data?.data[i]?.platform?.platform_name + " - " + data?.data[i]?.data_type?.data_type,
					value: data?.data[i]?.id
				});
			}
			setCronFunctions(array);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateGetCronFunctions.isLoading]);

	const getCrons = (value: any) => {
		const { data, message, success, error } = stateGetCronFunctions;
		if (data?.data?.length === 0) {
			setVisibleConfig(false);

			notifyWarning(`Không có dữ liệu cron cho dữ liệu hiện tại ${dataTypes.find((x) => x.value === value)?.label}`);
		} else {
			setVisibleConfig(true);

			let array = [];
			for (let i = 0; i < data?.data?.length; i++) {
				array.push({
					label: data?.data[i]?.platform?.platform_name + " - " + data?.data[i]?.data_type?.data_type,
					value: data?.data[i]?.id
				});
			}
			setCronFunctions(array);
			updateConfigForm.setFieldsValue({
				cron_function_id: selectedDataType,
				data_type_id: value
			});
		}
	};
	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateGetListSchedulers;
		if (success) {
			let array = [];
			for (let i = 0; i < data?.data?.length; i++) {
				array.push({
					label: data?.data[i]?.description,
					value: data?.data[i]?.id
				});
			}
			setListSchedulers(array);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateGetListSchedulers.isLoading]);
	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateShopStatus;
		if (success) {
			notifySuccess("Cập nhật thành công");
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateShopStatus.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = startShopDetail;
		if (success) {
			setListplatform(
				data?.data?.cron_function_schedulers?.sort((a: any, b: any) => Number(b?.status) - Number(a?.status))
			);
			updateFormMain.setFieldsValue({
				status: data?.data?.status,
				platform: data?.data?.platform?.platform_name
			});
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [startShopDetail.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateShopPlatform;
		if (success) {
			notifySuccess("Cập nhật thành công");
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateShopPlatform.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateCreateShopPlatform;
		if (success) {
			notifySuccess("Tạo thành công");
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateCreateShopPlatform.isLoading]);

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

	const openModalConfigCallback = (record: any) => {
		setEditRecord(record);
		setVisibleConfig(true);
		setIsCreate(false);
		updateConfigForm.setFieldsValue({
			cron_function_id: record?.cron_function_id,
			data_type_id: record?.cron_function?.data_type_id,
			status: record?.status,
			runtimes: record?.scheduler_id,
			times: [
				record.start_at ? moment(record.start_at, "YYYY-MM-DD HH-mm-ss") : undefined,
				record.stop_at ? moment(record.stop_at, "YYYY-MM-DD HH-mm-ss") : undefined
			]
		});
	};

	const submitUpdateShopDetail = () => {
		updateFormMain.submit();
	};
	const handleCancelConfig = () => {
		setVisibleConfig(false);
		updateForm.resetFields();
	};
	const handleEditConfig = (values: any) => {
		if (isCreate) {
			let params = {
				cron_function_id: values.cron_function_id,
				scheduler_id: values.runtimes,
				start_at: values?.times ? moment(values.times[0]).format("YYYY-MM-DD HH:mm:ss") : undefined,
				stop_at: values?.times ? moment(values.times[1]).format("YYYY-MM-DD HH:mm:ss") : undefined,
				status: values.status
			};
			dispatch(createOneShopDetailPlatform(params));
		} else {
			console.log(values);
			let params = {
				cron_function_id: values.cron_function_id,
				scheduler_id: values.runtimes,
				start_at: values?.times ? moment(values.times[0]).format("YYYY-MM-DD HH:mm:ss") : undefined,
				stop_at: values?.times ? moment(values.times[1]).format("YYYY-MM-DD HH:mm:ss") : undefined,
				status: values.status
			};
			dispatch(updateOneShopDetailPlatform(editRecord?.id, params));
		}

		setVisibleConfig(false);
	};

	const handleChangeStatus = (e: any, record: any) => {
		let params = {
			cron_function_id: record?.cron_function_id,
			data_type_id: record?.data_type_id,
			scheduler_id: record?.scheduler_id,
			start_at: record?.start_at,
			stop_at: record?.stop_at,
			status: e
		};
		dispatch(updateOneShopDetailPlatform(record?.id, params));
	};

	const handleSubmitCreate = (values: any) => {
		if (values.platform) {
			setIsCreate(true);
			getCrons(values?.platform);
		} else {
			notifyWarning("Vui lòng chọn dữ liệu!");
		}

		// let array = [...listPlatform].find((x: any) => x.data_type_id === values.platform);
		// if (array) {
		// 	notifyWarning("Dữ liệu này đã được thiết lập");
		// } else {
		// 	let current = new Date();
		// 	dispatch(
		// 		createOneShopDetailPlatform(paramsURL.id, {
		// 			data_type_id: values.platform,
		// 			scheduler_id: 1,
		// 			start_at: current,
		// 			stop_at: new Date(current.getTime() + 86400000),
		// 			status: "D"
		// 		})
		// 	);
		// }
	};
	return (
		<div className="mainPages configPlatformEdit">
			<OverlaySpinner text="Đang lấy thông tin" open={startShopDetail.isLoading} spin />
			<OverlaySpinner text="Đang cập nhật" open={stateUpdateShopPlatform.isLoading} spin />

			<Modal
				open={visibleConfig}
				title="Thiết lập dữ liệu"
				centered
				className="modalEditSender"
				footer={null}
				onCancel={() => handleCancelConfig()}
				width={500}
			>
				<Form
					form={updateConfigForm}
					id="updateConfigForm"
					onFinish={handleEditConfig}
					layout="vertical"
					initialValues={{
						status: false
					}}
				>
					<Form.Item label="Cron funtions" name="cron_function_id" style={{ margin: "0" }}>
						<Select options={cronFunctions} className="defaultSelect" disabled />
					</Form.Item>
					{/* <Form.Item label="Dữ liệu" name="data_type_id">
						<Select options={dataTypes} className="defaultSelect" disabled />
					</Form.Item> */}
					<Form.Item
						label="Thời gian chạy / lần"
						name="runtimes"
						style={{ margin: " 0 0 13px 0" }}
						rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
					>
						<Select options={listSchedulers} className="defaultSelect" />
					</Form.Item>
					<Form.Item
						label="Thời gian hoạt động"
						name="times"
						style={{ margin: " 0 0 13px 0" }}
						rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
					>
						<DatePicker.RangePicker className="defaultInput" showTime />
					</Form.Item>

					<div className="center" style={{ marginTop: "8px" }}>
						<div className="center">
							<span>Trạng thái</span>&nbsp;&nbsp;
							<Form.Item name="status" valuePropName="checked" style={{ margin: "0" }}>
								<Switch />
							</Form.Item>
						</div>
						<button type="submit" form="updateConfigForm" className="defaultButton">
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp; Lưu
						</button>
					</div>
				</Form>
			</Modal>
			<SubHeader
				breadcrumb={[
					{ text: "Thiết lập hệ thống" },
					{ text: "Thiết lập sàn", link: "/platform-ecom" },
					{ text: "Thiết lập chi tiết sàn" }
				]}
			/>
			<div className="configPlatformEdit__informations">
				<Form
					form={updateFormMain}
					id="updateForm"
					layout="vertical"
					className="configPlatformEdit__informations__form"
				>
					<div className="configPlatformEdit__informations__form__st center">
						<div className="center" style={{ width: "50%" }}>
							<Form.Item
								name="platform"
								className="configPlatformEdit__informations__form__st__item"
								label="Sàn thương mại điện tử"
								style={{ margin: "0" }}
							>
								<Input className="defaultInput" disabled />
							</Form.Item>
							<Form.Item
								label="Trạng thái"
								className="configPlatformEdit__informations__form__st__item"
								name="status"
								style={{ margin: "0" }}
							>
								<Select
									options={[
										{ label: "Hoạt động", value: true },
										{ label: "Ngừng hoạt động", value: false }
									]}
									className="defaultSelect"
									disabled
								/>
							</Form.Item>
						</div>
					</div>
				</Form>
			</div>
			<div className="contentSection">
				<h4>Thiết lập lấy dữ liệu tự động</h4>
				<Form
					form={updateForm}
					id="updateForm"
					onFinish={handleSubmitCreate}
					layout="vertical"
					className="configPlatformEdit__informations__form"
				>
					<div className="configPlatformEdit__informations__form__st center">
						<div className="center">
							<Form.Item
								name="platform"
								className="configPlatformEdit__informations__form__st__item"
								label="Dữ liệu"
								style={{ width: "300px" }}
							>
								<Select
									options={cronFunctions}
									className="defaultSelect"
									style={{ width: "100%" }}
									placeholder="Chọn dữ liệu"
									onChange={(e) => setSelectedDataType(e)}
								/>
							</Form.Item>
							<button className="defaultButton" style={{ margin: "-3px 0 2px 4px" }}>
								<SvgIconPlus style={{ transform: "scale(0.7)" }} />
								&nbsp;Thêm
							</button>
						</div>
					</div>
				</Form>
				<Table
					style={{ marginTop: "-16px" }}
					rowKey="id"
					dataSource={listPlatform || []}
					bordered
					columns={columnsData({ openModalConfigCallback, handleChangeStatus }) as any}
				/>
			</div>
		</div>
	);
};

export default PlatformEdit;
