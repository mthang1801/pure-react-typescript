import { IAction } from "../interfaces/root.interfaces";
import customerTypes from "./types/customer.types";

export const fetchCustomersList = (params?: any) => {
  const action: IAction = {
    type: customerTypes.FETCH_CUSTOMERS_LIST_START,
    payload: { params },
  };
  return action;
};

export const getCustomerById = (id: any) => {
  const action: IAction = {
    type: customerTypes.GET_CUSTOMER_BY_ID_START,
    payload: { id },
  };
  return action;
};

export const updateCustomer = (id: any, params?: any) => {
  const action: IAction = {
    type: customerTypes.UPDATE_CUSTOMER_START,
    payload: { id, params },
  };
  return action;
};

export const createCustomer = ( params?: any) => {
  const action: IAction = {
    type: customerTypes.CREATE_CUSTOMER_START,
    payload: { params },
  };
  return action;
};
