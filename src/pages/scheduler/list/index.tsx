import { Form, Input, InputNumber, Modal, Select, Switch, Table } from "antd";
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
import { createOneScheduler, getListSchedulers, updateOneScheduler } from "src/services/actions/user.actions";
import { AppState } from "src/types";
import { platforms } from "src/utils/helpers/functions/data";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { columnsData } from "./data";

const SchedulerList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [searchForm] = Form.useForm();
	const [createForm] = Form.useForm();
	const [typeModal, setTypeModal] = useState(1);
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [listSchedulers, setListSchedulers] = useState<any[]>([]);
	const [times, setTimes] = useState<any>(0);
	const [selectedEdit, setSelectedEdit] = useState<any>({});
	const [paramsFilter, setParamsFilter] = useState({
		q: undefined,
		status: undefined,
		page: 1,
		limit: 10
	});
	const { stateGetListSchedulers, stateCreateOneScheduler, stateUpdateOneScheduler } = useSelector(
		(e: AppState) => e.userReducer
	);
	useEffect(() => {
		if (!stateCreateOneScheduler.isLoading && !stateUpdateOneScheduler.isLoading) {
			dispatch(getListSchedulers("1", paramsFilter));
		}
	}, [paramsFilter, stateCreateOneScheduler.isLoading, stateUpdateOneScheduler.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateGetListSchedulers;
		if (success) {
			console.log("asdsadas", data);
			setListSchedulers(data?.data);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateGetListSchedulers.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateCreateOneScheduler;
		if (success) {
			notifySuccess("Tạo thành công");
			setVisibleCreate(false);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateCreateOneScheduler.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, error } = stateUpdateOneScheduler;
		if (success) {
			notifySuccess("Cập nhật thành công");
			setVisibleCreate(false);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateUpdateOneScheduler.isLoading]);

	const handleCancelCreate = () => {
		setVisibleCreate(false);
		createForm.resetFields();
		setTimes(0);
		setTypeModal(1);
	};
	const handleSubmitSearch = (values: any) => {
		setParamsFilter({ ...paramsFilter, ...values, page: 1 });
	};
	const submitCreate = (values: any) => {
		let convertTime = times * 1000;
		let description = "";
		if (convertTimes(convertTime).hours > 0) {
			description = description + convertTimes(convertTime).hours + " giờ";
		}
		if (convertTimes(convertTime).minutes > 0) {
			description = description + " " + convertTimes(convertTime).minutes + " phút";
		}
		if (convertTimes(convertTime).seconds > 0) {
			description = description + " " + convertTimes(convertTime).seconds + " giây";
		}
		description = description + " / lần";
		if (typeModal === 1) {
			dispatch(
				createOneScheduler({
					scheduler_interval: convertTime,
					description: description,
					status: values.status
				})
			);
		} else {
			dispatch(
				updateOneScheduler(selectedEdit.id, {
					scheduler_interval: convertTime,
					description: description,
					status: values.status
				})
			);
		}
	};

	const changeTime = (e: any, type: any) => {
		if (type === 1) {
			let minutes = createForm.getFieldValue("minutes");
			let second = createForm.getFieldValue("second");

			setTimes((time: any) => Number(e) * 3600 + (minutes ? Number(minutes) * 60 : 0) + (second ? Number(second) : 0));
		}
		if (type === 2) {
			let hours = createForm.getFieldValue("hours");
			let second = createForm.getFieldValue("second");

			setTimes((time: any) => (hours ? Number(hours) * 3660 : 0) + Number(e) * 60 + (second ? Number(second) : 0));
		}
		if (type === 3) {
			let hours = createForm.getFieldValue("hours");
			let minutes = createForm.getFieldValue("minutes");

			setTimes((time: any) => (hours ? Number(hours) * 3660 : 0) + (minutes ? Number(minutes) * 60 : 0) + Number(e));
		}
	};
	const convertTimes = (value: any) => {
		let convertValue = value / 1000;
		let hours = 0;
		let hoursA = 0;
		let minutes = 0;
		let seconds = 0;
		if (convertValue >= 3600) {
			hours = parseInt(Number(convertValue / 3600).toString());
			hoursA = parseInt(Number(convertValue % 3600).toString());
			minutes = parseInt(Number(hoursA / 60).toString());
			seconds = parseInt(Number(hoursA % 60).toString());
		} else if (convertValue >= 60) {
			hours = 0;
			minutes = parseInt(Number(convertValue / 60).toString());
			seconds = parseInt(Number(convertValue % 60).toString());
		} else {
			hours = 0;
			minutes = 0;
			seconds = convertValue;
		}

		return { hours, minutes, seconds };
	};
	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			...paramsFilter,

			page: page,
			limit: pageSize
		});
	};

	const editRecord = (values: any) => {
		setTypeModal(2);
		let a = convertTimes(values.scheduler_interval);
		setVisibleCreate(true);
		setSelectedEdit(values);
		createForm.setFieldsValue({
			hours: a.hours,
			minutes: a.minutes,
			second: a.seconds,
			status: values.status
		});
		setTimes((time: any) => Number(a.hours) * 3600 + Number(a.minutes) * 60 + Number(a.seconds));
	};

	const editStatus = (values: any, record: any) => {
		console.log(record);
		dispatch(
			updateOneScheduler(record.id, {
				scheduler_interval: record.scheduler_interval,
				description: record.description,
				status: values
			})
		);
	};
	return (
		<div className="mainPages scheduler">
			<Modal
				open={visibleCreate}
				title={typeModal === 1 ? "Thêm mới" : "Chi tiết"}
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
						status: true
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between"
						}}
					>
						<Form.Item label="Giờ" name="hours" style={{ width: "calc((100% - 24px) / 4)", margin: "0" }}>
							<InputNumber
								placeholder="Nhập giờ"
								className="defaultInputNumber"
								min="0"
								onChange={(e: any) => changeTime(e, 1)}
							/>
						</Form.Item>
						<Form.Item label="phút" name="minutes" style={{ width: "calc((100% - 24px) / 4)", margin: "0" }}>
							<InputNumber
								placeholder="Nhập phút"
								min="0"
								max="59"
								className="defaultInputNumber"
								onChange={(e: any) => changeTime(e, 2)}
							/>
						</Form.Item>
						<Form.Item label="giây" name="second" style={{ width: "calc((100% - 24px) / 4)", margin: "0" }}>
							<InputNumber
								placeholder="Nhập giây"
								className="defaultInputNumber"
								min="0"
								max="59"
								onChange={(e: any) => changeTime(e, 3)}
							/>
						</Form.Item>
						<div style={{ width: "calc((100% - 24px) / 4)", textAlign: "center", marginTop: "22px" }}>
							( {times} giây / lần )
						</div>
					</div>
					<div className="center" style={{ marginTop: "8px" }}>
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
			<SubHeader breadcrumb={[{ text: "Thiết lập hệ thống" }, { text: "Scheduler" }]} />
			<div className="configPlatform__search" style={{ padding: "8px 16px 16px 16px" }}>
				<Form
					layout="vertical"
					form={searchForm}
					id="searchForm"
					onFinish={handleSubmitSearch}
					className="configPlatform__search__form"
				>
					<Form.Item className="configPlatform__search__form__select" label="Tìm kiếm" name="q">
						<Input placeholder="Lọc ID, interval, mô tả" className="defaultInput" />
					</Form.Item>

					<Form.Item className="configPlatform__search__form__select" label="Trạng thái" name="status">
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
				<button className="defaultButton" style={{ marginTop: "15px" }} onClick={() => setVisibleCreate(true)}>
					<SvgIconPlus style={{ transform: "scale(0.8)" }} />
					&nbsp;Thêm mới
				</button>
			</div>
			<div className="contentSection">
				<TableStyledAntd
					scroll={{ y: "calc(100vh - 345px)" }}
					rowKey="id"
					dataSource={listSchedulers || []}
					bordered
					pagination={false}
					columns={columnsData({ editRecord, editStatus }) as any}
					widthCol1="5%"
					widthCol2="21%"
					widthCol3="22%"
					widthCol4="21%"
					widthCol5="21%"
					widthCol6="10%"
				/>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateGetListSchedulers?.data?.paging?.total} schedulers `}
					total={stateGetListSchedulers?.data?.paging?.total}
				/>
			</div>
		</div>
	);
};

export default SchedulerList;
