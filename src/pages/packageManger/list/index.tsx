/* eslint-disable */
import { Row, Col, Input, Select, DatePicker, Spin, Form, Switch } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "src/components/notification";
import {
	createOneUserGroup,
	createOneUserSystem,
	getListUserGroup,
	getListUserSystem,
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
import SvgIconSearch from "src/assets/svg/SvgIconSearch";
import SvgIconPlus from "src/assets/svg/SvgIconPlus";
import { useHistory } from "react-router-dom";
import TableStyledAntd from "src/components/table/TableStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import SvgIconRefresh from "src/assets/svg/SvgIconRefresh";
import moment from "moment";
import { dateFormatYMD } from "src/utils/helpers/functions/date";
import { mailPattern, phonePattern, removeSign, validateEmail } from "src/utils/helpers/functions/textUtils";
import message from "src/constants/message";
import { emailRule } from "src/utils/helpers/functions/rules";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_USER_GROUPS } from "src/services/api/url.index";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import { getListPackages, updateOnePackages } from "src/services/actions/packages.actions";
const PackageList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [formSearch] = Form.useForm();
	const history = useHistory();
	const [formCreate] = Form.useForm();
	const [visible, setVisible] = useState<boolean>(false);
	const [status, setStatus] = useState(false);
	const [typeForm, setTypeForm] = useState(1);
	const [editValue, setEditValue] = useState<any>(undefined);
	const [createUpdateLoading, setCreateUpdateLoading] = useState<any>(false);
	const [paramsFilter, setParamsFilter] = useState<any>({
		status: undefined,
		q: undefined,
		page: 1,
		limit: 10
	});
	const [listRoles, setListRoles] = useState<any[]>([]);
	const [selectedProvince, setSelectedProvince] = useState<any>(undefined);
	const [selectedDistrict, setSelectedDistrict] = useState<any>(undefined);

	const [provinces, setProvinces] = useState<any[]>([]);
	const [districts, setDistricts] = useState<any[]>([]);
	const [wards, setWards] = useState<any[]>([]);
	const [banks, setBanks] = useState<any[]>([]);
	const { stateListPackages, stateUpdateOnePackages } = useSelector((state: AppState) => state.packagesReducer);

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
		if (!stateUpdateOnePackages.isLoading) {
			dispatch(getListPackages(paramsFilter));
		}
	}, [paramsFilter, stateUpdateOnePackages.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, isLoading, error } = stateUpdateOnePackages;
		if (!isLoading) {
			if (success) {
				notifySuccess("Cập nhật thành công");
			}
			if (success === false || error) {
				let msg = getMessageV1(message, ", ");
				return notifyError(msg);
			}
		}
	}, [stateUpdateOnePackages.isLoading]);

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
	const handleChangeStatus = (e: any) => {
		let params = {
			status: !e.status
		};
		dispatch(updateOnePackages(e.id, params));
	};
	const handleKeyDown = (e: any) => {
		if (e.key === "Enter") {
		}
	};
	const onChangeTable = (page: any) => {
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
				createOneUserSystem({
					...values,
					status: status,
					province_name: provinces.find((x: any) => x.value === values?.province_id)?.label,
					district_name: districts.find((x: any) => x.value === values?.district_id)?.label,
					ward_name: wards.find((x: any) => x.value === values?.ward_id)?.label
				})
			);
		} else {
			let params = {
				...values,
				status: status,
				province_name: provinces.find((x: any) => x.value === values?.province_id)?.label,
				district_name: districts.find((x: any) => x.value === values?.district_id)?.label,
				ward_name: wards.find((x: any) => x.value === values?.ward_id)?.label,
				password: values?.password === "******" ? undefined : values?.password
			};
			dispatch(updateOneUserSystem(editValue.id, params));
		}
	};

	const openRecord = (values: any) => {
		setTypeForm(2);
		setEditValue(values);
		setVisible(true);
		setStatus(values?.status);
		setSelectedProvince(values?.province_id);
		setSelectedDistrict(values?.district_id);
		formCreate.setFieldsValue({
			fullname: values?.fullname,
			phone: values?.phone,
			email: values?.email,
			role_id: values?.userRole?.role_id,
			account_number: values?.account_number,
			account_name: values?.account_name,
			bank_id: values?.bank_id,
			province_id: values?.province_id,
			province_name: values?.province_name,
			district_id: values?.district_id,
			district_name: values?.district_name,
			ward_id: values?.ward_id,
			ward_name: values?.ward_name,
			address: values?.address,
			status: values?.status,
			password: "******",
			confirm: "******"
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
			<SubHeader breadcrumb={[{ text: "Thiết lập hệ thống" }, { text: "Gói dịch vụ" }]} />

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
						label="Tìm kiếm"
						className="ordersPage__search__form__item"
						style={{ width: "calc((100% - 256px) / 2)", margin: "0" }}
					>
						<Input className="defaultInput" placeholder="ID, tên gói dịch vụ" />
					</Form.Item>

					<Form.Item name="status" label="Trạng thái" style={{ width: "calc((100% - 256px) / 2)", margin: "0" }}>
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

					<button className="searchButton" style={{ marginTop: "19px" }} type="submit" form="formSearch">
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp; Tìm kiếm
					</button>
					<div className="searchButton" style={{ marginTop: "19px" }} onClick={() => submitRefresh()}>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</div>

					{/* <div onClick={() => history.push("/packages/create")} className="defaultButton" style={{ marginTop: "17px" }}>
						<SvgIconPlus style={{ transform: "scale(0.8)" }} />
						&nbsp;Thêm mới
					</div> */}
				</Form>
			</div>
			{/* <CustomBreadcrumb
				rootPath="Quản trị người dùng"
				currentPath="Nhóm người dùng"
				nameBtn={roles.find((x: any) => x === "create-user-group") ? "Thêm nhóm" : null}
				onClickButton={btnVisbleCreate}
			/> */}
			<Col className="contentSection" style={{ marginTop: "8px" }}>
				<TableStyledAntd
					className="ordersTable"
					rowKey={"id"}
					columns={columnsData({ handleChangeStatus })}
					dataSource={stateListPackages.data ? stateListPackages.data.data : []}
					loading={stateListPackages.isLoading}
					pagination={false}
					bordered
					paddingItemBody="8px 16px"
				/>

				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateListPackages?.data?.paging.total} dịch vụ `}
					total={stateListPackages?.data?.paging.total}
				/>
			</Col>
		</div>
	);

	/**************************** END **************************/
};

export default PackageList;
