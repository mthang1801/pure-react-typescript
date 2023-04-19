import { call, put, takeLatest, delay } from "redux-saga/effects";
import { API_URL } from "../../api/config";
import { IAction, IRootResponse } from "../../interfaces/root.interfaces";
import { api } from "../../api/api.index";
import userTypes from "../types/user.types";
import { actionFailure, actionSuccess } from "../root.actions";
import {
	API_CRON_FUNCTIONS,
	API_FUNCTIONS,
	API_SCHEDULERS,
	API_SHOP,
	API_USER_GROUPS,
	API_USER_SYSTEM
} from "src/services/api/url.index";

function* getListUserSystem(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_USER_SYSTEM}`, payload?.params);
		});
		yield put(actionSuccess(userTypes.GET_LIST_USER_SYSTEM_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.GET_LIST_USER_SYSTEM_FAILURE, err));
	}
}

function* getUserSystemById(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_USER_SYSTEM}/${payload.id}`);
		});
		yield put(actionSuccess(userTypes.GET_USER_SYSTEM_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.GET_USER_SYSTEM_BY_ID_FAILURE, err));
	}
}

function* updateOneUserSystem(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_USER_SYSTEM}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(userTypes.UPDATE_ONE_USER_SYSTEM_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.UPDATE_ONE_USER_SYSTEM_FAILURE, err));
	}
}

function* createOneUserSystem(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_USER_SYSTEM}`, payload.params);
		});
		yield put(actionSuccess(userTypes.CREATE_ONE_USER_SYSTEM_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.CREATE_ONE_USER_SYSTEM_FAILURE, err));
	}
}

function* getListUserGroup(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_USER_GROUPS}`, payload?.params);
		});
		yield put(actionSuccess(userTypes.GET_LIST_USER_GROUPS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.GET_LIST_USER_GROUPS_FAILURE, err));
	}
}

function* getDelayListUserGroup(action: IAction) {
	try {
		yield delay(500, true);
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_USER_GROUPS}`, payload?.params);
		});
		yield put(actionSuccess(userTypes.GET_LIST_USER_GROUPS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.GET_LIST_USER_GROUPS_FAILURE, err));
	}
}

function* getUserGroupById(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_USER_GROUPS}/${payload.id}`);
		});
		yield put(actionSuccess(userTypes.GET_USER_GROUPS_BY_ID_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.GET_USER_GROUPS_BY_ID_FAILURE, err));
	}
}

function* createOneUserGroup(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_USER_GROUPS}`, payload.params);
		});
		yield put(actionSuccess(userTypes.CREATE_ONE_USER_GROUPS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.CREATE_ONE_USER_GROUPS_FAILURE, err));
	}
}

function* updateOneUserGroup(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_USER_GROUPS}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(userTypes.UPDATE_ONE_USER_GROUPS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.UPDATE_ONE_USER_GROUPS_FAILURE, err));
	}
}

function* getListUserGroupPrivilege(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/functs/all-functs`, payload?.params);
		});
		yield put(actionSuccess(userTypes.GET_LIST_USER_GROUPS_PRIVILEGE_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.GET_LIST_USER_GROUPS_PRIVILEGE_FAILURE, err));
	}
}

function* getListShopSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_SHOP}`, payload?.params);
		});
		yield put(actionSuccess(userTypes.GET_LIST_SHOP_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.GET_LIST_SHOP_FAILURE, err));
	}
}

function* getListSchedulersSaga(action: any) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_SCHEDULERS}`, payload?.params);
		});
		yield put(actionSuccess(userTypes.GET_LIST_SCHEDULERS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.GET_LIST_SCHEDULERS_FAILURE, err));
	}
}

function* createOneSchedulerSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_SCHEDULERS}`, payload.params);
		});
		yield put(actionSuccess(userTypes.CREATE_SCHEDULERS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.CREATE_SCHEDULERS_FAILURE, err));
	}
}
function* updateOneSchedulerSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_SCHEDULERS}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(userTypes.UPDATE_SCHEDULERS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.UPDATE_SCHEDULERS_FAILURE, err));
	}
}
function* getCronFunctionsSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(`${API_URL}/${API_CRON_FUNCTIONS}`, payload?.params);
		});
		yield put(actionSuccess(userTypes.GET_CRON_FUNCTIONS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.GET_CRON_FUNCTIONS_FAILURE, err));
	}
}

function* createCronFunctionsSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/${API_CRON_FUNCTIONS}`, payload.params);
		});
		yield put(actionSuccess(userTypes.CREATE_CRON_FUNCTIONS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.CREATE_CRON_FUNCTIONS_FAILURE, err));
	}
}

function* updateCronFunctionsSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_CRON_FUNCTIONS}/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(userTypes.UPDATE_CRON_FUNCTIONS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.UPDATE_CRON_FUNCTIONS_FAILURE, err));
	}
}

function* createOneShopSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/seller-platforms`, payload.params);
		});
		yield put(actionSuccess(userTypes.CREATE_SHOP_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.CREATE_SHOP_FAILURE, err));
	}
}

function* updateOneShopSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/${API_SCHEDULERS}`, payload.params);
		});
		yield put(actionSuccess(userTypes.CREATE_SCHEDULERS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.CREATE_SCHEDULERS_FAILURE, err));
	}
}

function* getShopDetailSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.get(
				`${API_URL}/seller-platforms/${payload.id}
      `,
				payload.params
			);
		});
		yield put(actionSuccess(userTypes.GET_SHOP_DETAIL_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.GET_SHOP_DETAIL_FAILURE, err));
	}
}

function* updateOneShopDetailSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/seller-platforms/configurations/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(userTypes.UPDATE_SHOP_DETAIL_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.UPDATE_SHOP_DETAIL_FAILURE, err));
	}
}

function* updateOneShopStatusSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/seller-platforms/update-status/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(userTypes.UPDATE_SHOP_STATUS_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.UPDATE_SHOP_STATUS_FAILURE, err));
	}
}

function* updateOneShopDetailPlatformSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.put(`${API_URL}/seller-platforms/schedulers/${payload.id}`, payload.params);
		});
		yield put(actionSuccess(userTypes.UPDATE_SHOP_DETAIL_FLATFORM_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.UPDATE_SHOP_DETAIL_FLATFORM_FAILURE, err));
	}
}

function* createOneShopDetailPlatformSaga(action: IAction) {
	try {
		const { payload } = action;
		const res: IRootResponse = yield call(() => {
			return api.post(`${API_URL}/seller-platforms/schedulers`, payload.params);
		});
		yield put(actionSuccess(userTypes.CREATE_SHOP_DETAIL_FLATFORM_SUCCESS, res));
	} catch (err: any) {
		yield put(actionFailure(userTypes.CREATE_SHOP_DETAIL_FLATFORM_FAILURE, err));
	}
}

const userSagas = [
	takeLatest(userTypes.START_CREATE_SHOP, createOneShopSaga),
	takeLatest(userTypes.START_UPDATE_SHOP_LIST, updateOneShopSaga),
	takeLatest(userTypes.START_UPDATE_SHOP_STATUS, updateOneShopStatusSaga),

	takeLatest(userTypes.START_UPDATE_SHOP_DETAIL, updateOneShopDetailSaga),
	takeLatest(userTypes.START_UPDATE_SHOP_DETAIL_PLATFORM, updateOneShopDetailPlatformSaga),
	takeLatest(userTypes.START_CREATE_SHOP_DETAIL_PLATFORM, createOneShopDetailPlatformSaga),
	takeLatest(userTypes.START_GET_SHOP_DETAIL, getShopDetailSaga),

	takeLatest(userTypes.START_GET_LIST_SHOP, getListShopSaga),
	takeLatest(userTypes.START_GET_LIST_SCHEDULERS, getListSchedulersSaga),
	takeLatest(userTypes.START_GET_CRON_FUNCTIONS, getCronFunctionsSaga),
	takeLatest(userTypes.START_CREATE_CRON_FUNCTIONS, createCronFunctionsSaga),
	takeLatest(userTypes.START_UPDATE_CRON_FUNCTIONS, updateCronFunctionsSaga),

	takeLatest(userTypes.START_GET_LIST_USER_SYSTEM, getListUserSystem),
	takeLatest(userTypes.START_GET_USER_SYSTEM_BY_ID, getUserSystemById),
	takeLatest(userTypes.START_UPDATE_ONE_USER_SYSTEM, updateOneUserSystem),
	takeLatest(userTypes.START_CREATE_ONE_USER_SYSTEM, createOneUserSystem),
	takeLatest(userTypes.START_GET_LIST_USER_GROUPS, getListUserGroup),
	takeLatest(userTypes.START_GET_DELAY_LIST_USER_GROUPS, getDelayListUserGroup),
	takeLatest(userTypes.START_GET_USER_GROUPS_BY_ID, getUserGroupById),
	takeLatest(userTypes.START_CREATE_ONE_USER_GROUPS, createOneUserGroup),
	takeLatest(userTypes.START_CREATE_SCHEDULERS, createOneSchedulerSaga),
	takeLatest(userTypes.START_UPDATE_SCHEDULERS, updateOneSchedulerSaga),

	takeLatest(userTypes.START_UPDATE_ONE_USER_GROUPS, updateOneUserGroup),
	takeLatest(userTypes.START_GET_LIST_USER_GROUPS_PRIVILEGE, getListUserGroupPrivilege)
];

export default userSagas;
