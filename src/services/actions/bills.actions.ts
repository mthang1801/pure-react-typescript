import billsTypes from "./types/bills.types";
import { IAction } from "../interfaces/root.interfaces";

export const getListBill = (params?: any) => {
	const action: IAction = {
		type: billsTypes.START_GET_LIST_BILL,
		payload: { params }
	};
	return action;
};

export const getBillById = (id: any, params?: any) => {
	const action: IAction = {
		type: billsTypes.START_GET_BILL_BY_ID,
		payload: { id, params }
	};
	return action;
};
