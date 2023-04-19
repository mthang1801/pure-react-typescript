import axios, { AxiosResponse } from "axios";
import {
  call,
  put,
  takeEvery,
  takeLatest,
  delay,
  all,
  takeLeading,
} from "redux-saga/effects";
import { API_URL } from "../../api/config";
import {
  IAction,
  IStateResponse,
  IRootResponse,
  ICatchError,
  IActionResponse,
} from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import accountTypes from "../types/account.types";
import { actionFailure, actionSuccess } from "../root.actions";
import { API_LOGIN, API_LOGIN_GOOGLE, API_REGISTER } from "src/services/api/url.index";
import { STORAGE_SERVICE } from "src/utils/localStorage";

function* signInAccount(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_LOGIN}`, payload.params);
    });
    yield put(actionSuccess(accountTypes.SIGNIN_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(accountTypes.SIGNIN_FAILURE, err));
  }
}

function* registerAccount(action: IAction) {
  try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_REGISTER}`, payload.params);
    });
    yield put(actionSuccess(accountTypes.REGISTER_SUCCESS, res));
  } catch (err: ICatchError | any) {
    yield put(actionFailure(accountTypes.REGISTER_FAILURE, err));
  }
}

function* signOut(action: IAction) {
  if (action.payload.params.history) {
    action.payload.params.history.push("/sign-in");
    localStorage.removeItem(STORAGE_SERVICE.AUTH_UUID);
    localStorage.removeItem(STORAGE_SERVICE.TOKEN);
    localStorage.removeItem(STORAGE_SERVICE.ACCOUNT);
		localStorage.removeItem(STORAGE_SERVICE.FEATURES)
    let _dataUser = JSON.parse(
      localStorage.getItem(STORAGE_SERVICE.ACCOUNT_LOGIN) || ""
    )?.username;
    localStorage.clear();
    localStorage.setItem(
      STORAGE_SERVICE.ACCOUNT_LOGIN,
      JSON.stringify({ username: _dataUser })
    );
  }
}

function* signInGoogle(action: IAction){
	try {
    // yield delay(500, true);
    const { payload } = action;
    const res: IRootResponse = yield call(() => {
      return api.post(`${API_URL}/${API_LOGIN_GOOGLE}`, payload.params);
    });
    yield put(actionSuccess(accountTypes.SIGNIN_GOOGLE_SUCCESS, res));
  } catch (err: any) {
    yield put(actionFailure(accountTypes.SIGNIN_GOOGLE_FAILURE, err));
  }
}

const accountSagas = [
  takeLatest(accountTypes.SIGN_OUT, signOut),
  takeLeading(accountTypes.START_SIGNIN, signInAccount),
  takeLatest(accountTypes.START_REGISTER, registerAccount),
  takeLatest(accountTypes.SIGNIN_GOOGLE_START, signInGoogle),
];

export default accountSagas;
