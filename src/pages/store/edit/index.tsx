import { Form, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SubHeader from "src/components/subHeader/SubHeader";
import { getStoreById } from "src/services/actions/stores.actions";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import { AppState } from "src/types";
import { columnsData } from "./data";
import TableStyledAntd from "src/components/table/TableStyled";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
import { notifyError, notifyWarning } from "src/components/notification";

const StoreEdit = () => {
	const isMount = useIsMount();
	const history = useHistory() as any;
	const paramsURL = useParams() as any;
	const dispatch = useDispatch();
	const { stateStoreById } = useSelector((state: AppState) => state.storesReducer);
	const [formInfo] = Form.useForm();
	const [listData, setListData] = useState<any[]>([]);
	const features = localStorage.getItem("FEATURES") ? JSON.parse(localStorage.getItem("FEATURES") || "") : [];

	useEffect(() => {
		if (!features.includes("MODULE_PRODUCTS__STORES__VIEW_DETAIL")) {
			notifyWarning("Bạn không được quyền truy cập");
			history.push("/stores");
		} else {
			dispatch(getStoreById(paramsURL.id));
		}
	}, [paramsURL.id]);

	useEffect(() => {
		if (isMount) return;
		const { data, success, isLoading, error } = stateStoreById;
		if (!isLoading) {
			if (success) {
				console.log(data);
				formInfo.setFieldsValue({
					id: data?.data?.warehouse?.warehouse_code,
					warehouse_name: data?.data?.warehouse?.warehouse_name,
					phone: data?.data?.warehouse?.phone,
					full_address: data?.data?.warehouse?.full_address
				});
				let listFake = [];
				for (let i = 0; i < stateStoreById?.data?.data?.product_inventory?.length; i++) {
					listFake.push({
						...stateStoreById?.data?.data?.product_inventory[i]?.product,
						qty: stateStoreById?.data?.data?.product_inventory[i]?.qty
					});
				}
				setListData(listFake);
			} else if (success === false || error) {
				notifyError("Lấy thông tin kho thất bại");
			}
		}
	}, [stateStoreById.isLoading]);

	console.log(stateStoreById?.data?.product_inventory);
	return (
		<div className="mainPages ordersPage">
			<SubHeader
				breadcrumb={[
					{ text: "Quản lý sản phẩm" },
					{ text: "Quản lý kho", link: "/stores" },
					{ text: "Chi tiết tồn kho" }
				]}
			/>
			<div style={{ background: "#fff", padding: "16px", borderRadius: "5px" }}>
				<h4>Thông tin kho</h4>
				<Form
					form={formInfo}
					id="formInfo"
					layout="vertical"
					style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}
				>
					<Form.Item label="Mã kho" style={{ width: "calc((100% - 16px) / 3)", margin: "0" }} name="id">
						<Input className="defaultInput" disabled />
					</Form.Item>
					<Form.Item label="Tên kho" style={{ width: "calc((100% - 16px) / 3)", margin: "0" }} name="warehouse_name">
						<Input className="defaultInput" disabled />
					</Form.Item>

					<Form.Item label="Số điện thoại" style={{ width: "calc((100% - 16px) / 3)", margin: "0" }} name="phone">
						<Input className="defaultInput" disabled />
					</Form.Item>
					<Form.Item label="Địa chỉ" style={{ width: "100%", margin: "4px 0 0 0" }} name="full_address">
						<Input className="defaultInput" disabled />
					</Form.Item>
				</Form>
			</div>
			<div className="contentSection">
				<h4>Danh sách tồn kho</h4>
				<TableStyledAntd
					rowKey="supplier_id"
					bordered
					dataSource={listData}
					pagination={false}
					loading={stateStoreById.isLoading || false}
					columns={columnsData()}
				/>
			</div>
		</div>
	);
};

export default StoreEdit;
