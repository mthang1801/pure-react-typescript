import { IRootState } from "./root.interfaces";

export interface IConfigsState {
	stateListConfigs: IRootState;
	stateConfigsById: IRootState;
	stateCreateOneConfigs: IRootState;
	stateUpdateOneConfigs: IRootState;
}
