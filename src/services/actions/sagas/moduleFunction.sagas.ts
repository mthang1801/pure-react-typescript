import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_MODULE_FUNCTIONS } from "src/services/api/url.index";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { actionFailure, actionSuccess } from "../root.actions";
import moduleFunctionTypes from "../types/moduleFunction.types";

function* fetchModuleFunctionsList(action: IAction) {
	try {
		const { payload } = action;

		const res: IRootResponse = yield call(() => api.get(`${API_URL}/${API_MODULE_FUNCTIONS}`, payload.params));
		yield put(actionSuccess(moduleFunctionTypes.FETCH_MODULE_FUNCTION_LIST_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(moduleFunctionTypes.FETCH_MODULE_FUNCTION_LIST_FAILURE, error as any));
	}
}

function* getModuleFunctionById(action: IAction) {
	try {
		const {
			payload: { id, params }
		} = action;
		const res: IRootResponse = yield call(() => api.get(`${API_URL}/${API_MODULE_FUNCTIONS}/${id}`, params));
		yield put(actionSuccess(moduleFunctionTypes.GET_MODULE_FUNCTION_BY_ID_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(moduleFunctionTypes.GET_MODULE_FUNCTION_BY_ID_FAILURE, error as any));
	}
}

function* getChildrenModuleFunctionById(action: IAction) {
	try {
		const {
			payload: { id, params }
		} = action;
		const res: IRootResponse = yield call(() => api.get(`${API_URL}/${API_MODULE_FUNCTIONS}/${id}/children`, params));
		yield put(actionSuccess(moduleFunctionTypes.GET_CHILDREN_MODULE_FUNCTION_BY_ID_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(moduleFunctionTypes.GET_CHILDREN_MODULE_FUNCTION_BY_ID_FAILURE, error as any));
	}
}

function* updateModuleFunction(action: IAction) {
	try {
		const {
			payload: { params, id }
		} = action;
		const res: IRootResponse = yield call(() => api.put(`${API_URL}/${API_MODULE_FUNCTIONS}/${id}`, params));
		yield put(actionSuccess(moduleFunctionTypes.UPDATE_MODULE_FUNCTION_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(moduleFunctionTypes.UPDATE_MODULE_FUNCTION_FAILURE, error as any));
	}
}

function* createModuleFunction(action: IAction) {
	try {
		const {
			payload: { params }
		} = action;
		const res: IRootResponse = yield call(() => api.post(`${API_URL}/${API_MODULE_FUNCTIONS}`, params));
		yield put(actionSuccess(moduleFunctionTypes.CREATE_MODULE_FUNCTION_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(moduleFunctionTypes.CREATE_MODULE_FUNCTION_FAILURE, error as any));
	}
}
function* updateModuleFunctionIndexes(action: IAction) {
	try {
		const {
			payload: { params }
		} = action;
		console.log(72,params)
		const res: IRootResponse = yield call(() => api.put(`${API_URL}/${API_MODULE_FUNCTIONS}/update-indexes`, params));
		yield put(actionSuccess(moduleFunctionTypes.UPDATE_MODULE_FUNCTION_INDEXES_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(moduleFunctionTypes.UPDATE_MODULE_FUNCTION_INDEXES_FAILURE, error as any));
	}
}

export default [
	takeLatest(moduleFunctionTypes.FETCH_MODULE_FUNCTION_LIST_START, fetchModuleFunctionsList),
	takeLatest(moduleFunctionTypes.GET_MODULE_FUNCTION_BY_ID_START, getModuleFunctionById),
	takeLatest(moduleFunctionTypes.GET_CHILDREN_MODULE_FUNCTION_BY_ID_START, getChildrenModuleFunctionById),
	takeLatest(moduleFunctionTypes.UPDATE_MODULE_FUNCTION_START, updateModuleFunction),
	takeLatest(moduleFunctionTypes.UPDATE_MODULE_FUNCTION_INDEXES_START, updateModuleFunctionIndexes),
	takeLatest(moduleFunctionTypes.CREATE_MODULE_FUNCTION_START, createModuleFunction),
];
