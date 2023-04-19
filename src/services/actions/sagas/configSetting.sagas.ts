import { call, put, takeLatest, delay } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import configTypes from "../types/configSetting.types";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_CONFIGS } from "src/services/api/url.index";

function* getListCatalogsSaga(action: any) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_CONFIGS}`, payload?.params);
		});
		yield put(actionSuccess(configTypes.GET_LIST_CONFIGS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(configTypes.GET_LIST_CONFIGS_FAILURE, err));
	}
}

function* createOneCatalogsSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_CONFIGS}`, payload.params);
		});
		yield put(actionSuccess(configTypes.CREATE_CONFIGS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(configTypes.CREATE_CONFIGS_FAILURE, err));
	}
}
function* updateOneCatalogsSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_CONFIGS}`, payload.params);
		});
		yield put(actionSuccess(configTypes.UPDATE_CONFIGS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(configTypes.UPDATE_CONFIGS_FAILURE, err));
	}
}
function* getOneCatalogsByIdSaga(action: IAction) {
	try {
		const { payload } = action;

		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_CONFIGS}/${payload.params.id}`);
		});
		yield put(actionSuccess(configTypes.GET_CONFIGS_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(configTypes.GET_CONFIGS_BY_ID_FAILURE, err));
	}
}

const configsSagas = [
	takeLatest(configTypes.START_GET_LIST_CONFIGS, getListCatalogsSaga),
	takeLatest(configTypes.START_CREATE_CONFIGS, createOneCatalogsSaga),
	takeLatest(configTypes.START_UPDATE_CONFIGS, updateOneCatalogsSaga),
	takeLatest(configTypes.START_GET_CONFIGS_BY_ID, getOneCatalogsByIdSaga)
];

export default configsSagas;
