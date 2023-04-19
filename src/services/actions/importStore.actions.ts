import { IAction } from "../interfaces/root.interfaces";
import importStoreTypes from "./types/importStore.types";

export const getListImport = (params?: any) => {
  const action: IAction = {
    type: importStoreTypes.START_GET_LIST_IMPORT,
    payload: { params },
  };
  return action;
};

export const getImportById = (id?: any) => {
  const action: IAction = {
    type: importStoreTypes.START_GET_IMPORT_BY_ID,
    payload: { id },
  };
  return action;
};

export const updateOneImport = (id: string, params: any) => {
  const action: IAction = {
    type: importStoreTypes.START_UPDATE_ONE_IMPORT,
    payload: { id, params },
  };
  return action;
};

export const createOneImport = (params: any) => {
  const action: IAction = {
    type: importStoreTypes.START_CREATE_ONE_IMPORT,
    payload: { params },
  };
  return action;
};
