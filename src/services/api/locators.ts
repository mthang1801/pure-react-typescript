import { api } from "./api.index";
import { API_URL } from "./config";
import { API_DISTRICTS, API_PROVINCES, API_WARDS } from "./url.index";

export const getProvinces = async (params?:any) => {
	try {
		const response  = await api.get(`${API_URL}/${API_PROVINCES}`, params ) as any;
		return response["data"]
	} catch (error : any) {
		throw new Error(error.response.data.message)
	}
}

export const getDistricts = async (params?:any) => {
	try {
		const response  = await api.get(`${API_URL}/${API_DISTRICTS}`, params ) as any;
		return response["data"]
	} catch (error : any) {
		throw new Error(error.response.data.message)
	}
}

export const getWards = async (params?:any) => {
	try {
		const response  = await api.get(`${API_URL}/${API_WARDS}`, params ) as any;
		return response["data"]
	} catch (error : any) {
		throw new Error(error.response.data.message)
	}
}