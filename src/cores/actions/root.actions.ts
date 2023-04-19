import {
  IActionResponse,
  ICatchError,
  IRootResponse,
  IStateResponse,
} from "../interfaces/root.interfaces";

export const actionSuccess = (
  type: string,
  response: IRootResponse
): IActionResponse => {
  const result: IStateResponse = {
    data: response.data,
    message: response.message,
    success:
      response.statusCode === 200 || response.statusCode === 201 ? true : false,
  };
  const action: IActionResponse = {
    type,
    response: result,
  };
  return action;
};

export const actionSuccessArray = (
  type: string,
  response: IRootResponse[]
): IActionResponse => {
  const result: IStateResponse = {
    data: response,
    message: "done",
    success: true,
  };
  const action: IActionResponse = {
    type,
    response: result,
  };
  return action;
};

export const actionFailure = (type: string, err: ICatchError) => {
  const result: IStateResponse = {
    message: err.message,
    success: false,
    data: err.data,
    statusCode: err.statusCode,
  };
  const action: IActionResponse = {
    type,
    response: result,
  };
  return action;
};
