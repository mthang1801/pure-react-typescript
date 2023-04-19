import { call, put, takeLatest, delay } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_INVENTORY } from "src/services/api/url.index";
import inventoryTypes from "../types/inventoryReceipts.types";

function* getListInventorySaga(action: any) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_INVENTORY}`, payload?.params);
		});
		yield put(actionSuccess(inventoryTypes.GET_LIST_INVENTORY_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(inventoryTypes.GET_LIST_INVENTORY_FAILURE, err));
	}
}

function* createOneInventorySaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_INVENTORY}`, payload.params);
		});
		yield put(actionSuccess(inventoryTypes.CREATE_INVENTORY_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(inventoryTypes.CREATE_INVENTORY_FAILURE, err));
	}
}
function* updateOneInventorySaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_INVENTORY}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(inventoryTypes.UPDATE_INVENTORY_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(inventoryTypes.UPDATE_INVENTORY_FAILURE, err));
	}
}

function* getOneInventoryByIdSaga(action: IAction) {
	try {
		const { payload } = action;

		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_INVENTORY}/${payload.id}`);
		});
		yield put(actionSuccess(inventoryTypes.GET_INVENTORY_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(inventoryTypes.GET_INVENTORY_BY_ID_FAILURE, err));
	}
}
const inventorySagas = [
	takeLatest(inventoryTypes.START_GET_LIST_INVENTORY, getListInventorySaga),
	takeLatest(inventoryTypes.START_CREATE_INVENTORY, createOneInventorySaga),
	takeLatest(inventoryTypes.START_UPDATE_INVENTORY, updateOneInventorySaga),
	takeLatest(inventoryTypes.START_GET_INVENTORY_BY_ID, getOneInventoryByIdSaga)
];

export default inventorySagas;
