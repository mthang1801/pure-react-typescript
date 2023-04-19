import { IRootState } from "./root.interfaces";

export interface ICatalogsState {
	stateListCatalogs: IRootState;
	stateCatalogById: IRootState;
	stateCreateOneCatalog: IRootState;
	stateUpdateOneCatalog: IRootState;
	stateUpdateStatusCategoryCatalog: IRootState;
	stateUpdateIndexCatalog: IRootState;
}
