import { Reducer } from "redux";

import userTypes from "../actions/types/user.types";
import { IUserState } from "../interfaces/user.interfaces";
import { rootState } from "./state/root.states";
import { ISyntheticAction } from "../interfaces/root.interfaces";

const initState: IUserState = {
	stateGetListUserSystem: { ...rootState },
	stateGetUserSystemById: { ...rootState },
	stateUpdateOneUserSystem: { ...rootState },
	stateCreateOneUserSystem: { ...rootState },
	stateGetListUserGroups: { ...rootState },
	stateGetUserGroupsByid: { ...rootState },
	stateCreateOneUserGroups: { ...rootState },
	stateUpdateOneUserGroups: { ...rootState },
	stateGetListUserGroupsPrivilege: { ...rootState },
	stateGetListShop: { ...rootState },
	stateGetListSchedulers: { ...rootState },
	stateGetCronFunctions: { ...rootState },
	stateCreateOneScheduler: { ...rootState },
	stateUpdateOneScheduler: { ...rootState },
	stateListShopPlatform: { ...rootState },
	stateCreateShopPlatform: { ...rootState },
	stateUpdateShopPlatform: { ...rootState },
	startShopDetail: { ...rootState },
	stateUpdateShopStatus: { ...rootState },
	stateCreateShop: { ...rootState },
	stateCreateCronFunctions: { ...rootState },
	stateUpdateCronFunctions: { ...rootState }
};

