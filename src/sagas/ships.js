import { call, takeEvery, takeLatest, put } from 'redux-saga/effects'
import { POST_FILTER_SHIPS, POST_SEARCH_SHIP_KEYWORD, POST_SHIP, POST_SHIP_DATA } from '../actions/ships';
import { setInitData } from '../reducers/initialData';
import { setSearchShipsList, setShipsFilter } from '../reducers/ships';
import { setShipsFilterValues } from '../reducers/shipsFilter';
import { apiFilterShipsData, apiPostSearchShipKeyword, apiPostShip, apiPostShipData } from '../services/api';

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
  const { payload: { data, onSuccess, onError } } = action;
  try {
    const result = yield call(apiPostShipData, data);
    yield put(setInitData(result))
    if (onSuccess) {
      onSuccess();
    }
  }
  catch(error) {
    if (onError) {
      onError();
    }
    console.log(error);
  }
  finally {

  }
}

function* filterShips(action) {
  const { payload: { data, onSuccess, onError } } = action;
  try {
    const filterResult = yield call(apiFilterShipsData, data);
    yield put(setShipsFilter(filterResult));
    yield put(setShipsFilterValues(data))
    if (onSuccess) {
      onSuccess();
    }
  }
  catch(error) {
    if (onError) {
      onError();
    }
    console.log(error);
  }
  finally {

  }
}


function* shipsWatcher() {
  yield takeEvery(POST_SHIP, postShip);
  yield takeEvery(POST_SHIP_DATA, saveShipData);
  yield takeLatest(POST_SEARCH_SHIP_KEYWORD, searchShipByKeyWord);
  yield takeEvery(POST_FILTER_SHIPS, filterShips);
}

export {
    shipsWatcher
};