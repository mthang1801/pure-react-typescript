import { Reducer } from "redux";
import { IGlobalState } from "../interfaces/global.interfaces";
import globalTypes from "../actions/types/global.types";
import { localGetTheme } from "../../utils/localStorage";
import { ISyntheticAction } from "../interfaces/root.interfaces";

const initState: IGlobalState = {
  theme: localGetTheme(),
  otherState: null,
  isSignIn: null,
  notAccessPage: null,
  messageError423: [],
};

const globalReducer: Reducer<IGlobalState, ISyntheticAction> = (
  state: IGlobalState = initState,
  action: ISyntheticAction
) => {
  const { type, payload, response } = action;

  //for loggout when bug and expired token
  if (response?.statusCode && [408].includes(response?.statusCode)) {
    const stateReducer: IGlobalState = {
      ...state,
      isSignIn: false,
    };
    return stateReducer;
  }


  switch (type) {
    case globalTypes.CHANGE_THEME: {
      const stateReducer: IGlobalState = {
        ...state,
        theme: payload.data,
        otherState: payload.data,
      };
      return stateReducer;
    }

    case globalTypes.START_PUT_SIGN_IN_APP: {
      const stateReducer: IGlobalState = {
        ...state,
        isSignIn: null,
      };
      return stateReducer;
    }
    case globalTypes.PUT_SIGN_IN_APP_SUCCESS: {
      const stateReducer: IGlobalState = {
        ...state,
        isSignIn: payload.data,
      };
      return stateReducer;
    }
    
    case globalTypes.NOT_ACCESS_PAGE: {
      const stateReducer: IGlobalState = {
        ...state,
        notAccessPage: payload.data,
      };
      return stateReducer;
    }

    case globalTypes.SET_EMTPY_DATA_423: {
      const stateReducer: IGlobalState = {
        ...state,
        messageError423: payload.data,
      };
      return stateReducer;
    }

    default:
      return state;
  }
};

export default globalReducer;
