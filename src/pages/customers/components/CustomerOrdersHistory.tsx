import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { notifyError } from "src/components/notification";
import PanigationAntStyled from "src/components/panigation/PanigationAntStyled";
import TableStyledAntd from "src/components/table/TableStyled";
import { getListOrders } from "src/services/actions/orders.actions";
import { AppState } from "src/types";
import { columnsData, data } from "../edit/data";
const CustomerOrderHistory = () => {
	const paramsURL = useParams() as any;
	const dispatch = useDispatch();
	const [paramsFilter, setParamsFilter] = useState<any>({
		page: 1,
		limit: 20
	});
	const { stateListOrder } = useSelector((e: AppState) => e.ordersReducer);

	useEffect(() => {
		dispatch(getListOrders({ customer_id: paramsURL.id }));
	}, []);
	const onChangePaging = (page: number, pageSize: number) => {
		setParamsFilter({
			...paramsFilter,

			page: page,
			limit: pageSize
		});
	};
	return (
		<div>
			<TableStyledAntd
				row_key="code"
				dataSource={stateListOrder?.data?.data}
				bordered
				rowSelection={false}
				pagination={false}
				columns={columnsData() as any}
			/>
			<PanigationAntStyled
				style={{ marginTop: "8px" }}
				current={paramsFilter.page}
				pageSize={paramsFilter.limit}
				showSizeChanger
				onChange={onChangePaging}
				showTotal={() => `Tổng 0 đơn hàng`}
				total={0}
			/>
		</div>
	);
};

export default CustomerOrderHistory;
