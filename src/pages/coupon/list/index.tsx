/* eslint-disable */
import { Row, Col, Input, Select, DatePicker, Spin, Form, Switch, Popover } from "antd";
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
import { columnsData, dataDefault, defaultFilter } from "./data";
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
import SvgIcon3Dot from "src/assets/svg/SvgIcon3Dot";
import Svg138 from "src/assets/svg/\bSvg138";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
const CouponList = () => {
	const [formSearch] = Form.useForm();
	const history = useHistory();
	const [paramsFilter, setParamsFilter] = useState<any>({
		status: undefined,
		q: undefined,
		start_at: undefined,
		end_at: undefined,
		page: 1,
		limit: 10
	});
	const [listCoupon, setListCoupon] = useState<any>({
		total: 0,
		data: []
	});
	const [visibleActionPopover, setVisibleActionPopover] = useState(false);
	const [loadingChange, setLoadingChange] = useState(false);
	/****************************START**************************/
	/*                         Life Cycle                      */
	const checkStatus = (array: any) => {
		for (let i = 0; i < array.length; i++) {
			let status = array[i].status;
			let a = array.find((x: any) => x.status !== status);
			if (a) {
				return false;
			}
		}
		return true;
	};
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
		const getCouponList = async (params?: any) => {
			setListCoupon({ ...listCoupon, loading: true });
			try {
				const response = (await api.get(`${API_URL}/coupons`, params)) as any;
				let data = response["data"];
				setListCoupon({ total: response?.paging?.total, data: data, loading: false });
			} catch (error: any) {
				notifyWarning(`${error.message}`);
				setListCoupon({ ...listCoupon, loading: false });
				throw new Error(error.response.data.message);
			}
		};
		const timer = setTimeout(() => {
			let mainParams = { ...paramsFilter };
			if (!loadingChange) {
				getCouponList(mainParams);
			}
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, [paramsFilter, loadingChange]);

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

	const btnUpdatePassword = (data: any) => {
		// setDataUser(data);
		// setIsCreate(false);
		// setVisible(true);
	};
	const handleChangeStatus = async (e: any) => {
		try {
			let params = {
				coupon_ids: addSelectedRowKeys,
				status: e
			};
			setLoadingChange(true);
			const response = (await api.put(`${API_URL}/coupons/change-status`, params)) as any;
			let data = response;
			if (data.success) {
				notifySuccess("Đổi trạng thái chương trình thành công!");
				setAddSelectedRowKeys([]);
				setAddSelectedRows([]);
			} else {
				notifyWarning(data?.message);
			}
			setLoadingChange(false);
		} catch (error: any) {
			setLoadingChange(false);
			throw new Error(error.response.data.message);
		}
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

	/**************************** END **************************/

	/****************************START**************************/
	/*                         Component                       */

	/**************************** END **************************/

	/****************************START**************************/
	/*                        Return Page                      */

	const submitSearch = (values: any) => {
		let params = { ...values };
		params.start_at = values?.start_at ? moment(values?.start_at).format(dateFormatYMD) : undefined;
		params.end_at = values?.end_at ? moment(values?.end_at).format(dateFormatYMD) : undefined;
		delete params.picker;
		console.log(params);
		setParamsFilter({ ...paramsFilter, ...params, page: 1 });
		setAddSelectedRowKeys([]);
		setAddSelectedRows([]);
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
	const [addSelectedRowKeys, setAddSelectedRowKeys] = useState<any[]>([]);
	const [addSelectedRows, setAddSelectedRows] = useState<any[]>([]);
	const rowSelection = {
		selectedRowKeys: addSelectedRowKeys,
		onSelect: (_record: any, _selected: boolean, _selectedRows: any) => {
			if (_selected) {
				setAddSelectedRowKeys([...addSelectedRowKeys, _record.id]);
				setAddSelectedRows([...addSelectedRows, _record]);
			} else {
				setAddSelectedRowKeys([...addSelectedRowKeys.filter((e: any) => e !== _record?.id)]);
				setAddSelectedRows([...addSelectedRows.filter((e: any) => e?.id !== _record?.id)]);
			}
		},
		onSelectAll: (_selected: boolean, _selectedRows: any, _changeRows: any) => {
			if (_selected) {
				let _rowkeys = _changeRows.map((e: any) => e.id);
				let _rows = _changeRows;
				setAddSelectedRowKeys([...addSelectedRowKeys, ..._rowkeys]);
				setAddSelectedRows([...addSelectedRows, ..._rows]);
			} else {
				let _rowKeys: any[] = addSelectedRowKeys;
				let _rows: any[] = addSelectedRows;
				_changeRows.forEach((e: any) => {
					_rowKeys = _rowKeys.filter((item) => item !== e.id);
					_rows = _rows.filter((item) => item?.id !== e?.id);
				});

				setAddSelectedRowKeys(_rowKeys);
				setAddSelectedRows(_rows);
			}
		}
	};

	const contentAction = () => {
		if (paramsFilter.status === 4) {
			return;
		}
		return (
			<div style={{ borderRadius: "5px", padding: "4px", width: "140px" }}>
				{(addSelectedRows[0].status === 1 || addSelectedRows[0].status === 3) && (
					<div
						style={{
							height: "35px",
							border: "1px solid rgb(212,212,212)",
							background: "rgb(243,243,243)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							fontWeight: "600"
						}}
						onClick={(e: any) =>
							addSelectedRowKeys.length > 0 ? handleChangeStatus(2) : notifyWarning("Vui lòng chọn chương trình")
						}
					>
						Kích hoạt
					</div>
				)}
				{addSelectedRows[0].status === 2 && (
					<div
						style={{
							marginTop: "4px",
							height: "35px",
							border: "1px solid rgb(212,212,212)",
							background: "rgb(243,243,243)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							fontWeight: "600"
						}}
						onClick={(e: any) =>
							addSelectedRowKeys.length > 0 ? handleChangeStatus(3) : notifyWarning("Vui lòng chọn chương trình")
						}
					>
						Tạm dừng
					</div>
				)}
				{(addSelectedRows[0].status === 2 || addSelectedRows[0].status === 3) && (
					<div
						style={{
							marginTop: "4px",
							height: "35px",
							border: "1px solid rgb(212,212,212)",
							background: "rgb(243,243,243)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							fontWeight: "600"
						}}
						onClick={(e: any) =>
							addSelectedRowKeys.length > 0 ? handleChangeStatus(4) : notifyWarning("Vui lòng chọn chương trình")
						}
					>
						Ngừng hoạt động
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="mainPages">
			<SubHeader breadcrumb={[{ text: "Khuyến mãi" }, { text: "Mã giảm giá" }]} />
			<OverlaySpinner text="Đang đổi trạng thái" open={loadingChange} spin />
			<div className="ordersPage__search" style={{ padding: "8px 16px 16px 16px" }}>
				<Form
					id="formSearch"
					form={formSearch}
					layout="vertical"
					className="ordersPage__search__form"
					onFinish={submitSearch}
					initialValues={{
						start_at: moment(`${new Date()}`).add(-3, "M"),
						end_at: moment(`${new Date()}`)
					}}
				>
					<Form.Item
						name="q"
						label="Tìm kiếm"
						className="ordersPage__search__form__item"
						style={{ width: "calc((100% - 528px) / 4)", margin: "0" }}
					>
						<Input className="defaultInput" placeholder="Mã" />
					</Form.Item>
					<Form.Item
						name="start_at"
						label="Ngày bắt đầu"
						style={{ width: "calc((100% - 528px) / 4 )", margin: "0", marginTop: "-1px" }}
					>
						<DatePicker className="defaultDate" />
					</Form.Item>
					<Form.Item
						name="end_at"
						label="Ngày kết thúc"
						style={{ width: "calc((100% - 528px) / 4 )", margin: "0", marginTop: "-1px" }}
					>
						<DatePicker className="defaultDate" />
					</Form.Item>
					<Form.Item name="status" label="Trạng thái" style={{ width: "calc((100% - 528px) / 4)", margin: "0" }}>
						<Select
							options={[
								{ label: "Tất cả", value: null },
								{
									label: "Chưa kích hoạt",
									value: 1
								},
								{
									label: "Hoạt động",
									value: 2
								},
								{
									label: "Tạm dừng",
									value: 3
								},
								{
									label: "Ngừng hoạt động",
									value: 4
								}
							]}
							placeholder="Chọn trạng thái"
							className="defaultSelect"
						/>
					</Form.Item>

					<button className="searchButton" style={{ marginTop: "19px" }} type="submit" form="formSearch">
						<SvgIconSearch style={{ transform: "scale(0.8)" }} />
						&nbsp;Tìm kiếm
					</button>
					<div className="searchButton" style={{ marginTop: "19px" }} onClick={() => submitRefresh()}>
						<SvgIconRefresh style={{ transform: "scale(0.8)" }} />
						&nbsp;Đặt lại
					</div>
					<Popover
						content={addSelectedRowKeys.length > 0 && paramsFilter.status !== 4 && contentAction}
						title=""
						placement="bottom"
						trigger="click"
						open={visibleActionPopover}
						onOpenChange={(e) =>
							checkStatus(addSelectedRows || [])
								? setVisibleActionPopover(e)
								: notifyWarning("Vui lòng chỉ chọn các đơn cùng trạng thái")
						}
					>
						<div
							className="searchButton"
							style={{
								marginTop: "19px",
								cursor: addSelectedRowKeys.length > 0 && paramsFilter.status !== 4 ? "pointer" : "not-allowed"
							}}
						>
							<Svg138 />
							&nbsp;Thao tác
						</div>
					</Popover>
					<div onClick={() => history.push("/coupon/create")} className="defaultButton" style={{ marginTop: "17px" }}>
						<SvgIconPlus style={{ transform: "scale(0.8)" }} />
						&nbsp;Thêm mới
					</div>
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
					columns={columnsData({})}
					rowSelection={rowSelection}
					dataSource={listCoupon?.data || []}
					loading={listCoupon.loading}
					pagination={false}
					bordered
					widthCol1="50px"
					widthCol8="70px"
					widthCol10="150px"
				/>

				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					showSizeChanger
					onChange={onChangePaging}
					showTotal={() => `Tổng ${listCoupon?.total} chương trình`}
					total={listCoupon?.total}
				/>
			</Col>
		</div>
	);

	/**************************** END **************************/
};

export default CouponList;
