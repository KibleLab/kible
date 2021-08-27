import { all, fork } from 'redux-saga/effects';

import menuMgnt from './menuMgnt';
import menuSlct from './menuSlct';
import wishList from './wishList';
import orderSheet from './orderSheet';

export default function* rootSaga() {
  yield all([fork(menuMgnt), fork(menuSlct), fork(wishList), fork(orderSheet)]);
}
