import { IRootState } from "./root.interfaces";

export interface IAttributeState {
	stateAttributesList: IRootState;
	stateAttributeById: IRootState;
	stateUpdateAttribute: IRootState;
	stateCreateAttribute: IRootState;
	stateUpdateAttributeStatus: IRootState;
	stateAddCatesFeature: IRootState;
}
