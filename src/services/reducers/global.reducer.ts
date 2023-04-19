import { Reducer } from "redux";
import { IGlobalState } from "../interfaces/global.interfaces";
import globalTypes from "../actions/types/global.types";
import { localGetTheme } from "../../utils/localStorage";
import { ISyntheticAction } from "../interfaces/root.interfaces";

// type Action =
//   | ReturnType<typeof changeTheme>
//   | ReturnType<typeof otherAction>
//   | ReturnType<typeof putSignIn>;

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

  // //for not access page
  // if (response?.statusCode && ([423].includes(response?.statusCode))) {
  //   let msg: string = response.data || '';
  //   let arr: string[] = state.messageError423;
  //   arr.push(msg);
  //   const stateReducer: IGlobalState = {
  //     ...state,
  //     notAccessPage: true,
  //     messageError423: arr
  //   };
  //   return stateReducer;
  // }

  switch (type) {
    /*************************** START *************************/
    /*                       CHANGE THEME                      */

    case globalTypes.CHANGE_THEME: {
      const stateReducer: IGlobalState = {
        ...state,
        theme: payload.data,
        otherState: payload.data,
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*                      SET SIGN IN APP                    */

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

    /**************************** END **************************/

    /*************************** START *************************/
    /*                  SET NOT ACCESS PAGE                    */

    case globalTypes.NOT_ACCESS_PAGE: {
      const stateReducer: IGlobalState = {
        ...state,
        notAccessPage: payload.data,
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*               SET EMPTY DATA ERROR 423                  */

    case globalTypes.SET_EMTPY_DATA_423: {
      const stateReducer: IGlobalState = {
        ...state,
        messageError423: payload.data,
      };
      return stateReducer;
    }

    /**************************** END **************************/

    default:
      return state;
  }
};

export default globalReducer;
