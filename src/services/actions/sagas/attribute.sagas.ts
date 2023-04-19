import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_ATTRIBUTES_LIST } from "src/services/api/url.index";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { actionFailure, actionSuccess } from "../root.actions";
import attributeTypes from "../types/attribute.types";

function* fetchAttributesList(action: IAction) {
	try {
		const { payload } = action;

		const res: IRootResponse = yield call(() => api.get(`${API_URL}/${API_ATTRIBUTES_LIST}`, payload.params));
		yield put(actionSuccess(attributeTypes.FETCH_ATTRIBUTES_LIST_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(attributeTypes.FETCH_ATTRIBUTES_LIST_FAILURE, error as any));
	}
}

function* getAttributeById(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => api.get(`${API_URL}/${API_ATTRIBUTES_LIST}/${payload.id}`));
		yield put(actionSuccess(attributeTypes.GET_ATTRIBUTE_BY_ID_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(attributeTypes.GET_ATTRIBUTE_BY_ID_FAILURE, error as any));
	}
}

function* updateAttribute(action: IAction) {
	try {
		const {
			payload: { params, id }
		} = action;
		const res: IRootResponse = yield call(() => api.put(`${API_URL}/${API_ATTRIBUTES_LIST}/${id}`, params));
		yield put(actionSuccess(attributeTypes.UPDATE_ATTRIBUTE_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(attributeTypes.UPDATE_ATTRIBUTE_FAILURE, error as any));
	}
}

function* updateAttributeStatus(action: IAction) {
	try {
		const {
			payload: { params, id }
		} = action;
		const res: IRootResponse = yield call(() =>
			api.put(`${API_URL}/${API_ATTRIBUTES_LIST}/${id}/update-status`, params)
		);
		yield put(actionSuccess(attributeTypes.UPDATE_ATTRIBUTE_STATUS_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(attributeTypes.UPDATE_ATTRIBUTE_STATUS_FAILURE, error as any));
	}
}

function* createAttributue(action: IAction) {
	try {
		const {
			payload: { params }
		} = action;
		const res: IRootResponse = yield call(() => api.post(`${API_URL}/${API_ATTRIBUTES_LIST}`, params));
		yield put(actionSuccess(attributeTypes.CREATE_ATTRIBUTE_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(attributeTypes.CREATE_ATTRIBUTE_FAILURE, error as any));
	}
}

function* addCatesFeatureSaga(action: IAction) {
	try {
		const {
			payload: { id, params }
		} = action;
		const res: IRootResponse = yield call(() =>
			api.put(
				`${API_URL}/attributes/${id}/update-category
			`,
				params
			)
		);
		yield put(actionSuccess(attributeTypes.ADD_CATEGORY_FEATURES_SUCCESS, res));
	} catch (error) {
		yield put(actionFailure(attributeTypes.ADD_CATEGORY_FEATURES_FAILURE, error as any));
	}
}

export default [
	takeLatest(attributeTypes.START_ADD_CATEGORY_FEATURES, addCatesFeatureSaga),

	takeLatest(attributeTypes.FETCH_ATTRIBUTES_LIST_START, fetchAttributesList),
	takeLatest(attributeTypes.GET_ATTRIBUTE_BY_ID_START, getAttributeById),
	takeLatest(attributeTypes.UPDATE_ATTRIBUTE_START, updateAttribute),
	takeLatest(attributeTypes.CREATE_ATTRIBUTE_START, createAttributue),
	takeLatest(attributeTypes.UPDATE_ATTRIBUTE_STATUS_START, updateAttributeStatus)
];
