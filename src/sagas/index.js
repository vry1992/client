import { all } from 'redux-saga/effects'
import { unitWatcher } from "./unit";

export default function* rootSaga() {
  yield all([
    unitWatcher(),
  ])
}