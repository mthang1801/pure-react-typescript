import { Form, Modal, Select, Switch, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyError, notifySuccess } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { platformsList } from "src/constants";
import { createOneShop, getListShop, updateOneShopStatus } from "src/services/actions/user.actions";
import { api } from "src/services/api/api.index";
import { API_URL, API_URL_MASTER } from "src/services/api/config";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { localGetToken } from "src/utils/localStorage";
import { columnsData, dataPlatform } from "./data";

const PlatformList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [platforms, setPlatforms] = useState<any[]>([]);
	const [searchForm] = Form.useForm();
	const [createForm] = Form.useForm();
	const [listShop, setListShop] = useState<any[]>([]);
	const [paramsFilter, setParamsFilter] = useState({
		platform_id: undefined,
		status: undefined,
		page: 1,
		limit: 30
	});
	const { stateGetListShop, stateUpdateShopStatus, stateCreateShop } = useSelector((e: AppState) => e.userReducer);
	useEffect(() => {
		if (!stateUpdateShopStatus.isLoading && !stateCreateShop.isLoading) {
			dispatch(getListShop(paramsFilter));
		}
	}, [paramsFilter, stateUpdateShopStatus.isLoading, stateCreateShop.isLoading]);

	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateGetListShop;
		if (success) {
			setListShop(data?.data);
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateGetListShop.isLoading]);

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
	useEffect(() => {
		const getPlatforms = async (params: any) => {
			try {
				const { data } = (await api.get(`${API_URL}/platforms?type=1`, params)) as any;
				if (data) {
					let array = [];
					let fakeData = data;
					for (let i = 0; i < fakeData?.length; i++) {
						array.push({
							value: fakeData[i]?.id,
							label: fakeData[i]?.platform_name
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
	useEffect((): void | undefined => {
		if (isMount) return;
		const { data, message, success, error } = stateCreateShop;
		if (success) {
			setVisibleCreate(false);
			notifySuccess("Thêm sàn thành công");
		}
		if (success === false || error) {
			return notifyError(message + "");
		}
	}, [stateCreateShop.isLoading]);

	const handleSubmitSearch = (values: any) => {
		setParamsFilter({ ...paramsFilter, ...values, page: 1 });
	};
	const handleCancelCreate = () => {
		setVisibleCreate(false);
	};
	const submitCreate = (values: any) => {
		console.log(values);
		dispatch(
			createOneShop({
				platform_id: values.platform,
				status: values.status
			})
		);
	};

	const openConnect = (values: any) => {};

	const onChangeStatus = (values: any, record: any, type: any) => {
		if (type === 1) {
			let params = {
				status: values === true ? record?.status : false,
				locked: values
			};
			dispatch(updateOneShopStatus(record.id, params));
		}
		if (type === 2) {
			let params = {
				status: values,
				locked: record?.locked
			};
			dispatch(updateOneShopStatus(record.id, params));
		}
	};
	return (
		<div className="mainPages configPlatform">
			<OverlaySpinner text="Đang lấy danh sách" open={stateGetListShop.isLoading} spin />
			<OverlaySpinner text="Đang cập nhật" open={stateUpdateShopStatus.isLoading} spin />

			<Modal
				open={visibleCreate}
				title="Thêm mới"
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
						status: true,
						platform: platforms[0]?.value
					}}
				>
					<Form.Item label="Platform" name="platform" style={{ margin: "0" }}>
						<Select options={platforms} className="defaultSelect" />
					</Form.Item>
					<div className="center">
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

			<SubHeader breadcrumb={[{ text: "Thiết lập hệ thống" }, { text: "Thiết lập sàn" }]} />
			<div className="configPlatform__search" style={{ padding: "8px 16px 16px 16px" }}>
				<Form
					layout="vertical"
					form={searchForm}
					id="searchForm"
					onFinish={handleSubmitSearch}
					className="configPlatform__search__form"
				>
					<Form.Item className="configPlatform__search__form__select" label="Sàn thương mại điện tử" name="platform_id">
						<Select options={platforms} className="defaultSelect" placeholder="Lọc theo sàn" />
					</Form.Item>
					<Form.Item className="configPlatform__search__form__select" label="Trạng thái" name="status">
						<Select
							options={[
								{ label: "Hoạt động", value: "true" },
								{ label: "Ngừng hoạt động", value: "false" }
							]}
							className="defaultSelect"
							placeholder="Trạng thái hoạt động"
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
								platform_id: undefined,
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
					rowKey="seller_platform_id"
					dataSource={listShop}
					bordered
					loading={stateGetListShop.isLoading}
					pagination={false}
					columns={columnsData({ openConnect: openConnect, onChangeStatus }) as any}
				/>
			</div>
		</div>
	);
};

export default PlatformList;
