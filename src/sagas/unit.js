import { call, takeEvery, put } from 'redux-saga/effects'
import { POST_UNIT } from '../actions/newUnit';
import { apiPostUnit } from '../services/api';
import { setInitData } from '../reducers/initialData';

function* postUnit(action) {
  const { payload } = action;
  try {
    const data = yield call(apiPostUnit, payload);
    yield put(setInitData(data));
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