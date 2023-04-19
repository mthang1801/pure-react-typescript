import { put, takeLeading } from "redux-saga/effects";
import { IAction } from "../../interfaces/root.interfaces";
import globalTypes from "../types/global.types";

function* putSignIn(action: IAction) {
  const { payload } = action;
  yield put({
    type: globalTypes.PUT_SIGN_IN_APP_SUCCESS,
    payload: { data: payload.data },
  });
}

const globalSagas = [takeLeading(globalTypes.START_PUT_SIGN_IN_APP, putSignIn)];
export default globalSagas;
