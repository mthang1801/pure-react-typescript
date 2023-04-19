import { IRootState } from './root.interfaces';

export interface IModuleFunctionState {
	stateModuleFunctionsList : IRootState;
	stateModuleFunctionById : IRootState;
	stateChildrenModuleFunctionById : IRootState;
	stateUpdateModuleFunction : IRootState;
	stateCreateModuleFunction : IRootState;
	stateUpdateModuleFunctionIndexes : IRootState;
}
