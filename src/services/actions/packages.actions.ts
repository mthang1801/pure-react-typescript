import packagesTypes from "./types/packages.types";
import { IAction } from "../interfaces/root.interfaces";

export const getListPackages = (params?: any) => {
	const action: any = {
		type: packagesTypes.START_GET_LIST_PACKAGES,
		payload: { params }
	};
	return action;
};

export const createOnePackages = (params: any) => {
	const action: IAction = {
		type: packagesTypes.START_CREATE_PACKAGES,
		payload: { params }
	};
	return action;
};

export const updateOnePackages = (id: any, params: any) => {
	const action: IAction = {
		type: packagesTypes.START_UPDATE_PACKAGES,
		payload: { id, params }
	};
	return action;
};

export const getOnePackagesById = (id?: any, params?: any) => {
	const action: IAction = {
		type: packagesTypes.START_GET_PACKAGES_BY_ID,
		payload: { id, params }
	};
	return action;
};
