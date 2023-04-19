import { IRootState } from "./root.interfaces";

export interface IShippingState {
  stateListShipping: IRootState;
  stateShippingById: IRootState;
  stateCreateOneShipping: IRootState;
  stateUpdateOneShipping: IRootState;
}
