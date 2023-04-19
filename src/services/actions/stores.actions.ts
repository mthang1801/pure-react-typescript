import { IAction } from "../interfaces/root.interfaces";
import storesTypes from "./types/stores.types";

export const getListStores = (params?: any) => {
  const action: IAction = {
    type: storesTypes.START_GET_LIST_STORES,
    payload: { params },
  };
  return action;
};

export const getStoreById = (id?: any) => {
  const action: IAction = {
    type: storesTypes.START_GET_STORE_BY_ID,
    payload: { id },
  };
  return action;
};

export const updateOneStore = (id: string, params: any) => {
  console.log("vo day r");
  const action: IAction = {
    type: storesTypes.START_UPDATE_ONE_STORE,
    payload: { id, params },
  };
  return action;
};

export const createOneStore = (params: any) => {
  const action: IAction = {
    type: storesTypes.START_CREATE_ONE_STORE,
    payload: { params },
  };
  return action;
};
