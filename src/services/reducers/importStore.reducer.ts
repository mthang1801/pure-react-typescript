import { Reducer } from "redux";

import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";
import { IImportState } from "../interfaces/importStore.interfaces";
import importStoreTypes from "../actions/types/importStore.types";

const initState: IImportState = {
  stateListImport: { ...rootState },
  stateImportById: { ...rootState },
  stateCreateOneImport: { ...rootState },
  stateUpdateOneImport: { ...rootState },
};

const ImportReducer: Reducer<IImportState, ISyntheticAction> = (
  state: IImportState = initState,
  action: ISyntheticAction
) => {
  const { type, response } = action;

  switch (type) {
    /*************************** START *************************/
    /*                   GET ALL ORDER STATUS                  */

    case importStoreTypes.START_GET_LIST_IMPORT: {
      const stateReducer: IImportState = {
        ...state,
        stateListImport: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case importStoreTypes.GET_LIST_IMPORT_SUCCESS: {
      const stateReducer: IImportState = {
        ...state,
        stateListImport: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case importStoreTypes.GET_LIST_IMPORT_FAILURE: {
      const stateReducer: IImportState = {
        ...state,
        stateListImport: {
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

    case importStoreTypes.START_GET_IMPORT_BY_ID: {
      const stateReducer: IImportState = {
        ...state,
        stateImportById: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case importStoreTypes.GET_IMPORT_BY_ID_SUCCESS: {
      const stateReducer: IImportState = {
        ...state,
        stateImportById: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case importStoreTypes.GET_IMPORT_BY_ID_FAILURE: {
      const stateReducer: IImportState = {
        ...state,
        stateImportById: {
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

    case importStoreTypes.START_CREATE_ONE_IMPORT: {
      const stateReducer: IImportState = {
        ...state,
        stateCreateOneImport: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case importStoreTypes.CREATE_ONE_IMPORT_SUCCESS: {
      const stateReducer: IImportState = {
        ...state,
        stateCreateOneImport: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case importStoreTypes.CREATE_ONE_IMPORT_FAILURE: {
      const stateReducer: IImportState = {
        ...state,
        stateCreateOneImport: {
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

    case importStoreTypes.START_UPDATE_ONE_IMPORT: {
      const stateReducer: IImportState = {
        ...state,
        stateUpdateOneImport: {
          ...rootState,
          isLoading: true,
        },
      };
      return stateReducer;
    }
    case importStoreTypes.UPDATE_ONE_IMPORT_SUCCESS: {
      const stateReducer: IImportState = {
        ...state,
        stateUpdateOneImport: {
          ...rootState,
          isLoading: false,
          data: response.data,
          message: response.message,
          success: response.success,
        },
      };
      return stateReducer;
    }
    case importStoreTypes.UPDATE_ONE_IMPORT_FAILURE: {
      const stateReducer: IImportState = {
        ...state,
        stateUpdateOneImport: {
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

export default ImportReducer;
