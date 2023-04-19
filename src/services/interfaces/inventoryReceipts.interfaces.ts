import { IRootState } from "./root.interfaces";

export interface IInventoryState {
	stateListInventory: IRootState;
	stateInventoryById: IRootState;
	stateCreateOneInventory: IRootState;
	stateUpdateOneInventory: IRootState;
}
