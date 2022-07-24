import { call, all, put } from 'redux-saga/effects'
import { INIT_ACTION } from '../actions/init';
import { apiGetInit } from '../services/api';
import { addLoaderAction, deleteLoaderAction } from '../reducers/loader'
import { setUnitNames } from '../reducers/units';

function* getInit(action = INIT_ACTION) {
  try {
    yield put(addLoaderAction({ action }))
    const { unitNames } = yield call(apiGetInit);
    yield put(setUnitNames(unitNames));
  }
  catch(error) {

  }
  finally {
    yield put(deleteLoaderAction({ action }))
  }
}


function* initWatcher() {
    yield all([
        call(getInit)
    ])
}

export {
  initWatcher
};