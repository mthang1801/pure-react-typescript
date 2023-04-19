import { IAction } from "../interfaces/root.interfaces";
import shippingTypes from "./types/shipping.types";

export const getListShipping = (params?: any) => {
  const action: IAction = {
    type: shippingTypes.START_GET_LIST_SHIPPING,
    payload: { params },
  };
  return action;
};

export const getShippingById = (id?: any) => {
  const action: IAction = {
    type: shippingTypes.START_GET_SHIPPING_BY_ID,
    payload: { id },
  };
  return action;
};

export const updateOneShipping = (id: string, params: any) => {
  const action: IAction = {
    type: shippingTypes.START_UPDATE_ONE_SHIPPING,
    payload: { id, params },
  };
  return action;
};

export const createOneShipping = (params: any) => {
  const action: IAction = {
    type: shippingTypes.START_CREATE_ONE_SHIPPING,
    payload: { params },
  };
  return action;
};
