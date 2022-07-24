import { call, takeEvery, put } from 'redux-saga/effects'
import { POST_UNIT } from '../actions/newUnit';
import { apiPostUnit } from '../services/api';
import { setUnitNames } from '../reducers/units';

function* postUnit(action) {
  const { payload } = action;
  try {
    const { unitNames } = yield call(apiPostUnit, payload);
    yield put(setUnitNames(unitNames));
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