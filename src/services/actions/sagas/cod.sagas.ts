import { call, put, takeLatest, delay } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_COD } from "src/services/api/url.index";
import codTypes from "../types/cod.types";

function* getListCodSaga(action: any) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_COD}`, payload?.params);
		});
		yield put(actionSuccess(codTypes.GET_LIST_COD_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(codTypes.GET_LIST_COD_FAILURE, err));
	}
}

function* createOneCodSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_COD}`, payload.params);
		});
		yield put(actionSuccess(codTypes.CREATE_COD_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(codTypes.CREATE_COD_FAILURE, err));
	}
}
function* updateOneCodSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_COD}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(codTypes.UPDATE_COD_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(codTypes.UPDATE_COD_FAILURE, err));
	}
}

function* getOneCodByIdSaga(action: IAction) {
	try {
		const { payload } = action;

		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_COD}/${payload.id}`);
		});
		yield put(actionSuccess(codTypes.GET_COD_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(codTypes.GET_COD_BY_ID_FAILURE, err));
	}
}
const codSagas = [
	takeLatest(codTypes.START_GET_LIST_COD, getListCodSaga),
	takeLatest(codTypes.START_CREATE_COD, createOneCodSaga),
	takeLatest(codTypes.START_UPDATE_COD, updateOneCodSaga),
	takeLatest(codTypes.START_GET_COD_BY_ID, getOneCodByIdSaga)
];

export default codSagas;
