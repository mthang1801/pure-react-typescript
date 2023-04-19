import { call, put, takeLatest, delay } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import catalogsTypes from "../types/catalogs.types";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_CATALOGS } from "src/services/api/url.index";

function* getListCatalogsSaga(action: any) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_CATALOGS}`, payload?.params);
		});
		yield put(actionSuccess(catalogsTypes.GET_LIST_CATALOGS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(catalogsTypes.GET_LIST_CATALOGS_FAILURE, err));
	}
}

function* createOneCatalogsSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_CATALOGS}`, payload.params);
		});
		yield put(actionSuccess(catalogsTypes.CREATE_CATALOGS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(catalogsTypes.CREATE_CATALOGS_FAILURE, err));
	}
}
function* updateOneCatalogsSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_CATALOGS}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(catalogsTypes.UPDATE_CATALOGS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(catalogsTypes.UPDATE_CATALOGS_FAILURE, err));
	}
}

function* updateStatusCategoryCatalogsSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_CATALOGS}/category/${payload.id}/update-status`, payload.params);
		});
		yield put(actionSuccess(catalogsTypes.UPDATE_STATUS_CATEGORY_CATALOGS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(catalogsTypes.UPDATE_STATUS_CATEGORY_CATALOGS_FAILURE, err));
	}
}

function* getOneCatalogsByIdSaga(action: IAction) {
	try {
		const { payload } = action;

		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_CATALOGS}/${payload.params.id}`);
		});
		yield put(actionSuccess(catalogsTypes.GET_CATALOGS_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(catalogsTypes.GET_CATALOGS_BY_ID_FAILURE, err));
	}
}

function* updateIndexCatalogSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_CATALOGS}/update-indexes`, payload.params);
		});
		yield put(actionSuccess(catalogsTypes.UPDATE_INDEX_CATALOG_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(catalogsTypes.UPDATE_INDEX_CATALOG_FAILURE, err));
	}
}
const catalogsSagas = [
	takeLatest(catalogsTypes.START_UPDATE_STATUS_CATEGORY_CATALOGS, updateStatusCategoryCatalogsSaga),
	takeLatest(catalogsTypes.START_UPDATE_INDEX_CATALOG, updateIndexCatalogSaga),

	takeLatest(catalogsTypes.START_GET_LIST_CATALOGS, getListCatalogsSaga),
	takeLatest(catalogsTypes.START_CREATE_CATALOGS, createOneCatalogsSaga),
	takeLatest(catalogsTypes.START_UPDATE_CATALOGS, updateOneCatalogsSaga),
	takeLatest(catalogsTypes.START_GET_CATALOGS_BY_ID, getOneCatalogsByIdSaga)
];

export default catalogsSagas;
