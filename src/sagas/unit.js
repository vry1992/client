import { call, takeEvery } from 'redux-saga/effects'
import { POST_UNIT } from '../actions/newUnit';
import { apiPostUnit } from '../services/api';

function* postUnit(action) {
  const { payload } = action;
  try {
    const result = yield call(apiPostUnit, payload);
    console.log(result, saga);
  }
  catch(error) {

  }
  finally {

  }
}


function* unitWatcher() {
  yield takeEvery(POST_UNIT, postUnit);
}

export {
  unitWatcher
};