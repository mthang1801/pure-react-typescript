import { IRootState } from "./root.interfaces";

export interface IOrdersState {
	stateListOrder: IRootState;
	stateOrderById: IRootState;
	stateCreateOneOrder: IRootState;
	stateUpdateOneOrder: IRootState;
	stateHistoryOrderById: IRootState;
	stateSyncAllOrder: IRootState;
	stateUpdateOrderByIdWithMethod: IRootState;
	stateGetPreOrders: IRootState;
	stateGetPreOrdersById: IRootState;
	stateUpdateOrdersStatus: IRootState;
}
