import userTypes from "./types/user.types";
import { IAction } from "../interfaces/root.interfaces";

export const getListUserSystem = (params?: any) => {
	const action: IAction = {
		type: userTypes.START_GET_LIST_USER_SYSTEM,
		payload: { params }
	};
	return action;
};

export const getUserSystemById = (id?: any) => {
	const action: IAction = {
		type: userTypes.START_GET_USER_SYSTEM_BY_ID,
		payload: { id }
	};
	return action;
};

export const updateOneUserSystem = (id: string, params: any) => {
	const action: IAction = {
		type: userTypes.START_UPDATE_ONE_USER_SYSTEM,
		payload: { id, params }
	};
	return action;
};

export const createOneUserSystem = (params: any) => {
	const action: IAction = {
		type: userTypes.START_CREATE_ONE_USER_SYSTEM,
		payload: { params }
	};
	return action;
};

export const getListUserGroup = (params?: any) => {
	const action: IAction = {
		type: userTypes.START_GET_LIST_USER_GROUPS,
		payload: { params }
	};
	return action;
};

export const getDelayListUserGroup = (params?: any) => {
	const action: IAction = {
		type: userTypes.START_GET_DELAY_LIST_USER_GROUPS,
		payload: { params }
	};
	return action;
};

export const getUserGroupById = (id?: string | number) => {
	const action: IAction = {
		type: userTypes.START_GET_USER_GROUPS_BY_ID,
		payload: { id }
	};
	return action;
};

export const createOneUserGroup = (params: any) => {
	const action: IAction = {
		type: userTypes.START_CREATE_ONE_USER_GROUPS,
		payload: { params }
	};
	return action;
};

export const updateOneUserGroup = (id: string | number, params: any) => {
	const action: IAction = {
		type: userTypes.START_UPDATE_ONE_USER_GROUPS,
		payload: { id, params }
	};
	return action;
};

export const getListUserGroupPrivilege = (params?: any) => {
	const action: IAction = {
		type: userTypes.START_GET_LIST_USER_GROUPS_PRIVILEGE,
		payload: { params }
	};
	return action;
};

export const getListShop = (params?: any) => {
	const action: IAction = {
		type: userTypes.START_GET_LIST_SHOP,
		payload: { params }
	};
	return action;
};

export const getListSchedulers = (platform_id: any, params?: any) => {
	const action: any = {
		type: userTypes.START_GET_LIST_SCHEDULERS,
		payload: { platform_id, params }
	};
	return action;
};

export const createOneScheduler = (params: any) => {
	const action: IAction = {
		type: userTypes.START_CREATE_SCHEDULERS,
		payload: { params }
	};
	return action;
};

export const updateOneScheduler = (id: any, params: any) => {
	const action: IAction = {
		type: userTypes.START_UPDATE_SCHEDULERS,
		payload: { id, params }
	};
	return action;
};

export const getCronFunctions = (params?: any) => {
	const action: IAction = {
		type: userTypes.START_GET_CRON_FUNCTIONS,
		payload: { params }
	};
	return action;
};

export const createCronFunctions = (params?: any) => {
	const action: IAction = {
		type: userTypes.START_CREATE_CRON_FUNCTIONS,
		payload: { params }
	};
	return action;
};

export const updateCronFunctions = (id: any, params?: any) => {
	const action: IAction = {
		type: userTypes.START_UPDATE_CRON_FUNCTIONS,
		payload: { id, params }
	};
	return action;
};

export const getShopDetail = (id: any, params?: any) => {
	const action: IAction = {
		type: userTypes.START_GET_SHOP_DETAIL,
		payload: { id, params }
	};
	return action;
};

export const createOneShop = (params?: any) => {
	const action: IAction = {
		type: userTypes.START_CREATE_SHOP,
		payload: { params }
	};
	return action;
};

export const updateOneShop = (params?: any) => {
	const action: IAction = {
		type: userTypes.START_UPDATE_SHOP_LIST,
		payload: { params }
	};
	return action;
};

export const updateOneShopDetail = (id: any, params?: any) => {
	const action: IAction = {
		type: userTypes.START_UPDATE_SHOP_DETAIL,
		payload: { id, params }
	};
	return action;
};

export const updateOneShopStatus = (id: any, params?: any) => {
	const action: IAction = {
		type: userTypes.START_UPDATE_SHOP_STATUS,
		payload: { id, params }
	};
	return action;
};

export const createOneShopDetailPlatform = (params?: any) => {
	const action: IAction = {
		type: userTypes.START_CREATE_SHOP_DETAIL_PLATFORM,
		payload: { params }
	};
	return action;
};

export const updateOneShopDetailPlatform = (id: any, params?: any) => {
	const action: IAction = {
		type: userTypes.START_UPDATE_SHOP_DETAIL_PLATFORM,
		payload: { id, params }
	};
	return action;
};

export const getShopDetailPlatform = (id: any, params?: any) => {
	const action: IAction = {
		type: userTypes.START_GET_SHOP_DETAIL_PLATFORM,
		payload: { id, params }
	};
	return action;
};
