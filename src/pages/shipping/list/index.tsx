import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "src/components/notification";
import OverlaySpinner from "src/components/overlaySpinner/OverlaySpinner";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import SubHeader from "src/components/subHeader/SubHeader";
import TableStyledAntd from "src/components/table/TableStyled";
import { getListShipping, updateOneShipping } from "src/services/actions/shipping.actions";
import { getListSuppliers, updateOneSuppliers } from "src/services/actions/suppliers.actions";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { AppState } from "src/types";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import ConnectNTL from "../\bcomponents/ConnectNTL";
import DetailsNTL from "../\bcomponents/DetailsNTL";
import { columnsData, columnsDataAdmin } from "./data";
const deliveryServiceNTL = [
	{ label: "Chuyển phát nhanh", value: 10 },
	{ label: "Đường bộ", value: 20 },
	{ label: "Hỏa tốc", value: 11 },
	{ label: "MES", value: 21 }
];

const paymentMethodNTL = [
	{ label: "Người gửi thanh toán ngay", value: 10 },
	{ label: "Người gửi thanh toán sau", value: 11 },
	{ label: "Người nhận thanh toán ngay", value: 20 }
];
const ShippingList = () => {
	const isMount = useIsMount();
	const dispatch = useDispatch();
	const [formConnect] = Form.useForm();
	const [formInfo] = Form.useForm();
	const [paramsFilter, setParamsFilter] = useState<any>({
		q: undefined,
		status: undefined,
		page: 1,
		limit: 10
	});
	const userType = localStorage.getItem("ACCOUNT") ? JSON.parse(localStorage.getItem("ACCOUNT") || "")?.user_type : "";

	const [isModalOpen, setIsModalOpen] = useState<any>(false);
	const [unit, setUnit] = useState<any>();
	const [dataInfo, setDataInfo] = useState<any>(undefined);
	const [openInfo, setOpenInfo] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const { stateListShipping, stateUpdateOneShipping } = useSelector((state: AppState) => state.shippingReducer);

	useEffect(() => {
		if (!stateUpdateOneShipping.isLoading) {
			let params = { ...paramsFilter };
			if (userType !== "admin") {
				params.status = true;
			}
			dispatch(getListShipping(params));
		}
	}, [paramsFilter, stateUpdateOneShipping.isLoading]);

	useEffect(() => {
		if (isMount) return;
		const { success, data, isLoading, error } = stateUpdateOneShipping;
		if (!isLoading) {
			if (success) {
				notifySuccess("Cập nhật thành công!");
			} else if (success === false || error) {
				notifyError("Cập nhật thất bại!");
			}
		}
	}, [stateUpdateOneShipping.isLoading]);

	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			...paramsFilter,

			page: page,
			limit: pageSize
		});
	};

	const editCallback = (record: any) => {
		setIsModalOpen(true);
		setUnit(record);
	};

	const changeStatus = (value: any, record: any) => {
		dispatch(updateOneShipping(record.id, { status: value }));
	};

	const editInfo = (record: any) => {
		setDataInfo(record);
		setOpenInfo(true);
	};

	const submitConnect = async (values: any) => {
		try {
			// let services = deliveryServiceNTL.map((x: any) => {
			// 	return { id: x.value, status: false };
			// });
			// let payments = paymentMethodNTL.map((x: any) => {
			// 	return { id: x.value, status: false };
			// });
			// console.log(services, values?.delivery_service_ids);
			// for (let i = 0; i < services.length; i++) {
			// 	if (values?.delivery_service_ids.includes(services[i]?.id)) {
			// 		services[i].status = true;
			// 	}
			// }
			// for (let i = 0; i < payments.length; i++) {
			// 	if (values?.payment_method_ids?.includes(payments[i]?.id)) {
			// 		payments[i].status = true;
			// 	}
			// }
			let params = { ...values };
			const response = (await api.put(`${API_URL}/shipping-units/ntl/connect`, params)) as any;

			if (response.success) {
				if (isModalOpen) {
					notifySuccess("Kết nối thành công!");
				}
				if (openInfo) {
					notifySuccess("Cập nhật thành công!");
				}
				setIsModalOpen(false);
				setOpenInfo(false);
				formConnect.resetFields();
				formInfo.resetFields();
				let params = { ...paramsFilter };
				if (userType !== "admin") {
					params.status = true;
				}
				dispatch(getListShipping(params));
			}
		} catch (error: any) {
			notifyError(error?.message + "");
			throw new Error(error?.message);
		}
	};
	const disconnectCallback = async (values: any) => {
		try {
			const response = (await api.put(`${API_URL}/shipping-units/${values?.id}/disconnect`)) as any;

			if (response.success) {
				notifySuccess("Ngắt kết nối thành công!");
				setOpenInfo(false);
				setOpenDelete(false);
				setDataInfo(undefined);

				let params = { ...paramsFilter };
				if (userType !== "admin") {
					params.status = true;
				}
				dispatch(getListShipping(params));
			}
		} catch (error: any) {
			notifyError(error.response.data.message + "");

			throw new Error(error.response.data.message);
		}
	};

	const closeModalCallback = () => {
		setDataInfo(undefined);
		setOpenInfo(false);
	};

	const submitUpdateCallback = (values: any) => {
		submitConnect(values);
	};

	const deleteCallback = (record: any) => {
		setDataInfo(record);
		setOpenInfo(false);
		setOpenDelete(true);
	};
	return (
		<div className="mainPages supplierList">
			<OverlaySpinner text="Đang xử lý..." open={stateUpdateOneShipping.isLoading} />
			<Modal title="Kết nối đối tác" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} centered>
				{unit?.shipping_unit === "Nhất Tín Logistics" && (
					<ConnectNTL formConnect={formConnect} submitConnectCallback={submitConnect} />
				)}
			</Modal>
			<Modal
				title="Xác nhận ngắt kết nối"
				open={openDelete}
				onCancel={() => {
					setDataInfo(undefined);
					setOpenDelete(false);
				}}
				footer={null}
				centered
			>
				<span style={{ fontWeight: "600" }}>
					Xác nhận ngắt kết nối đối tác vận chuyển <span style={{ color: "red" }}>{dataInfo?.shipping_unit}</span>
				</span>
				<div
					style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "8px", width: "100%" }}
				>
					<div className="searchButton" style={{ marginRight: "8px" }} onClick={() => setOpenDelete(false)}>
						Trở lại
					</div>
					<div className="defaultButton" onClick={() => disconnectCallback(dataInfo)}>
						Xác nhận
					</div>
				</div>
			</Modal>
			{openInfo && (
				<Modal
					title={
						<div onClick={() => console.log(dataInfo, openInfo)}>
							Chi tiết kết nối {dataInfo?.connect_status && <span className="completeStatus">Đã kết nối</span>}
						</div>
					}
					open={openInfo}
					onCancel={() => {
						setDataInfo(undefined);
						setOpenInfo(false);
						formInfo.resetFields();
					}}
					footer={null}
					centered
				>
					<DetailsNTL
						formInfo={formInfo}
						record={dataInfo}
						openStatus={openInfo}
						closeModalCallback={closeModalCallback}
						disconnectCallback={deleteCallback}
						submitUpdateCallback={submitUpdateCallback}
					/>
				</Modal>
			)}

			<SubHeader breadcrumb={[{ text: "Cấu hình vận chuyển" }, { text: "Kết nối đối tác vận chuyển" }]} />
			<div className="contentSection" style={{ margin: "0" }}>
				<TableStyledAntd
					rowKey="id"
					dataSource={stateListShipping?.data?.data || []}
					bordered
					pagination={false}
					loading={stateListShipping.isLoading}
					columns={
						userType === "admin"
							? columnsDataAdmin({ changeStatus })
							: columnsData({ editInfo, editCallback, deleteCallback })
					}
					widthCol1="100px"
					widthCol2="calc(25% - 25px)"
					widthCol3="calc(25% - 25px)"
					widthCol4="calc(25% - 25px)"
					widthCol5="calc(25% - 25px)"
				/>

				{/* <PanigationAntStyled
          style={{ marginTop: "8px" }}
          current={paramsFilter.page}
          pageSize={paramsFilter.limit}
          showSizeChanger
          onChange={onChangePaging}
          showTotal={() =>
            `Tổng ${stateListShipping?.data?.paging.total} đối tác `
          }
          total={stateListShipping?.data?.paging.total}
        /> */}
			</div>
		</div>
	);
};

export default ShippingList;
