import { IGlobalState } from "./global.interfaces";

export interface ICatchError {
  message: string;
  statusCode: number;
  data?: any;
}
export interface IRootResponse {
  data: any;
  message: string;
  statusCode: number;
}
export interface IStateResponse {
  data?: any;
  message: string | null;
  success: boolean | null;
  statusCode?: number;
}
export interface IPayload {
  id?: any;
  params?: any | any[];
  token?: string;
  data?: any;
}

export interface IType {
  type: string;
}

export interface IAction extends IType {
  payload: IPayload;
}

export interface IActionResponse extends IType {
  response: IStateResponse;
}

export interface ISyntheticAction extends IAction, IActionResponse { }

export interface IRootState extends IStateResponse {
  isLoading: boolean | null; 
  error: boolean | null;
}

export interface IRootReducers {
  globalReducer: IGlobalState;
}
