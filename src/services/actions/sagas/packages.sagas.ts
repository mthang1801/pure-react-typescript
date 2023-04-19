import { call, put, takeLatest, delay } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import packagesTypes from "../types/packages.types";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_PACKAGES } from "src/services/api/url.index";

function* getListCatalogsSaga(action: any) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_PACKAGES}`, payload?.params);
		});
		yield put(actionSuccess(packagesTypes.GET_LIST_PACKAGES_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(packagesTypes.GET_LIST_PACKAGES_FAILURE, err));
	}
}

function* createOneCatalogsSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_PACKAGES}`, payload.params);
		});
		yield put(actionSuccess(packagesTypes.CREATE_PACKAGES_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(packagesTypes.CREATE_PACKAGES_FAILURE, err));
	}
}
function* updateOneCatalogsSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_PACKAGES}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(packagesTypes.UPDATE_PACKAGES_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(packagesTypes.UPDATE_PACKAGES_FAILURE, err));
	}
}

function* getOneCatalogsByIdSaga(action: IAction) {
	try {
		const { payload } = action;

		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_PACKAGES}/${payload.id}`);
		});
		yield put(actionSuccess(packagesTypes.GET_PACKAGES_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(packagesTypes.GET_PACKAGES_BY_ID_FAILURE, err));
	}
}

const packageSagas = [
	takeLatest(packagesTypes.START_GET_LIST_PACKAGES, getListCatalogsSaga),
	takeLatest(packagesTypes.START_CREATE_PACKAGES, createOneCatalogsSaga),
	takeLatest(packagesTypes.START_UPDATE_PACKAGES, updateOneCatalogsSaga),
	takeLatest(packagesTypes.START_GET_PACKAGES_BY_ID, getOneCatalogsByIdSaga)
];

export default packageSagas;
