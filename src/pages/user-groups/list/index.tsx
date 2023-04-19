/* eslint-disable */
import { Row, Col, Input, Select, DatePicker, Spin, Form, Switch } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "src/components/notification";
import {
	createOneUserGroup,
	getListUserGroup,
	updateOneUserGroup,
	updateOneUserSystem
} from "src/services/actions/user.actions";
import { AppState } from "src/types";
import colors from "src/utils/colors";
import arrow from "src/assets/images/arrow.svg";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { columnsData, dataDefault, defaultFilter } from "./data";
import { IParamsFilter } from "./interfaces";
// import './styles.less';
import UserGroup from "../edit";
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import { useHistory } from "react-router-dom";
import TableStyledAntd from "src/components/table/TableStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import moment from "moment";
import { dateFormatYMD } from "src/utils/helpers/functions/date";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
const UserGroupList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [formSearch] = Form.useForm();

	const [formCreate] = Form.useForm();
	const [visible, setVisible] = useState<boolean>(false);
	const [status, setStatus] = useState(false);
	const [typeForm, setTypeForm] = useState(1);
	const [editValue, setEditValue] = useState<any>(undefined);
	const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
	const [loading, setLoading] = useState<any>(true);
	const [paramsFilter, setParamsFilter] = useState<any>({
		q: undefined,
		status: undefined,
		created_at_start: undefined,
		created_at_end: undefined,
		page: 1,
		limit: 10
	});
	const { stateGetListUserSystem, stateUpdateOneUserGroups, stateGetListUserGroups, stateCreateOneUserGroups } =
		useSelector((state: AppState) => state.userReducer);

	/****************************START**************************/
	/*                         Life Cycle                      */
	const [roles, setRoles] = useState<any>([]);
	const pathName = useHistory().location.pathname.slice(1);
	// useEffect(() => {
	// 	let _dataUser = JSON.parse(localStorage.getItem("ACCOUNT") || "");
	// 	let fakeRoles = [];
	// 	if (_dataUser?.menu) {
	// 		for (let i = 0; i < _dataUser.menu.length; i++) {
	// 			for (let j = 0; j < _dataUser.menu[i].children.length; j++) {
	// 				if (_dataUser.menu[i].children[j].funct_code === pathName.toString()) {
	// 					for (let k = 0; k < _dataUser.menu[i].children[j].children.length; k++) {
	// 						if (_dataUser.menu[i].children[j].children[k].funct_code === "create-user-group") {
	// 							fakeRoles.push("create-user-group");
	// 						}
	// 						if (_dataUser.menu[i].children[j].children[k].funct_code === "update-user-group") {
	// 							fakeRoles.push("update-user-group");
	// 						}
	// 						if (_dataUser.menu[i].children[j].children[k].funct_code === "get-user-group-functions") {
	// 							fakeRoles.push("get-user-group-functions");
	// 						}
	// 					}
	// 					break;
	// 				}
	// 			}
	// 		}
	// 		setRoles(fakeRoles);
	// 	}
	// }, [localStorage.getItem("ACCOUNT")]);
	useEffect(() => {
		if (!stateCreateOneUserGroups.isLoading || !stateUpdateOneUserGroups.isLoading) {
			dispatch(getListUserGroup(paramsFilter));
		}
	}, [paramsFilter, stateCreateOneUserGroups.isLoading, stateUpdateOneUserGroups.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { isLoading, success, message, error, data } = stateCreateOneUserGroups;
		if (!isLoading) {
			if (success) {
				notifySuccess("Tạo nhóm vai trò thành công");
				setVisible(false);
				formCreate.resetFields();
				setTypeForm(1);
			} else if (success === false || error) {
				notifyError(getMessageV1(message));
			}
		}
	}, [stateCreateOneUserGroups.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, message, error, data } = stateGetListUserGroups;
		if (success) {
		} else if (success === false || error) {
			setLoading(false);
			notifyError(getMessageV1(message));
		}
	}, [stateGetListUserSystem.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, isLoading, error } = stateUpdateOneUserGroups;
		if (success) {
			setLoading(false);
			dispatch(getListUserGroup());
			notifySuccess(message || "");
			setTypeForm(1);
			setVisible(false);
			formCreate.resetFields();
		}
		if (success === false || error) {
			let msg = getMessageV1(message, ", ");
			setLoading(false);
			return notifyError(msg);
		}
	}, [stateUpdateOneUserGroups.isLoading]);

	/**************************** END **************************/

	/****************************START**************************/
	/*                          Function                       */

	// const rowSelection = {
	//   onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
	//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	//   },
	//   getCheckboxProps: (record: DataType) => ({
	//     disabled: record.title === 'Disabled User', // Column configuration not to be checked
	//     name: record.title,
	//   }),
	// };

	const btnVisbleCreate = () => {
		setVisible(true);
	};

	const btnUpdatePassword = (data: any) => {
		// setDataUser(data);
		// setIsCreate(false);
		// setVisible(true);
	};
	const handleChangeReasonStatus = (e: any) => {
		setLoading(true);
		let params = {
			status: !e.status
		};
		dispatch(updateOneUserGroup(e.id, params));
	};
	const handleKeyDown = (e: any) => {
		if (e.key === "Enter") {
		}
	};
	const onChangeTable = (page: any) => {
		setLoading(true);
		const _filter = {
			...paramsFilter,
			currentPage: page.current,
			sizePage: page.pageSize,
			isDispatch: true
		};
		setParamsFilter(_filter);
	};

	const onFinish = () => {
		setVisible(false);
	};
	/**************************** END **************************/

	/****************************START**************************/
	/*                         Component                       */

	/**************************** END **************************/

	/****************************START**************************/
	/*                        Return Page                      */

	const handleSubmitCreate = (values: any) => {
		console.log(values);
		if (typeForm === 1) {
			dispatch(
				createOneUserGroup({
					role_name: values.name,
					funct_ids: [],
					status: status
				})
			);
		} else {
			let params = {
				role_name: values?.name,
				status: status
			};
			dispatch(updateOneUserGroup(editValue.id, params));
		}
	};

	const openRecord = (values: any) => {
		setTypeForm(2);
		setEditValue(values);
		setVisible(true);
		setStatus(values?.status);
		formCreate.setFieldsValue({
			name: values?.role_name,
			status: values?.status
		});
	};

	const submitSearch = (values: any) => {
		let params = values;
		params.created_at_start = values?.picker ? moment(values?.picker[0]).format(dateFormatYMD) : undefined;
		params.created_at_end = values?.picker ? moment(values?.picker[1]).format(dateFormatYMD) : undefined;
		delete params.picker;
		setParamsFilter({ ...paramsFilter, ...params, page: 1 });
	};

	const submitRefresh = () => {
		formSearch.resetFields();
		setParamsFilter({
			q: undefined,
			status: undefined,
			created_at_start: undefined,
			created_at_end: undefined,
			page: 1,
			limit: 10
		});
	};

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			...paramsFilter,

			page: page,
			limit: pageSize
		});
	};
	return (
		<div className="mainPages">
			{visible && (
				<Modal
					visible={visible}
					title={"Thêm mới nhóm người dùng"}
					onCancel={() => setVisible(false)}
					footer={null}
					width="600px"
				>
					<Form form={formCreate} id="formCreate" onFinish={handleSubmitCreate}>
						<Form.Item name="name" style={{ width: "100%", margin: "0" }}>
							<Input placeholder="Tên nhóm" className="defaultInput" width="100%" />
						</Form.Item>
					</Form>
					<div className="formAddSupplier__footer" style={{ height: "40px" }}>
						<div className="formAddSupplier__footer__status">
							Trạng thái:&nbsp;&nbsp;{" "}
							<Form.Item label="&nbsp;" name="status" style={{ margin: "0" }}>
								<Switch checked={status} onChange={(e: any) => setStatus(e)} />
							</Form.Item>
						</div>
						<div className="defaultButton" onClick={() => formCreate.submit()}>
							<SvgIconStorage style={{ transform: "scale(0.7)" }} />
							&nbsp;Lưu
						</div>
					</div>
				</Modal>
			)}
			<SubHeader breadcrumb={[{ text: "Thiết lập hệ thống" }, { text: "Nhóm vai trò" }]} />

			<div className="ordersPage__search" style={{ padding: "8px 16px 16px 16px" }}>
				<Form
					id="formSearch"
					form={formSearch}
					layout="vertical"
					className="ordersPage__search__form"
					onFinish={submitSearch}
				>
					<Form.Item
						name="q"
						label="Tên nhóm"
						className="ordersPage__search__form__item"
						style={{ width: "calc((100% - 400px) / 3)", margin: "0" }}
					>
						<Input className="defaultInput" placeholder="Nhập tên nhóm" />
					</Form.Item>

					<Form.Item name="status" label="Trạng thái" style={{ width: "calc((100% - 400px) / 3)", margin: "0" }}>
						<Select
							options={[
								{ label: "Tất cả", value: null },
								{
									label: "Ẩn",
									value: false
								},
								{
									label: "Đang hoạt động",
									value: true
								}
							]}
							placeholder="Chọn trạng thái"
							className="defaultSelect"
						/>
					</Form.Item>
					<Form.Item
						name="picker"
						label="Ngày tạo"
						style={{ width: "calc((100% - 400px) / 3)", margin: "0", marginTop: "-1px" }}
					>
						<DatePicker.RangePicker className="defaultDate" />
					</Form.Item>
					<button className="searchButton" style={{ marginTop: "19px" }} type="submit" form="formSearch">
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp; Tìm kiếm
					</button>
					<div className="searchButton" style={{ marginTop: "19px" }} onClick={() => submitRefresh()}>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</div>

					<div onClick={btnVisbleCreate} className="defaultButton" style={{ marginTop: "17px" }}>
						<SvgIconPlus style={{ transform: "scale(0.8)" }} />
						&nbsp;Thêm nhóm
					</div>
				</Form>
			</div>
			{/* <CustomBreadcrumb
				rootPath="Quản trị người dùng"
				currentPath="Nhóm người dùng"
				nameBtn={roles.find((x: any) => x === "create-user-group") ? "Thêm nhóm" : null}
				onClickButton={btnVisbleCreate}
			/> */}
			<Col className="contentSection" style={{ marginTop: "13px" }}>
				<TableStyledAntd
					className="ordersTable"
					rowKey={"id"}
					columns={columnsData({ handleChangeReasonStatus, roles: roles, openRecord })}
					dataSource={stateGetListUserGroups.data ? stateGetListUserGroups.data.data : []}
					loading={stateGetListUserGroups.isLoading}
					pagination={false}
					bordered
					widthCol1="100px"
					widthCol5="100px"
					widthCol6="100px"
					paddingItemBody="8px 16px"
				/>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateGetListUserGroups?.data?.paging.total} vai trò `}
					total={stateGetListUserGroups?.data?.paging.total}
				/>
			</Col>
		</div>
	);

	/**************************** END **************************/
};

export default UserGroupList;
