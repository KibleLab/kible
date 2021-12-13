import { put, call, all, fork, take, takeLeading, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import { MenuData, WishData } from '../types/sagas';

import { wishListActions } from '../reducers/wishList';

const socket = io('/api/wishlist', { path: '/socket', transports: ['websocket'] });

const getWishAPI = (payload: { table: string }) => {
  return eventChannel((emitter) => {
    socket.emit('GET /api/wishlist Request', payload.table);
    socket.on('GET /api/wishlist Success', emitter);
    return () => {
      socket.off('GET /api/wishlist Success', emitter);
    };
  });
};

const addWishAPI = async (payload: { table: string; menuData: MenuData }) => {
  const menu_name = payload.menuData.menu_name;
  await axios.post(`/api/wishlist/${payload.table}`, { menu_name });
  return await axios.get(`/api/wishlist/${payload.table}`);
};

const deleteWishAPI = async (payload: { table: string; wishData: WishData }) => {
  const menu_name = payload.wishData.menu_name;
  await axios.delete(`/api/wishlist/${payload.table}`, { data: { menu_name } });
  return await axios.get(`/api/wishlist/${payload.table}`);
};

const resetWishAPI = async (payload: { table: string }) => {
  await axios.delete(`/api/wishlist/reset/${payload.table}`);
  return await axios.get(`/api/wishlist/${payload.table}`);
};

const quanIncrAPI = async (payload: { table: string; wishData: WishData }) => {
  const menu_name = payload.wishData.menu_name;
  const wish_quantity = payload.wishData.wish_quantity + 1;
  await axios.patch(`/api/wishlist/${payload.table}`, { menu_name, wish_quantity });
  return await axios.get(`/api/wishlist/${payload.table}`);
};

const quanDecrAPI = async (payload: { table: string; wishData: WishData }) => {
  const menu_name = payload.wishData.menu_name;
  const wish_quantity = payload.wishData.wish_quantity - 1;
  await axios.patch(`/api/wishlist/${payload.table}`, { menu_name, wish_quantity });
  return await axios.get(`/api/wishlist/${payload.table}`);
};

function* getWish(action: { payload: { table: string } }) {
  const channel: ReturnType<typeof getWishAPI> = yield call(getWishAPI, action.payload);
  while (true) {
    try {
      const payload: { table: string; data: Array<WishData> } = yield take(channel);
      yield put(wishListActions.getWish_success({ table: payload.table, data: payload.data }));
    } catch (err: any) {
      yield put(wishListActions.getWish_failure({ error: err.response.data }));
      channel.close();
    }
  }
}

function* addWish(action: { payload: { table: string; menuData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<WishData>> = yield call(addWishAPI, action.payload);
    yield put(wishListActions.addWish_success({ table: action.payload.table, data: result.data }));
  } catch (err: any) {
    yield put(wishListActions.addWish_failure({ error: err.response.data }));
  }
}

function* deleteWish(action: { payload: { table: string; wishData: WishData } }) {
  try {
    const result: AxiosResponse<Array<WishData>> = yield call(deleteWishAPI, action.payload);
    yield put(
      wishListActions.deleteWish_success({
        table: action.payload.table,
        data: result.data,
      }),
    );
  } catch (err: any) {
    yield put(wishListActions.deleteWish_failure({ error: err.response.data }));
  }
}

function* resetWish(action: { payload: { table: string } }) {
  try {
    const result: AxiosResponse<Array<WishData>> = yield call(resetWishAPI, action.payload);
    yield put(
      wishListActions.resetWish_success({
        table: action.payload.table,
        data: result.data,
      }),
    );
  } catch (err: any) {
    yield put(wishListActions.resetWish_failure({ error: err.response.data }));
  }
}

function* quanIncr(action: { payload: { table: string; wishData: WishData } }) {
  try {
    const result: AxiosResponse<Array<WishData>> = yield call(quanIncrAPI, action.payload);
    yield put(wishListActions.quanIncr_success({ table: action.payload.table, data: result.data }));
  } catch (err: any) {
    yield put(wishListActions.quanIncr_failure({ error: err.response.data }));
  }
}

function* quanDecr(action: { payload: { table: string; wishData: WishData } }) {
  try {
    const result: AxiosResponse<Array<WishData>> = yield call(quanDecrAPI, action.payload);
    yield put(wishListActions.quanDecr_success({ table: action.payload.table, data: result.data }));
  } catch (err: any) {
    yield put(wishListActions.quanDecr_failure({ error: err.response.data }));
  }
}

function* watchGetWish() {
  yield takeLatest(wishListActions.getWish_request, getWish);
}

function* watchAddWish() {
  yield takeLeading(wishListActions.addWish_request, addWish);
}

function* watchDeleteWish() {
  yield takeLeading(wishListActions.deleteWish_request, deleteWish);
}

function* watchResetWish() {
  yield takeLatest(wishListActions.resetWish_request, resetWish);
}

function* watchQuanIncr() {
  yield takeLeading(wishListActions.quanIncr_request, quanIncr);
}

function* watchQuanDecr() {
  yield takeLeading(wishListActions.quanDecr_request, quanDecr);
}

export default function* wishList() {
  yield all([
    fork(watchGetWish),
    fork(watchAddWish),
    fork(watchDeleteWish),
    fork(watchResetWish),
    fork(watchQuanIncr),
    fork(watchQuanDecr),
  ]);
}
