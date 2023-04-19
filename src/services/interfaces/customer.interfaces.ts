import { IRootState } from "./root.interfaces";

export interface ICustomerState {
  stateListCustomer: IRootState;
  stateCustomerById: IRootState;  
  stateCreateCustomer: IRootState;
  stateUpdateCustomer: IRootState;
}
