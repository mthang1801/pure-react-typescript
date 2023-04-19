import { IRootState } from "./root.interfaces";

export interface IPackagesState {
	stateListPackages: IRootState;
	statePackagesById: IRootState;
	stateCreateOnePackages: IRootState;
	stateUpdateOnePackages: IRootState;
}
