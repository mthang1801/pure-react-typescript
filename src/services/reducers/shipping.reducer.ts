import { Reducer } from "redux";

import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IShippingState } from "../interfaces/shipping.interfaces";
import shippingTypes from "../actions/types/shipping.types";

const initState: IShippingState = {
  stateListShipping: { ...rootState },
  stateShippingById: { ...rootState },
  stateCreateOneShipping: { ...rootState },
  stateUpdateOneShipping: { ...rootState },
};

const shippingReducer: Reducer<IShippingState, ISyntheticAction> = (
  state: IShippingState = initState,
  action: ISyntheticAction
) => {
  const { type, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                   GET ALL ORDER STATUS                  */

    case shippingTypes.START_GET_LIST_SHIPPING: {
      const stateReducer: IShippingState = {
        ...state,
        stateListShipping: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case shippingTypes.GET_LIST_SHIPPING_SUCCESS: {
      const stateReducer: IShippingState = {
        ...state,
        stateListShipping: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case shippingTypes.GET_LIST_SHIPPING_FAILURE: {
      const stateReducer: IShippingState = {
        ...state,
        stateListShipping: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*                   GET ORDER STATUS BY ID                */

    case shippingTypes.START_GET_SHIPPING_BY_ID: {
      const stateReducer: IShippingState = {
        ...state,
        stateShippingById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case shippingTypes.GET_SHIPPING_BY_ID_SUCCESS: {
      const stateReducer: IShippingState = {
        ...state,
        stateShippingById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case shippingTypes.GET_SHIPPING_BY_ID_FAILURE: {
      const stateReducer: IShippingState = {
        ...state,
        stateShippingById: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*                  CREATE ONE ORDER STATUS                */

    case shippingTypes.START_CREATE_ONE_SHIPPING: {
      const stateReducer: IShippingState = {
        ...state,
        stateCreateOneShipping: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case shippingTypes.CREATE_ONE_SHIPPING_SUCCESS: {
      const stateReducer: IShippingState = {
        ...state,
        stateCreateOneShipping: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case shippingTypes.CREATE_ONE_SHIPPING_FAILURE: {
      const stateReducer: IShippingState = {
        ...state,
        stateCreateOneShipping: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*                  UPDATE ONE ORDER STATUS                */

    case shippingTypes.START_UPDATE_ONE_SHIPPING: {
      const stateReducer: IShippingState = {
        ...state,
        stateUpdateOneShipping: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case shippingTypes.UPDATE_ONE_SHIPPING_SUCCESS: {
      const stateReducer: IShippingState = {
        ...state,
        stateUpdateOneShipping: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case shippingTypes.UPDATE_ONE_SHIPPING_FAILURE: {
      const stateReducer: IShippingState = {
        ...state,
        stateUpdateOneShipping: {
          ...rootState,
          isLoading: false,
          message: response.message,
          error: true,
        },
      };
      return stateReducer;
    }

    /**************************** END **************************/

    /*************************** START *************************/
    /*                  GET HISTORY ORDER BY ID                */

    default:
      return state;
  }
};

export default shippingReducer;
