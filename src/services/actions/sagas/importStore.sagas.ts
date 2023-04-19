import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_IMPORT } from "src/services/api/url.index";
import importStoreTypes from "../types/importStore.types";

function* getListImportSaga(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_IMPORT}`, payload.params);
    });
    yield put(actionSuccess(importStoreTypes.GET_LIST_IMPORT_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(importStoreTypes.GET_LIST_IMPORT_FAILURE, err));
  }
}

function* getImportByIdSaga(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.get(`${API_URL}/${API_IMPORT}/${payload.id}`, {});
    });
    yield put(actionSuccess(importStoreTypes.GET_IMPORT_BY_ID_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(importStoreTypes.GET_IMPORT_BY_ID_FAILURE, err));
  }
}

function* createOneImportSaga(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_IMPORT}`, payload.params);
    });
    yield put(actionSuccess(importStoreTypes.CREATE_ONE_IMPORT_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(importStoreTypes.CREATE_ONE_IMPORT_FAILURE, err));
  }
}

function* updateOneImportSaga(action: IAction) {
  try {
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.put(`${API_URL}/${API_IMPORT}/${payload.id}`, payload.params);
    });
    yield put(actionSuccess(importStoreTypes.UPDATE_ONE_IMPORT_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(importStoreTypes.UPDATE_ONE_IMPORT_FAILURE, err));
  }
}

const importSagas = [
  takeLatest(importStoreTypes.START_GET_LIST_IMPORT, getListImportSaga),
  takeLatest(importStoreTypes.START_GET_IMPORT_BY_ID, getImportByIdSaga),
  takeLeading(importStoreTypes.START_CREATE_ONE_IMPORT, createOneImportSaga),
  takeLatest(importStoreTypes.START_UPDATE_ONE_IMPORT, updateOneImportSaga),
];

export default importSagas;
