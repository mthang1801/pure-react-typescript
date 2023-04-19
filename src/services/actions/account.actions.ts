import { IAction } from "../interfaces/root.interfaces";
import accountTypes from "./types/account.types";

export const signInAccount = (params: any) => {
  const action: IAction = {
    type: accountTypes.START_SIGNIN,
    payload: { params },
  };
  return action;
};

export const registerAccount = (params: any): IAction => {
  const action: IAction = {
    type: accountTypes.START_REGISTER,
    payload: { params },
  };
  return action;
};

export const signOut = (params: any): IAction => {
  const action: IAction = {
    type: accountTypes.SIGN_OUT,
    payload: { params },
  };
  return action;
};

export const signInGoogle = (params: any) : IAction => {
	const action : IAction = {
		type : accountTypes.SIGNIN_GOOGLE_START,
		payload : {params}
	}
	return action
}