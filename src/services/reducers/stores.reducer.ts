import { Reducer } from "redux";

import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IStoresState } from "../interfaces/stores.interfaces";
import storesTypes from "../actions/types/stores.types";

const initState: IStoresState = {
  stateListStores: { ...rootState },
  stateStoreById: { ...rootState },
  stateCreateOneStore: { ...rootState },
  stateUpdateOneStore: { ...rootState },
};

const storesReducer: Reducer<IStoresState, ISyntheticAction> = (
  state: IStoresState = initState,
  action: ISyntheticAction
) => {
  const { type, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                   GET ALL ORDER STATUS                  */

    case storesTypes.START_GET_LIST_STORES: {
      const stateReducer: IStoresState = {
        ...state,
        stateListStores: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case storesTypes.GET_LIST_STORES_SUCCESS: {
      const stateReducer: IStoresState = {
        ...state,
        stateListStores: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case storesTypes.GET_LIST_STORES_FAILURE: {
      const stateReducer: IStoresState = {
        ...state,
        stateListStores: {
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

    case storesTypes.START_GET_STORE_BY_ID: {
      const stateReducer: IStoresState = {
        ...state,
        stateStoreById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case storesTypes.GET_STORE_BY_ID_SUCCESS: {
      const stateReducer: IStoresState = {
        ...state,
        stateStoreById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case storesTypes.GET_STORE_BY_ID_FAILURE: {
      const stateReducer: IStoresState = {
        ...state,
        stateStoreById: {
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

    case storesTypes.START_CREATE_ONE_STORE: {
      const stateReducer: IStoresState = {
        ...state,
        stateCreateOneStore: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case storesTypes.CREATE_ONE_STORE_SUCCESS: {
      const stateReducer: IStoresState = {
        ...state,
        stateCreateOneStore: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case storesTypes.CREATE_ONE_STORE_FAILURE: {
      const stateReducer: IStoresState = {
        ...state,
        stateCreateOneStore: {
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

    case storesTypes.START_UPDATE_ONE_STORE: {
      const stateReducer: IStoresState = {
        ...state,
        stateUpdateOneStore: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case storesTypes.UPDATE_ONE_STORE_SUCCESS: {
      const stateReducer: IStoresState = {
        ...state,
        stateUpdateOneStore: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case storesTypes.UPDATE_ONE_STORE_FAILURE: {
      const stateReducer: IStoresState = {
        ...state,
        stateUpdateOneStore: {
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

export default storesReducer;
