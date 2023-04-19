import { IRootState } from "./root.interfaces";

export interface IImportState {
  stateListImport: IRootState;
  stateImportById: IRootState;
  stateCreateOneImport: IRootState;
  stateUpdateOneImport: IRootState;
}
