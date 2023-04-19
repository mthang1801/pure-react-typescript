import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_STORES } from "src/services/api/url.index";
import storesTypes from "../types/stores.types";

function* getListStoresSaga(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_STORES}`, payload.params);
    });
    yield put(actionSuccess(storesTypes.GET_LIST_STORES_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(storesTypes.GET_LIST_STORES_FAILURE, err));
  }
}

function* getStoreByIdSaga(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_STORES}/${payload.id}`, {});
    });
    yield put(actionSuccess(storesTypes.GET_STORE_BY_ID_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(storesTypes.GET_STORE_BY_ID_FAILURE, err));
  }
}

function* createOneStoreSaga(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_STORES}`, payload.params);
    });
    yield put(actionSuccess(storesTypes.CREATE_ONE_STORE_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(storesTypes.CREATE_ONE_STORE_FAILURE, err));
  }
}

function* updateOneStoreSaga(action: IAction) {
  try {
    console.log("21321321312okela");

    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_STORES}/${payload.id}`, payload.params);
    });
    yield put(actionSuccess(storesTypes.UPDATE_ONE_STORE_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(storesTypes.UPDATE_ONE_STORE_FAILURE, err));
  }
}

const storesSagas = [
  takeLatest(storesTypes.START_GET_LIST_STORES, getListStoresSaga),
  takeLatest(storesTypes.START_GET_STORE_BY_ID, getStoreByIdSaga),
  takeLatest(storesTypes.START_CREATE_ONE_STORE, createOneStoreSaga),
  takeLatest(storesTypes.START_UPDATE_ONE_STORE, updateOneStoreSaga),
];

export default storesSagas;
