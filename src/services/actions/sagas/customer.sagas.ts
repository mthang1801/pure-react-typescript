import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "src/services/api/api.index";
import { API_URL } from "src/services/api/config";
import { API_CUSTOMER } from "src/services/api/url.index";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { actionFailure, actionSuccess } from "../root.actions";
import customerTypes from "../types/customer.types";

function* fetchCustomersList(action: IAction) {
	try {
		const {
			payload: { params }
		} = action;
		console.log(14, params)
		const res: IRootResponse = yield call(() => api.get(`${API_URL}/${API_CUSTOMER}`, params));
		yield put(actionSuccess(customerTypes.FETCH_CUSTOMERS_LIST_SUCCESS, res));
	} catch (error: any) {
		yield put(actionFailure(customerTypes.FETCH_CUSTOMERS_LIST_FAILURE, error));
	}
}

function* createCustomer(action : IAction) {
	try {
		const {
			payload: { params }
		} = action;
		const res: IRootResponse = yield call(() => api.post(`${API_URL}/${API_CUSTOMER}`, params));
		yield put(actionSuccess(customerTypes.CREATE_CUSTOMER_SUCCESS, res));
	} catch (error : any) {
		yield put(actionFailure(customerTypes.CREATE_CUSTOMER_FAILURE, error));
	}
}

function* getCustomerById(action : IAction){
	try {
		const {payload : {id}} = action; 
		const res : IRootResponse = yield call(() => api.get(`${API_URL}/${API_CUSTOMER}/${id}`));
		yield put(actionSuccess(customerTypes.GET_CUSTOMER_BY_ID_SUCCESS, res))
	} catch (error : any) {
		yield put(actionFailure(customerTypes.GET_CUSTOMER_BY_ID_FAILURE, error));
	}
}

function* updateCustomer(action: IAction){
	try {
		const {payload : {id, params}} = action; 
		const res : IRootResponse = yield call(() => api.put(`${API_URL}/${API_CUSTOMER}/${id}`, params));
		yield put(actionSuccess(customerTypes.UPDATE_CUSTOMER_SUCCESS, res))
	} catch (error : any) {
		yield put(actionFailure(customerTypes.UPDATE_CUSTOMER_FAILURE, error));
	}
}

export default [
	takeLatest(customerTypes.FETCH_CUSTOMERS_LIST_START, fetchCustomersList),
	takeLatest(customerTypes.CREATE_CUSTOMER_START, createCustomer),
	takeLatest(customerTypes.GET_CUSTOMER_BY_ID_START, getCustomerById),
	takeLatest(customerTypes.UPDATE_CUSTOMER_START, updateCustomer)
];
