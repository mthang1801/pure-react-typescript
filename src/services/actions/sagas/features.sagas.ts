import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_SUPPLIERS } from "src/services/api/url.index";
import suppliersTypes from "../types/suppliers.types";

function* getListSuppliersSaga(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_SUPPLIERS}`, payload.params);
    });
    yield put(actionSuccess(suppliersTypes.GET_LIST_SUPPLIERS_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(suppliersTypes.GET_LIST_SUPPLIERS_FAILURE, err));
  }
}

function* getSupplierByIdSaga(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_SUPPLIERS}/${payload.id}`, {});
    });
    yield put(actionSuccess(suppliersTypes.GET_SUPPLIERS_BY_ID_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(suppliersTypes.GET_SUPPLIERS_BY_ID_FAILURE, err));
  }
}

function* createOneSupplierSaga(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_SUPPLIERS}`, payload.params);
    });
    yield put(actionSuccess(suppliersTypes.CREATE_ONE_SUPPLIERS_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(suppliersTypes.CREATE_ONE_SUPPLIERS_FAILURE, err));
  }
}

function* updateOneSupplierSaga(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(
        `${API_URL}/${API_SUPPLIERS}/${payload.id}`,
        payload.params
      );
    });
    yield put(actionSuccess(suppliersTypes.UPDATE_ONE_SUPPLIERS_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(suppliersTypes.UPDATE_ONE_SUPPLIERS_FAILURE, err));
  }
}

const suppliersSagas = [
  takeLatest(suppliersTypes.START_GET_LIST_SUPPLIERS, getListSuppliersSaga),
  takeLatest(suppliersTypes.START_GET_SUPPLIERS_BY_ID, getSupplierByIdSaga),
  takeLeading(suppliersTypes.START_CREATE_ONE_SUPPLIERS, createOneSupplierSaga),
  takeLatest(suppliersTypes.START_UPDATE_ONE_SUPPLIERS, updateOneSupplierSaga),
];

export default suppliersSagas;