const accountReducer: Reducer<IUserState, ISyntheticAction> = (
	state: IUserState = initState,
	action: ISyntheticAction
) => {
	const { type, response } = action;

	switch (type) {
		/*************************** START *************************/
		/*                  GET LIST USER SYSTEM                   */

		case userTypes.START_GET_LIST_USER_SYSTEM: {
			const stateReducer: IUserState = {
				...state,
				stateGetListUserSystem: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.GET_LIST_USER_SYSTEM_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateGetListUserSystem: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.GET_LIST_USER_SYSTEM_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateGetListUserSystem: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                 GET USER SYSTEM BY ID                   */

		case userTypes.START_GET_USER_SYSTEM_BY_ID: {
			const stateReducer: IUserState = {
				...state,
				stateGetUserSystemById: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.GET_USER_SYSTEM_BY_ID_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateGetUserSystemById: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.GET_USER_SYSTEM_BY_ID_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateGetUserSystemById: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                 UPDATE ONE USER SYSTEM                  */

		case userTypes.START_UPDATE_ONE_USER_SYSTEM: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateOneUserSystem: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_ONE_USER_SYSTEM_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateOneUserSystem: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_ONE_USER_SYSTEM_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateOneUserSystem: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                 CREATE ONE USER SYSTEM                  */

		case userTypes.START_CREATE_ONE_USER_SYSTEM: {
			const stateReducer: IUserState = {
				...state,
				stateCreateOneUserSystem: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_ONE_USER_SYSTEM_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateCreateOneUserSystem: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_ONE_USER_SYSTEM_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateCreateOneUserSystem: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                    GET LIST USER GROUP                  */
		case userTypes.START_GET_DELAY_LIST_USER_GROUPS: {
			const stateReducer: IUserState = {
				...state,
				stateGetListUserGroups: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.START_GET_LIST_USER_GROUPS: {
			const stateReducer: IUserState = {
				...state,
				stateGetListUserGroups: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.GET_LIST_USER_GROUPS_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateGetListUserGroups: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.GET_LIST_USER_GROUPS_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateGetListUserGroups: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                    GET USER GROUP BY ID                 */

		case userTypes.START_GET_USER_GROUPS_BY_ID: {
			const stateReducer: IUserState = {
				...state,
				stateGetUserGroupsByid: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.GET_USER_GROUPS_BY_ID_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateGetUserGroupsByid: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.GET_USER_GROUPS_BY_ID_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateGetUserGroupsByid: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                  CREATE ONE USER GROUP                  */

		case userTypes.START_CREATE_ONE_USER_GROUPS: {
			const stateReducer: IUserState = {
				...state,
				stateCreateOneUserGroups: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_ONE_USER_GROUPS_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateCreateOneUserGroups: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_ONE_USER_GROUPS_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateCreateOneUserGroups: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		/*************************** START *************************/
		/*                   UPDATE ONE USER GROUP                 */

		case userTypes.START_UPDATE_ONE_USER_GROUPS: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateOneUserGroups: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_ONE_USER_GROUPS_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateOneUserGroups: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_ONE_USER_GROUPS_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateOneUserGroups: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}
		/**************************** END **************************/

		/*************************** START *************************/
		/*              GET LIST USER GROUP PRIVILEGE              */

		case userTypes.START_GET_LIST_USER_GROUPS_PRIVILEGE: {
			const stateReducer: IUserState = {
				...state,
				stateGetListUserGroupsPrivilege: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.GET_LIST_USER_GROUPS_PRIVILEGE_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateGetListUserGroupsPrivilege: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.GET_LIST_USER_GROUPS_PRIVILEGE_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateGetListUserGroupsPrivilege: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_GET_LIST_SHOP: {
			const stateReducer: IUserState = {
				...state,
				stateGetListShop: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.GET_LIST_SHOP_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateGetListShop: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.GET_LIST_SHOP_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateGetListShop: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_GET_LIST_SCHEDULERS: {
			const stateReducer: IUserState = {
				...state,
				stateGetListSchedulers: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.GET_LIST_SCHEDULERS_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateGetListSchedulers: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.GET_LIST_SCHEDULERS_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateGetListSchedulers: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_GET_CRON_FUNCTIONS: {
			const stateReducer: IUserState = {
				...state,
				stateGetCronFunctions: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.GET_CRON_FUNCTIONS_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateGetCronFunctions: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.GET_CRON_FUNCTIONS_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateGetCronFunctions: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_CREATE_CRON_FUNCTIONS: {
			const stateReducer: IUserState = {
				...state,
				stateCreateCronFunctions: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_CRON_FUNCTIONS_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateCreateCronFunctions: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_CRON_FUNCTIONS_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateCreateCronFunctions: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_UPDATE_CRON_FUNCTIONS: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateCronFunctions: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_CRON_FUNCTIONS_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateCronFunctions: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_CRON_FUNCTIONS_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateCronFunctions: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		/**************************** END **************************/

		case userTypes.START_GET_SHOP_DETAIL: {
			const stateReducer: IUserState = {
				...state,
				startShopDetail: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.GET_SHOP_DETAIL_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				startShopDetail: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.GET_SHOP_DETAIL_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				startShopDetail: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_CREATE_SCHEDULERS: {
			const stateReducer: IUserState = {
				...state,
				stateCreateOneScheduler: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_SCHEDULERS_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateCreateOneScheduler: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_SCHEDULERS_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateCreateOneScheduler: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_UPDATE_SCHEDULERS: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateOneScheduler: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_SCHEDULERS_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateOneScheduler: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_SCHEDULERS_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateOneScheduler: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_CREATE_SHOP: {
			const stateReducer: IUserState = {
				...state,
				stateCreateShop: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_SHOP_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateCreateShop: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_SHOP_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateCreateShop: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_GET_SHOP_DETAIL_PLATFORM: {
			const stateReducer: IUserState = {
				...state,
				stateListShopPlatform: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.GET_SHOP_DETAIL_FLATFORM_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateListShopPlatform: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.GET_SHOP_DETAIL_FLATFORM_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateListShopPlatform: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_CREATE_SHOP_DETAIL_PLATFORM: {
			const stateReducer: IUserState = {
				...state,
				stateCreateShopPlatform: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_SHOP_DETAIL_FLATFORM_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateCreateShopPlatform: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.CREATE_SHOP_DETAIL_FLATFORM_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateCreateShopPlatform: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_UPDATE_SHOP_DETAIL_PLATFORM: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateShopPlatform: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_SHOP_DETAIL_FLATFORM_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateShopPlatform: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_SHOP_DETAIL_FLATFORM_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateShopPlatform: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		case userTypes.START_UPDATE_SHOP_STATUS: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateShopStatus: {
					...rootState,
					isLoading: true
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_SHOP_STATUS_SUCCESS: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateShopStatus: {
					...rootState,
					isLoading: false,
					data: response.data,
					message: response.message,
					success: response.success
				}
			};
			return stateReducer;
		}
		case userTypes.UPDATE_SHOP_STATUS_FAILURE: {
			const stateReducer: IUserState = {
				...state,
				stateUpdateShopStatus: {
					...rootState,
					isLoading: false,
					message: response.message,
					error: true
				}
			};
			return stateReducer;
		}

		default:
			return state;
	}
};

export default accountReducer;
