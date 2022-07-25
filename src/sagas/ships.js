import { call, takeEvery, takeLatest, put } from 'redux-saga/effects'
import { POST_SEARCH_SHIP_KEYWORD, POST_SHIP, POST_SHIP_DATA } from '../actions/ships';
import { setSearchShipsList } from '../reducers/ships';
import { apiPostSearchShipKeyword, apiPostShip, apiPostShipData } from '../services/api';

function* postShip(action) {
  const { payload } = action;
  try {
    const result = yield call(apiPostShip, payload);
  }
  catch(error) {

  }
  finally {

  }
}

function* searchShipByKeyWord(action) {
  const { payload } = action;
  try {
    const result = yield call(apiPostSearchShipKeyword, payload.data);
    if (result.length) {
      yield put(setSearchShipsList(result));
    }
    else {
      payload.onError();
      yield put(setSearchShipsList([]));
    }
  }
  catch(error) {

  }
  finally {

  }
}

function* saveShipData(action) {
  const { payload } = action;
  try {
    const result = yield call(apiPostShipData, payload.data);
  }
  catch(error) {

  }
  finally {

  }
}


function* shipsWatcher() {
  yield takeEvery(POST_SHIP, postShip);
  yield takeEvery(POST_SHIP_DATA, saveShipData);
  yield takeLatest(POST_SEARCH_SHIP_KEYWORD, searchShipByKeyWord);
}

export {
    shipsWatcher
};