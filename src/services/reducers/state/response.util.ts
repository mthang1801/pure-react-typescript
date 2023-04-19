import { rootState } from "./root.states";

export const _responseDataStart = (response : any) : any => ({
	...rootState,
	isLoading: true
});

export const _responseDataSuccess = (response : any) : any  => ({
	...rootState,
	data: response?.data,
	message: response?.message,
	success: response?.success
});

export const _responseDataFailure = (response : any) : any => ({
	...rootState,
	isLoading: false,
	error: true,
	message: response?.message
});