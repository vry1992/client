import { call, takeEvery } from 'redux-saga/effects'
import { POST_SHIP } from '../actions/ships';
import { apiPostShip } from '../services/api';

function* postShip(action) {
  const { payload } = action;
  try {
    const result = yield call(apiPostShip, payload);
    console.log(result, saga);
  }
  catch(error) {

  }
  finally {

  }
}

function* shipsWatcher() {
  yield takeEvery(POST_SHIP, postShip);
}

export {
    shipsWatcher
};