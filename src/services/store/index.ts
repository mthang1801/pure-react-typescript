import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSagas from "../actions/sagas/root.sagas";
import rootReducers from "../reducers/root.reducers";

const sagaMiddleware = createSagaMiddleware();
const middlewares: any[] = [sagaMiddleware];

const composeEnchancer = (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

const configureStore = () => {
	const store = createStore(rootReducers, composeEnchancer(applyMiddleware(...middlewares)));
	sagaMiddleware.run(rootSagas);
	return store;
};

export default configureStore;
