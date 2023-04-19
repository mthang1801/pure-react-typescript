/* eslint-disable */
import { Row, Col, Input, Select, DatePicker, Spin, Form, Switch } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
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
import { columnsData, columnsData2, columnsDataWarehouse, dataDefault, defaultFilter } from "./data";
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
import {
	convertToOnlyNumber,
	isValidPassword,
	mailPattern,
	phonePattern,
	removeSign,
	validateEmail
} from "src/utils/helpers/functions/textUtils";
import message from "src/constants/message";
import { emailRule } from "src/utils/helpers/functions/rules";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_USER_GROUPS } from "src/services/api/url.index";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
const UserSystemList = () => {
	const dispatch = useDispatch();
	const isMount = useIsMount();
	const [formSearch] = Form.useForm();
	const [selectedBank, setSelectedBank] = useState<any>(undefined);
	const [formCreate] = Form.useForm();
	const [visible, setVisible] = useState<boolean>(false);
	const [status, setStatus] = useState(false);
	const [typeForm, setTypeForm] = useState(1);
	const [editValue, setEditValue] = useState<any>(undefined);
	const [paramsFilter, setParamsFilter] = useState<any>({
		status: undefined,
		q: undefined,
		page: 1,
		limit: 10
	});
	const [branchs, setBranchs] = useState<any[]>([]);
	const [listAddWarehouse, setListAddWarehouse] = useState<any[]>([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState<any>(undefined);
	const [listRoles, setListRoles] = useState<any[]>([]);
	const [selectedProvince, setSelectedProvince] = useState<any>(undefined);
	const [selectedDistrict, setSelectedDistrict] = useState<any>(undefined);
	const [listWarehouse, setListWarehouse] = useState<any[]>([]);
	const [provinces, setProvinces] = useState<any[]>([]);
	const [districts, setDistricts] = useState<any[]>([]);
	const [wards, setWards] = useState<any[]>([]);
	const [banks, setBanks] = useState<any[]>([]);
	const { stateGetListUserSystem, stateUpdateOneUserSystem, stateCreateOneUserSystem } = useSelector(
		(state: AppState) => state.userReducer
	);
	const userType = localStorage.getItem("ACCOUNT") ? JSON.parse(localStorage.getItem("ACCOUNT") || "")?.user_type : "";

	/****************************START**************************/
	/*                         Life Cycle                      */
	const [roles, setRoles] = useState<any>([]);
	const pathName = useHistory().location.pathname.slice(1);

	useEffect(() => {
		const getAddRoles = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/${API_USER_GROUPS}`, params)) as any;
				let data = response?.data;
				let fakeArray = [];
				for (let i = 0; i < data?.length; i++) {
					fakeArray.push({
						label: data[i]?.role_name,
						value: data[i]?.id
					});
				}
				setListRoles(fakeArray);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};

		const timer = setTimeout(() => {
			let paramsFilterRoles = {
				page: 1,
				status: true,
				limit: 10000
			};
			getAddRoles(paramsFilterRoles);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		const getCities = async () => {
			console.log(selectedBank, banks);
			try {
				const response = (await api.get(
					`${API_URL}/banks/branchs?bank_code=${banks.find((x: any) => selectedBank === x.id)?.bank_code}`
				)) as any;
				let data = response;
				if (data) {
					let cities = data?.data;
					let fakeCities = [];
					for (var i = 0; i < cities.length; i++) {
						fakeCities.push({
							label: cities[i]?.branch_name,
							value: cities[i]?.id
						});
					}
					setBranchs(fakeCities);
				}
			} catch (error) {}
		};
		if (selectedBank) {
			getCities();
		}
	}, [selectedBank, banks]);
	useEffect(() => {
		const getCities = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/banks`, params)) as any;
				let data = response?.data;
				if (data) {
					let banks = data;
					let fakeBanks = [];
					for (var i = 0; i < banks.length; i++) {
						fakeBanks.push({
							...banks[i],
							label: banks[i]?.bank_name,
							value: banks[i]?.id
						});
					}
					setBanks(fakeBanks);
				}
			} catch (error) {}
		};
		getCities();
	}, []);

	useEffect(() => {
		const getCities = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/provinces`, params)) as any;
				const data = response.data;
				if (data) {
					let cities = data;
					let fakeCities = [];
					for (var i = 0; i < cities.length; i++) {
						fakeCities.push({
							label: cities[i]?.province_name,
							value: cities[i]?.id
						});
					}
					setProvinces(fakeCities);
				}
			} catch (error) {}
		};
		getCities();
	}, []);
	//district
	useEffect(() => {
		if (selectedProvince) {
			const getProvinces = async (params: any) => {
				try {
					const response = (await api.get(`${API_URL}/districts`, params)) as any;
					const data = response.data;
					if (data) {
						console.log(data);
						let districts = data;
						let fakeDistricts = [];
						for (var i = 0; i < districts.length; i++) {
							fakeDistricts.push({
								label: districts[i]?.district_name,
								value: districts[i]?.id
							});
						}
						setDistricts(fakeDistricts);
					}
				} catch (error) {}
			};

			getProvinces({ province_id: selectedProvince });
		}
	}, [selectedProvince]);
	//ward
	useEffect(() => {
		if (selectedDistrict) {
			const getWards = async (params: any) => {
				try {
					const response = (await api.get(`${API_URL}/wards`, params)) as any;
					const data = response.data;
					if (data) {
						let fakeWards = [];
						for (var i = 0; i < data?.length; i++) {
							fakeWards.push({
								label: data[i]?.ward_name,
								value: data[i]?.id
							});
						}
						setWards(fakeWards);
					}
				} catch (error) {}
			};

			getWards({ district_id: selectedDistrict });
		}
	}, [selectedDistrict]);

	useEffect(() => {
		const getCategories = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/warehouses`, params)) as any;
				let fakeMaster = [];
				let data = response["data"];
				for (let i = 0; i < data?.length; i++) {
					fakeMaster.push({
						...data[i],
						label: data[i].warehouse_name,
						value: data[i].id
					});
					setListWarehouse(fakeMaster);
				}
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			let params = {
				page: 1,
				limit: 10000,
				status: true
			};
			if (userType !== "admin") {
				getCategories(params);
			}
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);
	const handleAddWarehouse = () => {
		setListAddWarehouse([
			...listAddWarehouse,
			{ ...listWarehouse.find((x: any) => x.value === selectedWarehouse), status: false }
		]);
		setSelectedWarehouse(undefined);
	};
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
		if (!stateUpdateOneUserSystem.isLoading && !stateCreateOneUserSystem.isLoading) {
			dispatch(getListUserSystem(paramsFilter));
		}
	}, [paramsFilter, stateUpdateOneUserSystem.isLoading, stateCreateOneUserSystem.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { isLoading, success, message, error, data } = stateCreateOneUserSystem;

		if (!isLoading) {
			if (success) {
				notifySuccess("Tạo người dùng thành công");
				setVisible(false);
				formCreate.resetFields();
				setTypeForm(1);
				setListAddWarehouse([]);
			} else if (success === false || error) {
				notifyError(getMessageV1(message));
			}
		}
	}, [stateCreateOneUserSystem.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { data, message, success, isLoading, error } = stateUpdateOneUserSystem;
		if (!isLoading) {
			if (success) {
				notifySuccess("Cập nhật thành công");
				setTypeForm(1);
				setVisible(false);
				formCreate.resetFields();
				setListAddWarehouse([]);
			}
			if (success === false || error) {
				let msg = getMessageV1(message, ", ");
				return notifyError(msg);
			}
		}
	}, [stateUpdateOneUserSystem.isLoading]);

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
		formCreate.resetFields();
		setTypeForm(1);
	};

	const handleChangeReasonStatus = (e: any) => {
		let params = {
			status: !e.status
		};
		dispatch(updateOneUserSystem(e.id, params));
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
					ward_name: wards.find((x: any) => x.value === values?.ward_id)?.label,
					warehouses: [...listAddWarehouse].map((x: any) => {
						return { warehouse_id: x.id, status: x.status };
					}),
					password: values?.password
				})
			);
		} else {
			let params = {
				...values,
				status: status,
				province_name: provinces.find((x: any) => x.value === values?.province_id)?.label,
				district_name: districts.find((x: any) => x.value === values?.district_id)?.label,
				ward_name: wards.find((x: any) => x.value === values?.ward_id)?.label,
				password: values?.password === "******" ? undefined : values?.password,
				warehouses: [...listAddWarehouse].map((x: any) => {
					return { warehouse_id: x.id, status: x.status };
				})
			};
			dispatch(updateOneUserSystem(editValue.id, params));
		}
	};

	const openRecord = async (values: any) => {
		if (!values.id) {
			return notifyWarning("Không tìm thấy id");
		}
		try {
			const response = (await api.get(`${API_URL}/user-systems/${values.id}`)) as any;
			let data = response;
			setTypeForm(2);
			setEditValue(data?.data);
			setVisible(true);
			setStatus(data?.data?.status);
			setSelectedProvince(data?.data?.province_id);
			setSelectedDistrict(data?.data?.district_id);
			setSelectedBank(data?.data?.bank_id);
			setListAddWarehouse(
				data?.data?.warehouse_staffs?.map((x: any) => {
					return { ...x.warehouse, status: x.status };
				})
			);
			formCreate.setFieldsValue({
				fullname: data?.data?.fullname,
				phone: data?.data?.phone,
				email: data?.data?.email,
				role_id: data?.data?.userRole?.role_id,
				account_number: data?.data?.account_number,
				account_name: data?.data?.account_name,
				bank_id: data?.data?.bank_id,
				bank_branch_id: data?.data?.bank_branch_id,
				province_id: data?.data?.province_id,
				province_name: data?.data?.province_name,
				district_id: data?.data?.district_id,
				district_name: data?.data?.district_name,
				ward_id: data?.data?.ward_id,
				ward_name: data?.data?.ward_name,
				address: data?.data?.address,
				status: data?.data?.status,
				password: "******",
				confirm: "******"
			});
		} catch (error: any) {
			throw new Error(error.response.data.message);
		}
	};

	const submitSearch = (values: any) => {
		let params = values;
		params.created_at_start = values?.picker ? moment(values?.picker[0]).format(dateFormatYMD) + " 0:0:0" : undefined;
		params.created_at_end = values?.picker ? moment(values?.picker[1]).format(dateFormatYMD) + " 23:59:59" : undefined;
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
	const handleChangeStatusWarehouse = (record: any, value: any) => {
		let fakeListWarehouse = [...listAddWarehouse];
		let fakeWarehouse = fakeListWarehouse.find((x: any) => x.id === record.id);
		if (fakeWarehouse) {
			fakeWarehouse.status = value;
		}
		fakeListWarehouse = fakeListWarehouse.map((x: any) => (x.id === record.id ? fakeWarehouse : x));
		setListAddWarehouse(fakeListWarehouse);
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
					className="modalUserSystem"
					open={visible}
					title={typeForm === 2 ? "Chi tiết" : "Thêm mới người dùng"}
					onCancel={() => {
						setVisible(false);
						setListAddWarehouse([]);
					}}
					footer={null}
					centered={true}
					width="1000px"
				>
					<Form
						form={formCreate}
						id="formCreate"
						onFinish={handleSubmitCreate}
						onFinishFailed={(e: any) => console.log(e)}
						layout="vertical"
						style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}
					>
						<h4 style={{ width: "100%", margin: "0" }}>Thông tin chung</h4>
						<Form.Item
							rules={[{ required: true, message: "Vui lòng không bỏ trống!" }]}
							name="fullname"
							style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}
							label="Họ tên"
						>
							<Input placeholder="Nhập họ tên" className="defaultInput" width="100%" />
						</Form.Item>
						{(editValue?.userRole || typeForm === 1) && (
							<Form.Item
								rules={
									editValue?.userRole || typeForm === 1
										? [{ required: true, message: "Vui lòng không bỏ trống!" }]
										: [{ required: false }]
								}
								name="role_id"
								style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}
								label="Nhóm vai trò"
							>
								<Select
									showSearch
									filterOption={(input: any, option: any) =>
										removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
									}
									options={listRoles}
									placeholder="Chọn vai trò"
									className="defaultSelect"
								/>
							</Form.Item>
						)}

						<Form.Item
							rules={[{ required: true, pattern: phonePattern, message: message.customer.inValidPhone }]}
							name="phone"
							style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}
							label="Số điện thoại"
						>
							<Input placeholder="Nhập số điện thoại" className="defaultInput" width="100%" />
						</Form.Item>
						<Form.Item
							rules={[{ required: true, pattern: mailPattern, message: message.customer.inValidEmail }]}
							name="email"
							style={{
								width: editValue?.userRole || typeForm === 1 ? "calc(25% - 4px)" : "calc(50% - 4px)",
								margin: "0 0 13px 0"
							}}
							label="Email"
						>
							<Input placeholder="Nhập email" className="defaultInput" width="100%" />
						</Form.Item>

						<Form.Item
							rules={[
								() => ({
									validator(_: any, value: any) {
										if (value === "******") {
											return Promise.resolve();
										}
										if (value !== "******" && isValidPassword(value)) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("Vui lòng nhập đúng định dạng password"));
									}
								})
							]}
							style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}
							name="password"
							label="Mật khẩu:"
						>
							<Input.Password id="form-password" placeholder="Mật khẩu" className="defaultInput" type="password" />
						</Form.Item>
						<Form.Item
							style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}
							name="confirm"
							label="Nhập lại mật khẩu:"
							dependencies={["password"]}
							rules={[
								{
									required: true,
									message: "Vui lòng nhập lại password!"
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("Nhập lại mật khẩu không khớp!"));
									}
								})
							]}
						>
							<Input.Password placeholder="Nhập lại mật khẩu" className="defaultInput" />
						</Form.Item>
						{(editValue?.userRole || typeForm === 1) && <div style={{ width: "calc(50% - 8px)" }}>&nbsp;</div>}
						{!editValue?.userRole && <div style={{ width: "calc(50% - 8px)" }}>&nbsp;</div>}

						<h4 style={{ width: "100%" }}>Thông tin ngân hàng</h4>
						<Form.Item
							label="Tên tài khoản"
							name="account_name"
							style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}
						>
							<Input placeholder="Tên tài khoản" className="defaultInput" width="100%" />
						</Form.Item>
						<Form.Item label="Ngân hàng" name="bank_id" style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}>
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={banks}
								placeholder="Chọn ngân hàng"
								className="defaultSelect"
								onChange={(e: any) => {
									setSelectedBank(e);
									formCreate.setFieldsValue({
										bank_branch_id: undefined
									});
								}}
							/>
						</Form.Item>
						<Form.Item
							label="Số tài khoản ngân hàng"
							name="account_number"
							style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}
						>
							<Input
								onChange={(e: any) => {
									formCreate.setFieldValue("account_number", convertToOnlyNumber(e.target.value));
								}}
								placeholder="Nhập số tài khoản"
								className="defaultInput"
								width="100%"
							/>
						</Form.Item>
						<Form.Item
							name="bank_branch_id"
							label="Chi nhánh"
							style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}
						>
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={branchs}
								className="defaultSelect"
							/>
						</Form.Item>
						<h4 style={{ width: "100%" }}>Thông tin địa chỉ</h4>
						<Form.Item
							label="Tỉnh/ thành phố"
							name="province_id"
							style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}
						>
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={provinces}
								placeholder="Tất cả"
								className="defaultSelect"
								onChange={(e: any) => {
									setSelectedProvince(e);
									setWards([]);
									formCreate.setFieldsValue({
										district_id: undefined,
										ward_id: undefined
									});
								}}
							/>
						</Form.Item>
						<Form.Item
							label="Quận/ huyện"
							name="district_id"
							style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}
						>
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={districts}
								placeholder="Tất cả"
								className="defaultSelect"
								onChange={(e: any) => {
									setSelectedDistrict(e);
									formCreate.setFieldsValue({
										ward_id: undefined
									});
								}}
							/>
						</Form.Item>
						<Form.Item label="Phường/ xã" name="ward_id" style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}>
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
								}
								options={wards}
								placeholder="Tất cả"
								className="defaultSelect"
							/>
						</Form.Item>
						<Form.Item label="Địa chỉ" name="address" style={{ width: "calc(25% - 4px)", margin: "0 0 13px 0" }}>
							<Input placeholder="Nhập địa chỉ" className="defaultInput" width="100%" />
						</Form.Item>
					</Form>
					{userType !== "admin" && (
						<>
							<h4>Danh sách kho của nhân viên</h4>
							<div style={{ display: "flex", alignItems: "center" }}>
								<Select
									className="defaultSelect"
									placeholder="Chọn kho"
									options={listWarehouse}
									showSearch
									filterOption={(input: any, option: any) =>
										removeSign(option.label).toLowerCase().includes(removeSign(input).toLowerCase())
									}
									style={{ width: "200px", marginRight: "8px" }}
									onChange={(e: any) => setSelectedWarehouse(e)}
									value={selectedWarehouse}
								/>
								<div
									className="defaultButton"
									onClick={() =>
										listAddWarehouse.find((x: any) => x.id === selectedWarehouse)
											? notifyWarning("Đã tồn tại kho")
											: handleAddWarehouse()
									}
								>
									Thêm
								</div>
							</div>
							<TableStyledAntd
								style={{ marginTop: "13px" }}
								scroll={{ y: "100px" }}
								className="ordersTable"
								rowKey={"id"}
								columns={columnsDataWarehouse({ handleChangeStatusWarehouse })}
								dataSource={listAddWarehouse}
								loading={false}
								pagination={false}
								bordered
								widthCol3="100px"
							/>
						</>
					)}

					<div className="formAddSupplier__footer" style={{ height: "40px", marginTop: "13px" }}>
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
			<SubHeader breadcrumb={[{ text: "Thiết lập hệ thống" }, { text: "Người dùng hệ thống" }]} />

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
						style={{ width: "calc((100% - 400px) / 3)", margin: "0" }}
					>
						<Input className="defaultInput" placeholder="Nhập user id, sđt, tên người dùng" />
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
						&nbsp;Thêm
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
					scroll={{ y: "calc(100vh - 345px)" }}
					className="ordersTable"
					rowKey={"id"}
					columns={
						userType !== "admin"
							? columnsData({ handleChangeReasonStatus, roles: roles, openRecord })
							: columnsData2({ handleChangeReasonStatus, roles: roles, openRecord })
					}
					dataSource={stateGetListUserSystem.data ? stateGetListUserSystem.data.data : []}
					loading={stateGetListUserSystem.isLoading}
					pagination={false}
					bordered
					widthCol1="50px"
					widthCol2="calc((100% - 580px) / 3)"
					widthCol3={userType !== "admin" ? "110px" : "calc((100% - 580px) / 3)"}
					widthCol4={userType !== "admin" ? "calc((100% - 580px) / 3)" : "110px"}
					widthCol5={userType !== "admin" ? "calc((100% - 580px) / 3)" : "calc((100% - 580px) / 3)"}
					widthCol6="160px"
					widthCol7="160px"
					widthCol8="100px"
				/>

				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${stateGetListUserSystem?.data?.paging.total} người dùng `}
					total={stateGetListUserSystem?.data?.paging.total}
				/>
			</Col>
		</div>
	);

	/**************************** END **************************/
};

export default UserSystemList;
