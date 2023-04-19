import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SvgBin from "src/assets/svg/SvgBin";
import SvgIconStorage from "src/assets/svg/SvgIconStorage";
import { notifyError, notifySuccess, notifyWarning } from "src/components/notification";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { getOneCodById, updateOneCod } from "src/services/actions/cod.actions";
import { fetchProductsList } from "src/services/actions/product.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { AppState } from "src/types";
import { ISO8601Formats } from "src/utils/helpers/functions/date";
import { convertNumberWithCommas, getAddressString } from "src/utils/helpers/functions/textUtils";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { columnsData, columnsDataCheck, columnsDataCheck2, columnsDataHistory } from "./data";

const CODEdit = () => {
	const [updateForm] = Form.useForm();
	const [paymentForm] = Form.useForm();

	const dispatch = useDispatch();
	const history = useHistory();
	const [havePayment, setHavePayment] = useState(false);
	const isMount = useIsMount();
	const paramsUrl = useParams() as any;
	const [visibleHistory, setVisibleHistory] = useState(false);
	const [statusUpdate, setStatusUpdate] = useState(2);
	const [visibleCancel, setVisibleCancel] = useState(false);
	const [listBillCheck, setListBillCheck] = useState<any[]>([]);
	const [listBill, setListBill] = useState<any[]>([]);
	const [listBillLength, setListBillLength] = useState(0);
	const [newAddList, setNewAddList] = useState<any[]>([]);
	const [listShipping, setListShipping] = useState<any[]>([]);
	const [showProduct, setShowProduct] = useState(false);
	const [filterProduct, setFilterProduct] = useState<any>("");
	const [visible, setVisible] = useState(false);
	const [visiblePayment, setVisiblePayment] = useState(false);
	const [removeList, setRemoveList] = useState<any[]>([]);
	const [dataInfomation, setDataInformation] = useState<any>(undefined);
	const [listStaff, setListStaff] = useState<any[]>([]);
	const [formSearch] = Form.useForm();
	const [paramsFilter, setParamsFilter] = useState<any>({
		page: 1,
		limit: 10
	});
	const { stateCodById, stateUpdateOneCod } = useSelector((state: AppState) => state.codReducer);
	useEffect(() => {
		dispatch(getOneCodById(paramsUrl?.id));
	}, [paramsUrl?.id]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, message, error, isLoading } = stateUpdateOneCod;
		if (!isLoading) {
			if (success) {
				notifySuccess(statusUpdate === 3 ? "Huỷ phiếu đối soát thành công" : "Cập nhật phiếu đối soát thành công");
				history.push("/cod");
			}
			if (success === false || error) {
				notifyError(`${message}`);
			}
		}
	}, [stateUpdateOneCod.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateCodById;
		if (!isLoading) {
			if (success) {
				let dataInfo = data?.data;
				setDataInformation(data?.data);
				updateForm.setFieldsValue({
					shipping_unit: dataInfo?.shipping_unit?.shipping_unit,
					branch_name: dataInfo?.branch_name,
					created_by: dataInfo?.created_by,
					createdAt: dataInfo?.createdAt ? moment(dataInfo?.createdAt) : undefined,
					note: dataInfo?.note,
					verified_by: dataInfo?.verified_by,
					verified_at: dataInfo?.verified_at ? moment(dataInfo?.verified_at) : undefined
				});
				let fakeArray = [] as any;
				for (let i = 0; i < dataInfo?.order_deliveries?.length; i++) {
					console.log(
						"12321",
						dataInfo?.order_deliveries[i]?.cod >= 0 && dataInfo?.order_deliveries[i]?.shipping_fee ? "ok" : "no"
					);
					fakeArray.push({
						...dataInfo?.order_deliveries[i],
						totalFake:
							dataInfo?.order_deliveries[i]?.delivery_payment_by === 1
								? dataInfo?.order_deliveries[i]?.cod - dataInfo?.order_deliveries[i]?.shipping_fee
								: dataInfo?.order_deliveries[i]?.cod,
						order_delivery_id: dataInfo?.order_deliveries[i]?.id
					});
				}
				setListBillCheck(fakeArray);
			} else if (success === false || error) {
			}
		}
	}, [stateCodById.isLoading]);

	useEffect(() => {
		const getStaff = async () => {
			try {
				const response = (await api.get(`${API_URL}/orders/deliveries`, {
					...paramsFilter,
					q: filterProduct,
					empty_cod_and_carriage_id: true
				})) as any;
				let data = response;
				let fake = [];
				console.log("res", data);
				for (let i = 0; i < data?.data?.length; i++) {
					fake.push({
						...data?.data[i],
						value: data?.data[i]?.id,
						label: data?.data[i]?.order_code
					});
				}
				setListBillLength(data?.paging?.total);
				setListBill(fake);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		getStaff();
	}, [paramsFilter, filterProduct]);

	useEffect(() => {
		const getListShipping = async (params?: any) => {
			try {
				const response = (await api.get(`${API_URL}/shipping-units`, params)) as any;
				let data = response;
				let fake = [];
				for (let i = 0; i < data?.data?.length; i++) {
					fake.push({
						value: data?.data[i]?.id,
						label: data?.data[i]?.shipping_unit
					});
				}
				setListShipping(fake);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};

		const timer = setTimeout(() => {
			let paramsAddFilter = {
				page: 1,
				limit: 10000
			};
			getListShipping(paramsAddFilter);
		}, 200);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		const getStaff = async (params: any) => {
			try {
				const response = (await api.get(`${API_URL}/user-systems`, params)) as any;
				let data = response;
				let fake = [];
				for (let i = 0; i < data?.data?.length; i++) {
					fake.push({
						value: data?.data[i]?.id,
						label: data?.data[i]?.fullname
					});
				}
				setListStaff(fake);
			} catch (error: any) {
				throw new Error(error.response.data.message);
			}
		};
		getStaff({ status: true });
	}, []);

	const [addSelectedRowKeys, setAddSelectedRowKeys] = useState<any[]>([]);
	const [addSelectedRows, setAddSelectedRows] = useState<any[]>([]);
	const handleClickBill = (value: any) => {
		let check = [...listBillCheck];
		let newCheck = [...newAddList];
		let fakeRemove = [...removeList];
		if (fakeRemove.find((x: any) => x.order_delivery_id === value.id)) {
			let newArray = [...removeList].filter((x: any) => x.order_delivery_id !== value.id);
			setRemoveList(newArray);
		}
		if (check.find((x: any) => x.order_delivery_id === value.id)) {
			notifyWarning(`Vận đơn ${value?.delivery_code} đã tồn tại trong phiếu kiểm`);
		} else {
			check.push({
				...value,
				order_delivery_id: value.id,
				totalFake: value?.delivery_payment_by === 1 ? Number(value?.cod) - Number(value?.shipping_fee) : value?.cod
			});
			newCheck.push({ order_delivery_id: value?.id });
			setListBillCheck(check);
			setNewAddList(newCheck);
		}
		setFilterProduct("");
	};

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			page: page,
			limit: pageSize
		});
	};

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

	const handleAddList = () => {
		let check = [...listBillCheck];
		let newCheck = [...newAddList];
		let fakeRemove = [...removeList];
		let newArray = [...removeList];
		if (addSelectedRows.length === 0) {
			return notifyWarning("Vui lòng chọn vận đơn");
		}
		[...addSelectedRows].forEach((e: any) => {
			if (fakeRemove.find((x: any) => x.order_delivery_id === e.id)) {
				newArray = newArray.filter((x: any) => x.order_delivery_id !== e.id);
			}
			if (check.find((x: any) => x.order_delivery_id === e.id)) {
				notifyWarning(`Vận đơn ${e?.delivery_code} đã tồn tại trong phiếu kiểm`);
			} else {
				check.push({
					...e,
					order_delivery_id: e?.id,
					totalFake: e?.delivery_payment_by === 1 ? Number(e?.cod) - Number(e?.shipping_fee) : e?.cod
				});
				newCheck.push({ order_delivery_id: e?.id });
			}
		});
		setRemoveList(newArray);
		setListBillCheck(check);
		setNewAddList(newCheck);
		setVisible(false);
		setAddSelectedRowKeys([]);
		setAddSelectedRows([]);
	};
	const handleFinishCreate = (values: any) => {
		if (listBillCheck.length === 0) {
			return notifyWarning("Vui lòng chọn vận đơn!");
		}

		// dispatch(
		// 	createOneCod({
		// 		shipping_unit_id: values?.shipping_unit_id,
		// 		note: values?.note,
		// 		details: listBillCheck
		// 	})
		// );
	};

	const changeRealQty = (e: any, record: any) => {
		let check = [...listBillCheck];

		let item = check.find((x: any) => x.id === record.id);
		if (!item) {
			notifyWarning("Sản phẩm không tồn tại trong phiếu kiểm");
		} else {
			item.real_qty_in_stock = Number(e);
			item.differential = record.qty_in_stock ? Number(e) - Number(record.qty_in_stock) : Number(e);
			check = check.map((x: any) => (x.id === record.id ? item : x));
			setListBillCheck(check);
		}
	};

	const removeProduct = (record: any) => {
		let check = [...listBillCheck];
		let newCheck = [...newAddList];
		let fakeRemove = [...removeList];
		let item = check.find((x: any) => x.order_delivery_id === record.id);
		let itemRemove = fakeRemove.find((x: any) => x?.order_delivery_id === record.id);
		if (!itemRemove) {
			fakeRemove.push({ order_delivery_id: record.id });
			setRemoveList(fakeRemove);
		}
		if (!item) {
			notifyWarning("Vận đơn không tồn tại trong phiếu kiểm");
		} else {
			check = check.filter((x: any) => x.order_delivery_id !== record.id);
			newCheck = newCheck.filter((x: any) => x.order_delivery_id !== record.id);
			setListBillCheck(check);
			setNewAddList(newCheck);
		}
	};

	const calcPrice = () => {
		let total = { cod: 0, shipping: 0, total: 0, delivery_cod_fee: 0 };
		for (let i = 0; i < listBillCheck?.length; i++) {
			total.cod = total.cod + Number(listBillCheck[i]?.cod);
			total.shipping = total.shipping + Number(listBillCheck[i]?.shipping_fee);
			total.total = total.total + Number(listBillCheck[i]?.debit_amount);
			total.delivery_cod_fee = total.delivery_cod_fee + Number(listBillCheck[i]?.delivery_cod_fee);
		}
		return total;
	};

	const submitUpdate = (values: any) => {
		if (statusUpdate === 3) {
			let paramsUpdate = {
				for_control_status: statusUpdate
			};
			dispatch(updateOneCod(paramsUrl?.id, paramsUpdate));
		} else {
			let dataInfo = updateForm.getFieldsValue();
			let dataPayment = paymentForm.getFieldsValue();
			let paramsUpdate = {
				for_control_status: 2,
				note: dataInfo?.note,
				verified_by: listStaff.find((x: any) => x.value === dataInfo?.verified_by)?.label,
				verified_at: moment(dataPayment?.verified_at, "YYYY-MM-DD hh:mm:ss"),
				payment_status: havePayment ? 2 : 1,
				payment_method: havePayment ? dataPayment?.payment_method : undefined,
				paid_amount: havePayment ? dataPayment?.paid_amount : undefined,
				payment_at: havePayment ? moment(dataPayment?.payment_at, "YYYY-MM-DD hh:mm:ss") : undefined,
				payment_ref_code: havePayment ? dataPayment?.payment_ref_code : undefined,
				details: listBillCheck,
				more_details: newAddList.map((x: any) => {
					return { order_delivery_id: x.order_delivery_id };
				}),
				remove_details: removeList
			};
			dispatch(updateOneCod(paramsUrl?.id, paramsUpdate));
		}
	};

	const submitPayment = (values: any) => {
		if (values?.payment_method === 2 && !values?.payment_ref_code) {
			return notifyWarning("Vui lòng nhập mã tham chiếu cho phương thức chuyển khoản");
		}
		setVisiblePayment(false);
		setHavePayment(true);
		updateForm.submit();
	};
	return (
		<div className="mainPages productPage">
			<SubHeader
				breadcrumb={[{ text: "Vận chuyển" }, { text: "Đối soát COD và cước phí", link: "/cod" }, { text: "Chi tiết" }]}
			/>
			<Modal
				open={visibleCancel}
				title="Xác nhận huỷ phiếu kiểm"
				centered
				className="modalEditSender"
				footer={null}
				onCancel={() => setVisibleCancel(false)}
				width={700}
			>
				<div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "8px" }}>
					<div className="searchButton" onClick={() => setVisibleCancel(false)}>
						Trở lại
					</div>
					<div className="defaultButton" style={{ marginLeft: "8px" }} onClick={() => updateForm.submit()}>
						Xác nhận
					</div>
				</div>
			</Modal>
			<Modal
				open={visibleHistory}
				title="Lịch sử đối soát"
				centered
				className="modalEditSender"
				footer={null}
				onCancel={() => {
					setVisibleHistory(false);
				}}
				width={700}
			>
				<TableStyledAntd
					style={{ border: "solid 1px rgb(237,240,243)" }}
					rowKey="id"
					dataSource={stateCodById?.data?.data?.logs || []}
					bordered={false}
					showHeader={false}
					pagination={false}
					columns={columnsDataHistory() as any}
				/>
			</Modal>
			<Modal
				open={visible}
				title="Chọn vận đơn đối soát"
				centered
				className="modalEditSender"
				footer={null}
				onCancel={() => {
					setVisible(false);
					setParamsFilter({ page: 1, limit: 5 });
					setFilterProduct(undefined);
				}}
				width={700}
			>
				<Input
					className="defaultInput"
					onChange={(e: any) => {
						setFilterProduct(e.target.value);
					}}
					value={filterProduct}
					placeholder="Mã vận đơn, mã đơn hàng, số điện thoại, tên người nhận"
				/>
				<TableStyledAntd
					style={{ border: "solid 1px rgb(237,240,243)", marginTop: "8px" }}
					rowKey="id"
					dataSource={listBill || []}
					bordered={false}
					showHeader={false}
					pagination={false}
					rowSelection={rowSelection}
					columns={columnsData() as any}
				/>
				<PanigationAntStyled
					style={{ marginTop: "8px" }}
					current={paramsFilter.page}
					pageSize={paramsFilter.limit}
					onChange={onChangePaging}
					showTotal={() => `Tổng ${listBillLength} vận đơn `}
					total={listBillLength}
				/>
				<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }} onClick={() => handleAddList()}>
					<div className="defaultButton">
						<SvgIconStorage style={{ transform: "scale(0.7)" }} />
						&nbsp;Thêm
					</div>
				</div>
			</Modal>
			<Modal
				open={visiblePayment}
				title="Xác nhận thanh toán"
				centered
				className="modalEditSender"
				footer={null}
				onCancel={() => setVisiblePayment(false)}
				width={700}
			>
				<Form
					onFinish={submitPayment}
					layout="vertical"
					form={paymentForm}
					id="paymentForm"
					style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}
					initialValues={{
						payment_method: 1,
						paid_amount: dataInfomation?.debit_amount,
						payment_at: moment(new Date(), "YYYY-MM-DD hh:mm:ss")
					}}
				>
					<Form.Item
						name="payment_method"
						label="Phương thức thanh toán"
						style={{ width: "calc(50% - 4px)", margin: "4px 0" }}
					>
						<Select
							className="defaultSelect"
							placeholder="Chọn phương thức thanh toán"
							options={[
								{ label: "Chuyển khoản", value: 2 },
								{ label: "Tiền mặt", value: 1 }
							]}
						/>
					</Form.Item>
					<Form.Item name="paid_amount" label="Số tiền" style={{ width: "calc(50% - 4px)", margin: "4px 0" }}>
						<InputNumber
							placeholder="Nhập tiền thanh toán"
							className="defaultInputNumber"
							min={0}
							max={10000000000}
							disabled
							formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
						/>
					</Form.Item>
					<Form.Item name="payment_at" label="Ngày thanh toán" style={{ width: "calc(50% - 4px)", margin: "4px 0" }}>
						<DatePicker showTime className="defaultDate" placeholder="Chọn ngày thanh toán" />
					</Form.Item>
					<Form.Item name="payment_ref_code" label="Tham chiếu" style={{ width: "calc(50% - 4px)", margin: "4px 0" }}>
						<Input className="defaultInput" placeholder="Nhập mã tham chiếu" />
					</Form.Item>
					<div style={{ width: "100%" }}>
						<div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "8px" }}>
							<div className="searchButton" onClick={() => setVisiblePayment(false)}>
								Trở lại
							</div>
							<div className="defaultButton" style={{ marginLeft: "8px" }} onClick={() => paymentForm.submit()}>
								Xác nhận
							</div>
						</div>
					</div>
				</Form>
			</Modal>
			<div className="ordersPage__edit__header">
				<div className="ordersPage__edit__header__information">
					<span className="ordersPage__edit__header__information__code">{stateCodById?.data?.data?.bill_code}</span>
					<span
						className={
							stateCodById?.data?.data?.for_control_status === 1
								? "processStatus"
								: stateCodById?.data?.data?.for_control_status === 2
								? "completeStatus"
								: "cancelStatus"
						}
					>
						{stateCodById?.data?.data?.for_control_status === 1
							? "Chưa đối soát"
							: stateCodById?.data?.data?.for_control_status === 2
							? "Đã đối soát"
							: "Đã huỷ"}
					</span>
					<span className="ordersPage__edit__header__information__history" onClick={() => setVisibleHistory(true)}>
						Lịch sử thao tác
					</span>
				</div>
				<div>
					{stateCodById?.data?.data?.for_control_status === 1 && (
						<div style={{ display: "flex", alignItems: "center" }}>
							<div
								className="searchButton"
								onClick={() => {
									setStatusUpdate(3);
									setVisibleCancel(true);
								}}
							>
								<SvgBin style={{ transform: "scale(0.8)" }} />
								&nbsp;Huỷ phiếu đối soát
							</div>
							<div
								className="defaultButton"
								style={{ marginLeft: "8px" }}
								onClick={() => {
									setStatusUpdate(2);
									updateForm.submit();
								}}
							>
								Đối soát
							</div>
						</div>
					)}
				</div>
			</div>
			<div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
				<div style={{ width: "calc(65% - 4px)" }}>
					<div style={{ background: "#fff", borderRadius: "5px", padding: "16px" }}>
						<h4>Thông tin phiếu</h4>
						<Form
							onFinish={submitUpdate}
							layout="vertical"
							form={updateForm}
							id="updateForm"
							style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}
						>
							<Form.Item
								name="shipping_unit"
								label="Đối tác vận chuyển"
								style={{ width: "calc((100% - 24px) /4)", margin: "4px 0" }}
							>
								<Input className="defaultInput" disabled />
							</Form.Item>
							<Form.Item
								name="branch_name"
								label="Chi nhánh"
								style={{ width: "calc((100% - 24px) /4)", margin: "4px 0" }}
							>
								<Input className="defaultSelect" disabled />
							</Form.Item>
							<Form.Item
								name="created_by"
								label="Người tạo phiếu"
								style={{ width: "calc((100% - 24px) /4)", margin: "4px 0" }}
							>
								<Select className="defaultSelect" disabled />
							</Form.Item>
							<Form.Item
								name="createdAt"
								label="Ngày tạo phiếu"
								style={{ width: "calc((100% - 24px) /4)", margin: "4px 0" }}
							>
								<DatePicker showTime className="defaultDate" disabled />
							</Form.Item>
							<Form.Item
								name="verified_by"
								label="Người đối soát"
								style={{ width: "calc((100% - 24px) /4)", margin: "4px 0" }}
							>
								<Select
									options={listStaff}
									className="defaultSelect"
									disabled={stateCodById?.data?.data?.for_control_status !== 1}
								/>
							</Form.Item>
							<Form.Item
								name="verified_at"
								label="Ngày đối soát"
								style={{ width: "calc((100% - 24px) /4)", margin: "4px 0" }}
							>
								<DatePicker
									showTime
									className="defaultDate"
									// disabled={stateCodById?.data?.data?.for_control_status !== 1}
									disabled={true}
								/>
							</Form.Item>
							<Form.Item
								name="note"
								label="Ghi chú"
								style={{ width: "calc(((100% - 24px) /4) * 2 + 8px)", margin: "4px 0" }}
							>
								<Input className="defaultInput" disabled={stateCodById?.data?.data?.for_control_status !== 1} />
							</Form.Item>
						</Form>
					</div>
				</div>
				<div style={{ width: "calc(35% - 4px)" }}>
					<div style={{ background: "#fff", borderRadius: "5px", padding: "16px" }}>
						<div className="ordersPage__edit__header">
							<div className="ordersPage__edit__header__information">
								<span style={{ marginRight: "8px" }}>Thanh toán công nợ</span>
								<span
									className={stateCodById?.data?.data?.payment_status === 1 ? "uncompleteStatus" : "completeStatus"}
								>
									{stateCodById?.data?.data?.payment_status === 1 ? "Chưa thanh toán" : "Đã thanh toán"}
								</span>
							</div>
							{stateCodById?.data?.data?.payment_status === 1 && stateCodById?.data?.data?.for_control_status === 2 && (
								<div className="defaultButton" onClick={() => setVisiblePayment(true)}>
									Thanh toán
								</div>
							)}
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								background: "rgb(240,242,245)",
								padding: "4px",
								borderRadius: "5px",
								marginTop: "8px"
							}}
						>
							<div>
								<span style={{ color: "rgb(156,164,172)" }}>Công nợ:</span>&nbsp;
								{stateCodById?.data?.data?.debit_amount &&
									convertNumberWithCommas(stateCodById?.data?.data?.debit_amount)}
							</div>
							<div>
								<span style={{ color: "rgb(156,164,172)" }}>Đã thanh toán:</span>&nbsp;
								{stateCodById?.data?.data?.paid_amount &&
									convertNumberWithCommas(stateCodById?.data?.data?.paid_amount)}
							</div>
							<div>
								<span>Còn lại:</span>&nbsp;
								<span style={{ color: "red" }}>
									{stateCodById?.data?.data?.debit_amount &&
										convertNumberWithCommas(stateCodById?.data?.data?.debit_amount)}
								</span>
							</div>
						</div>
						{stateCodById?.data?.data?.payment_status === 2 && (
							<div style={{ marginTop: "8px" }}>
								<div>
									{stateCodById?.data?.data?.payment_method === 1 ? "Tiền mặt" : "Chuyển khoản"}&nbsp;&nbsp;&nbsp;
									<span style={{ color: "rgb(156,164,172)" }}>
										{stateCodById?.data?.data?.payment_at ? ISO8601Formats(stateCodById?.data?.data?.payment_at) : "-"}
									</span>
								</div>
								<div style={{ margin: "8px 0 0 0" }}>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center"
										}}
									>
										<span style={{ color: "rgb(156,164,172)" }}>Người thanh toán:</span>
										<span>{stateCodById?.data?.data?.paid_by}</span>
									</div>
									{stateCodById?.data?.data?.payment_method === 2 && (
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
												marginTop: "4px",
												paddingTop: "4px",
												borderTop: "1px solid rgb(176,184,192)"
											}}
										>
											<span style={{ color: "rgb(156,164,172)" }}>Mã tham chiếu:</span>
											<span>{stateCodById?.data?.data?.payment_ref_code}</span>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="contentSection">
				{stateCodById?.data?.data?.for_control_status === 1 ? (
					<>
						<h4 style={{ margin: "8px 0 0 0" }}>Danh sách vận đơn</h4>

						<div className="ordersPage__create__body__left__items__search">
							<div
								style={{
									display: "flex",
									alignItems: "center"
								}}
							>
								<div
									style={{ width: "calc(50%)", zIndex: "96" }}
									className="installStore__create__body__left__information__showProduct"
								>
									<Input
										className="defaultInput"
										onChange={(e: any) => {
											setFilterProduct(e.target.value);
											if (e.target.value.length > 0) {
												setShowProduct(true);
											} else {
												setShowProduct(false);
												setListBill([]);
											}
										}}
										value={filterProduct}
										onClick={() => {
											setShowProduct(false);
										}}
										placeholder="Mã vận đơn, mã đơn hàng, số điện thoại, tên người nhận"
									/>
									{showProduct && (
										<div
											className="installStore__create__body__left__information__showProduct__table"
											style={{ width: "100%" }}
										>
											{/* <div
								className="installStore__create__body__left__information__showProduct__table__add"
								onClick={() => setOpenModalAdd(true)}
							>
								<SvgIconPlus fill="#000" />
								&nbsp;&nbsp;Thêm mới sản phẩm
							</div> */}
											{listBill.length > 0 ? (
												listBill.map((x: any) => (
													<div
														style={{
															padding: "4px 8px",

															cursor: "pointer"
														}}
														onClick={() => {
															handleClickBill(x);
															setShowProduct(false);
														}}
													>
														<div
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "space-between"
															}}
														>
															<div>
																{x?.delivery_code} - {x?.delivery_status_name}
															</div>
															<div>Thu hộ (vnđ):</div>
														</div>
														<div
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "space-between",
																fontSize: "12px"
															}}
														>
															<div>
																{x?.s_phone} - {x?.s_fullname}
															</div>
															<div style={{ color: "red" }}>{x?.cod && convertNumberWithCommas(x?.cod)}đ</div>
														</div>
														<div
															style={{
																display: "flex",
																alignItems: "center",
																justifyContent: "space-between",
																fontSize: "12px"
															}}
														>
															<div style={{ color: "rgb(156,156,156)", fontSize: "12px" }}>
																{getAddressString(x?.s_address, x?.s_ward, x?.s_district, x?.s_province)}
															</div>
														</div>
													</div>
												))
											) : (
												<div>Không có sản phẩm</div>
											)}
										</div>
									)}
								</div>
								<button
									className="searchButton"
									style={{ marginLeft: "8px" }}
									onClick={() => {
										setVisible(true);
										setParamsFilter({ page: 1, limit: 5 });
										setFilterProduct(undefined);
									}}
								>
									Đối soát nhiều vận đơn
								</button>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								background: "rgb(237,240,243)",
								marginTop: "8px"
							}}
						>
							<div style={{ width: "calc(52% - 312px)", padding: "4px 6px", fontWeight: "600" }}>
								Tổng {listBillCheck?.length} vận đơn
							</div>
							<div style={{ width: "12%", textAlign: "right", padding: "4px 6px" }}>
								<div>Thu hộ COD (vnđ):</div>
								<span style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.cod)}</span>
							</div>
							<div style={{ width: "12%", textAlign: "right", padding: "4px 6px" }}>
								<div>Tiền cước (vnđ):</div>
								<span style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.shipping)}</span>
							</div>
							<div style={{ width: "12%", textAlign: "right", padding: "4px 6px" }}>
								<div>Phí thu hộ COD (vnđ):</div>
								<span style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.delivery_cod_fee)}</span>
							</div>
							<div style={{ width: "12%", textAlign: "right", padding: "4px 6px" }}>
								<div>Công nợ (vnđ):</div>
								<div style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.total)}</div>
							</div>
							<div style={{ width: "312px" }} />
						</div>
						<TableStyledAntd
							style={{ marginTop: "8px" }}
							rowKey="id"
							dataSource={listBillCheck}
							bordered
							pagination={false}
							columns={columnsDataCheck({ changeRealQty, removeProduct }) as any}
							widthCol1="50px"
							widthCol2="120px"
							widthCol3="180px"
							widthCol4="12%"
							widthCol5="12%"
							widthCol6="12%"
							widthCol7="12%"
							widthCol8="240px"
							widthCol9="50px"
						/>
					</>
				) : (
					<>
						<h4 style={{ margin: "8px 0 0 0" }}>Danh sách vận đơn</h4>

						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								background: "rgb(237,240,243)",
								marginTop: "8px"
							}}
						>
							<div
								style={{ width: "calc(40% - 205px)", padding: "4px 6px", fontWeight: "600" }}
								onClick={() => console.log("1", listBillCheck)}
							>
								Tổng {listBillCheck?.length} vận đơn
							</div>
							<div style={{ width: "15%", textAlign: "right", padding: "4px 6px" }}>
								<div>Thu hộ COD (vnđ):</div>
								<span style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.cod)}</span>
							</div>
							<div style={{ width: "15%", textAlign: "right", padding: "4px 6px" }}>
								<div>Tiền cước (vnđ):</div>
								<span style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.shipping)}</span>
							</div>
							<div style={{ width: "15%", textAlign: "right", padding: "4px 6px" }}>
								<div>Phí thu hộ COD (vnđ):</div>
								<span style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.delivery_cod_fee)}</span>
							</div>
							<div style={{ width: "15%", textAlign: "right", padding: "4px 6px" }}>
								<div>Công nợ (vnđ):</div>
								<span style={{ fontWeight: "600" }}>{convertNumberWithCommas(calcPrice()?.total)}</span>
							</div>
							<div style={{ width: "205px" }} />
						</div>
						<TableStyledAntd
							style={{ marginTop: "8px" }}
							rowKey="id"
							dataSource={listBillCheck}
							bordered
							pagination={false}
							columns={columnsDataCheck2({ changeRealQty, removeProduct }) as any}
							widthCol1="50px"
							widthCol2="120px"
							widthCol3="180px"
							widthCol4="15%"
							widthCol5="15%"
							widthCol6="15%"
							widthCol7="15%"
							widthCol8="250px"
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default CODEdit;
