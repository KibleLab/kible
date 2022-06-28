import { all, fork } from 'redux-saga/effects';

import menuSlct from './menuSlct';
import wishList from './wishList';
import orderSheet from './orderSheet';

export default function* rootSaga() {
  yield all([fork(menuSlct), fork(wishList), fork(orderSheet)]);
}
