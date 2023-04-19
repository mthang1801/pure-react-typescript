import { Reducer } from "redux";

import accountTypes from "../actions/types/account.types";
import { IAccountState } from "../interfaces/account.interfaces";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { rootState } from "./state/root.states";

const initState: IAccountState = {
  stateSignIn: { ...rootState },
  stateRegister: { ...rootState }
};

const accountReducer: Reducer<IAccountState, ISyntheticAction> = (
  state: IAccountState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                       LOGIN ACCOUNT                     */

    case accountTypes.START_SIGNIN: {
      const stateReducer: IAccountState = {
        ...state,
        stateSignIn: {
          ...rootState,
          isLoading: true,
        },
        phone: payload.params?.phone,
        email: payload.params?.email,
      };
      return stateReducer;
    }
    case accountTypes.SIGNIN_SUCCESS: {
      const stateReducer: IAccountState = {
        ...state,
        stateSignIn: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case accountTypes.SIGNIN_FAILURE: {
      const stateReducer: IAccountState = {
        ...state,
        stateSignIn: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/
    case accountTypes.START_REGISTER: {
      const stateReducer: IAccountState = {
        ...state,
        stateRegister: {
          ...rootState,
          isLoading: true,
        },
        phone: payload.params?.phone,
        email: payload.params?.email,
      };
      return stateReducer;
    }
    case accountTypes.REGISTER_SUCCESS: {
      const stateReducer: IAccountState = {
        ...state,
        stateRegister: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case accountTypes.REGISTER_FAILURE: {
      const stateReducer: IAccountState = {
        ...state,
        stateRegister: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }
		case accountTypes.SIGNIN_GOOGLE_START : {
			const stateReducer : IAccountState = {
				...state, 
				stateSignIn : {
					...rootState,
					isLoading : true,				
				},
				phone : payload.params?.phone,
				email : payload.params?.email,
				givenName: payload.params?.givenName,
				familyName: payload.params?.familyName,
				providerId : payload.params?.providerId
			}
			return stateReducer
		}
		case accountTypes.SIGNIN_GOOGLE_SUCCESS : {
			const stateReducer : IAccountState = {
				...state, 
				stateSignIn: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
			}
			return stateReducer
		};
		case accountTypes.SIGNIN_GOOGLE_FAILURE : {
			const stateReducer : IAccountState = {
				...state, 
				stateSignIn: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
			}
			return stateReducer
		}
    default:
      return state;
  }
};

export default accountReducer;
