import configsTypes from "./types/configSetting.types";
import { IAction } from "../interfaces/root.interfaces";

export const getListConfigs = (params?: any) => {
	const action: any = {
		type: configsTypes.START_GET_LIST_CONFIGS,
		payload: { params }
	};
	return action;
};

export const createOneConfigs = (params: any) => {
	const action: IAction = {
		type: configsTypes.START_CREATE_CONFIGS,
		payload: { params }
	};
	return action;
};

export const updateOneConfigs = (params: any) => {
	const action: IAction = {
		type: configsTypes.START_UPDATE_CONFIGS,
		payload: { params }
	};
	return action;
};

export const getOneConfigsById = (params: any) => {
	const action: IAction = {
		type: configsTypes.START_GET_CONFIGS_BY_ID,
		payload: { params }
	};
	return action;
};
