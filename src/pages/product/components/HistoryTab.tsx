import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "src/types";
import { columnsHistoryData } from "./data";

const HistoryTab = () => {
	const { stateGetProductLogs } = useSelector((e: AppState) => e.productReducer);

	return (
		<div className="productPage__create__form__history" style={{ marginTop: "13px" }}>
			<h4>Lịch sử</h4>
			<Table
				rowKey="id"
				dataSource={stateGetProductLogs?.data?.data || []}
				bordered
				columns={columnsHistoryData() as any}
			/>
		</div>
	);
};

export default HistoryTab;
