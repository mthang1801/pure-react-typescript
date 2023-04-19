import { IRootState } from "./root.interfaces";

export interface IProductState {
	stateCreateProduct: IRootState;
	stateProductsList: IRootState;
	stateGetProductById: IRootState;
	stateUpdateProductById: IRootState;
	stateGetProductLogs: IRootState;
}
