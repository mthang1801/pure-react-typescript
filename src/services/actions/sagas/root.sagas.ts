import { all } from "redux-saga/effects";
import accountSagas from "./account.sagas";
import attributeSagas from "./attribute.sagas";
import billsSagas from "./bills.sagas";
import catalogsSagas from "./catalogs.sagas";
import categorySagas from "./category.sagas";
import codSagas from "./cod.sagas";
import configsSagas from "./configSetting.sagas";
import customerSagas from "./customer.sagas";
import globalSagas from "./global.sagas";
import importSagas from "./importStore.sagas";
import inventorySagas from "./inventoryReceipts.sagas";
import moduleFunctionSagas from "./moduleFunction.sagas";
import ordersSagas from "./orders.sagas";
import packageSagas from "./packages.sagas";
import productSagas from "./product.sagas";
import shippingSagas from "./shipping.sagas";
import storesSagas from "./stores.sagas";
import suppliersSagas from "./suppliers.sagas";
import userSagas from "./user.sagas";
function* rootSagas() {
	yield all([
		...globalSagas,
		...accountSagas,
		...productSagas,
		...ordersSagas,
		...customerSagas,
		...userSagas,
		...storesSagas,
		...suppliersSagas,
		...attributeSagas,
		...importSagas,
		...shippingSagas,
		...moduleFunctionSagas,
		...catalogsSagas,
		...categorySagas,
		...inventorySagas,
		...billsSagas,
		...codSagas,
		...configsSagas,
		...packageSagas
	]);
}

export default rootSagas;
