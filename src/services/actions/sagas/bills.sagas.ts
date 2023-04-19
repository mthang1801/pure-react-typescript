import { call, put, takeLatest, delay } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import billsTypes from "../types/bills.types";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_BILL } from "src/services/api/url.index";

function* getListBillsSaga(action: any) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_BILL}`, payload?.params);
		});
		yield put(actionSuccess(billsTypes.GET_LIST_BILL_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(billsTypes.GET_LIST_BILL_FAILURE, err));
	}
}

function* getOneBillsByIdSaga(action: IAction) {
	try {
		const { payload } = action;
		console.log("ok");
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_BILL}/${payload.id}`);
		});
		yield put(actionSuccess(billsTypes.GET_BILL_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(billsTypes.GET_BILL_BY_ID_FAILURE, err));
	}
}

const billsSagas = [
	takeLatest(billsTypes.START_GET_LIST_BILL, getListBillsSaga),
	takeLatest(billsTypes.START_GET_BILL_BY_ID, getOneBillsByIdSaga)
];

export default billsSagas;
