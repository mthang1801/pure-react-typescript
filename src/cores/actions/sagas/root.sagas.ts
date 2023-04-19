import { all } from 'redux-saga/effects';
import globalSagas from './global.sagas';

function* rootSagas() {
	yield all([...globalSagas]);
}

export default rootSagas;
