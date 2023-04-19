import { IAction } from "../interfaces/root.interfaces";
import suppliersTypes from "./types/suppliers.types";

export const getListSuppliers = (params?: any) => {
  const action: IAction = {
    type: suppliersTypes.START_GET_LIST_SUPPLIERS,
    payload: { params },
  };
  return action;
};

export const getSuppliersById = (id?: any) => {
  const action: IAction = {
    type: suppliersTypes.START_GET_SUPPLIERS_BY_ID,
    payload: { id },
  };
  return action;
};

export const updateOneSuppliers = (id: string, params: any) => {
  const action: IAction = {
    type: suppliersTypes.START_UPDATE_ONE_SUPPLIERS,
    payload: { id, params },
  };
  return action;
};

export const createOneSuppliers = (params: any) => {
  const action: IAction = {
    type: suppliersTypes.START_CREATE_ONE_SUPPLIERS,
    payload: { params },
  };
  return action;
};
