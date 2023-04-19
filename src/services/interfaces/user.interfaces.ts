import { IRootState } from "./root.interfaces";

export interface IUserState {
	stateListShopPlatform: IRootState;
	stateCreateShopPlatform: IRootState;
	stateUpdateShopPlatform: IRootState;
	stateUpdateShopStatus: IRootState;
	stateCreateShop: IRootState;
	startShopDetail: IRootState;
	stateGetListUserSystem: IRootState;
	stateGetUserSystemById: IRootState;
	stateUpdateOneUserSystem: IRootState;
	stateCreateOneUserSystem: IRootState;
	stateGetListUserGroups: IRootState;
	stateGetUserGroupsByid: IRootState;
	stateCreateOneUserGroups: IRootState;
	stateUpdateOneUserGroups: IRootState;
	stateGetListUserGroupsPrivilege: IRootState;
	stateGetListShop: IRootState;
	stateGetListSchedulers: IRootState;
	stateCreateOneScheduler: IRootState;
	stateUpdateOneScheduler: IRootState;
	stateUpdateCronFunctions: IRootState;
	stateGetCronFunctions: IRootState;
	stateCreateCronFunctions: IRootState;
}
