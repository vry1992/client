import { call, all, takeEvery } from 'redux-saga/effects'
import { apiGetInit, apiPostUnit } from '../services/api';

function* getInit() {
  try {
    const result = yield call(apiGetInit);
    console.log(result, saga);
  }
  catch(error) {

  }
  finally {

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