import { IRootState } from "./root.interfaces";

export interface IStoresState {
  stateListStores: IRootState;
  stateStoreById: IRootState;
  stateCreateOneStore: IRootState;
  stateUpdateOneStore: IRootState;
}
