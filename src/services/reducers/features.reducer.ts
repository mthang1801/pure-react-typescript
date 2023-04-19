import { Reducer } from "redux";

import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { ISuppliersState } from "../interfaces/suppliers.interfaces";
import suppliersTypes from "../actions/types/suppliers.types";

const initState: ISuppliersState = {
  stateListSuppliers: { ...rootState },
  stateSupplierById: { ...rootState },
  stateCreateOneSupplier: { ...rootState },
  stateUpdateOneSupplier: { ...rootState },
};

const suppliersReducer: Reducer<ISuppliersState, ISyntheticAction> = (
  state: ISuppliersState = initState,
  action: ISyntheticAction
) => {
  const { type, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                   GET ALL ORDER STATUS                  */

    case suppliersTypes.START_GET_LIST_SUPPLIERS: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateListSuppliers: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case suppliersTypes.GET_LIST_SUPPLIERS_SUCCESS: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateListSuppliers: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case suppliersTypes.GET_LIST_SUPPLIERS_FAILURE: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateListSuppliers: {
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

    case suppliersTypes.START_GET_SUPPLIERS_BY_ID: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateSupplierById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case suppliersTypes.GET_SUPPLIERS_BY_ID_SUCCESS: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateSupplierById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case suppliersTypes.GET_SUPPLIERS_BY_ID_FAILURE: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateSupplierById: {
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

    case suppliersTypes.START_CREATE_ONE_SUPPLIERS: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateCreateOneSupplier: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case suppliersTypes.CREATE_ONE_SUPPLIERS_SUCCESS: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateCreateOneSupplier: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case suppliersTypes.CREATE_ONE_SUPPLIERS_FAILURE: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateCreateOneSupplier: {
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

    case suppliersTypes.START_UPDATE_ONE_SUPPLIERS: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateUpdateOneSupplier: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case suppliersTypes.UPDATE_ONE_SUPPLIERS_SUCCESS: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateUpdateOneSupplier: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case suppliersTypes.UPDATE_ONE_SUPPLIERS_FAILURE: {
      const stateReducer: ISuppliersState = {
        ...state,
        stateUpdateOneSupplier: {
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

export default suppliersReducer;
