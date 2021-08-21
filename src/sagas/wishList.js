import {put, call, all, fork, take, takeEvery} from 'redux-saga/effects';
import {eventChannel} from '@redux-saga/core';
import {io} from 'socket.io-client';
import axios from 'axios';

import {
  GET_WISH_WISH_LIST_REQUEST,
  GET_WISH_WISH_LIST_SUCCESS,
  GET_WISH_WISH_LIST_FAILURE,
  ADD_WISH_WISH_LIST_REQUEST,
  ADD_WISH_WISH_LIST_SUCCESS,
  ADD_WISH_WISH_LIST_FAILURE,
  DELETE_WISH_WISH_LIST_REQUEST,
  DELETE_WISH_WISH_LIST_SUCCESS,
  DELETE_WISH_WISH_LIST_FAILURE,
  RESET_WISH_WISH_LIST_REQUEST,
  RESET_WISH_WISH_LIST_SUCCESS,
  RESET_WISH_WISH_LIST_FAILURE,
  QUAN_INCR_WISH_LIST_REQUEST,
  QUAN_INCR_WISH_LIST_SUCCESS,
  QUAN_INCR_WISH_LIST_FAILURE,
  QUAN_DECR_WISH_LIST_REQUEST,
  QUAN_DECR_WISH_LIST_SUCCESS,
  QUAN_DECR_WISH_LIST_FAILURE,
} from '../reducers/wishList';

const socket = io('/api/wishlist', {path: '/socket', transports: ['websocket']});

const getWishAPI = (table) => {
  return eventChannel((emit) => {
    const emitter = (result) => {
      emit(result);
    };
    socket.emit('GET /api/wishlist Request', table);
    socket.on('GET /api/wishlist Success', emitter);
  });
};

const addWishAPI = ({table, menuData}) => {
  const menu_name = menuData.menu_name;
  const menu_price = menuData.menu_price;
  axios.post(`/api/wishlist/${table}`, {menu_name, menu_price});
  return axios.get(`/api/wishlist/${table}`);
};

const deleteWishAPI = ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  axios.delete(`/api/wishlist/${table}`, {data: {menu_name}});
  return axios.get(`/api/wishlist/${table}`);
};

const resetWishAPI = (table) => {
  axios.delete(`/api/wishlist/reset/${table}`);
  return axios.get(`/api/wishlist/${table}`);
};

const quanIncrAPI = ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  const wish_quantity = wishData.wish_quantity + 1;
  axios.patch(`/api/wishlist/${table}`, {menu_name, wish_quantity});
  return axios.get(`/api/wishlist/${table}`);
};

const quanDecrAPI = ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  const wish_quantity = wishData.wish_quantity - 1;
  axios.patch(`/api/wishlist/${table}`, {menu_name, wish_quantity});
  return axios.get(`/api/wishlist/${table}`);
};

function* getWish(action) {
  try {
    const result = yield call(getWishAPI, action.payload.table);
    while (true) {
      const channel = yield take(result);
      yield put(GET_WISH_WISH_LIST_SUCCESS({table: channel.table, data: channel.data}));
    }
  } catch (err) {
    yield put(GET_WISH_WISH_LIST_FAILURE({error: err.response.data}));
  }
}

function* addWish(action) {
  try {
    const result = yield call(addWishAPI, {
      table: action.payload.table,
      menuData: action.payload.menuData,
    });
    yield put(ADD_WISH_WISH_LIST_SUCCESS({table: action.payload.table, data: result.data}));
  } catch (err) {
    yield put(ADD_WISH_WISH_LIST_FAILURE({error: err.response.data}));
  }
}

function* deleteWish(action) {
  try {
    const result = yield call(deleteWishAPI, {
      table: action.payload.table,
      wishData: action.payload.wishData,
    });
    yield put(DELETE_WISH_WISH_LIST_SUCCESS({table: action.payload.table, data: result.data}));
  } catch (err) {
    yield put(DELETE_WISH_WISH_LIST_FAILURE({error: err.response.data}));
  }
}

function* resetWish(action) {
  try {
    const result = yield call(resetWishAPI, action.payload.table);
    yield put(RESET_WISH_WISH_LIST_SUCCESS({table: action.payload.table, data: result.data}));
  } catch (err) {
    yield put(RESET_WISH_WISH_LIST_FAILURE({error: err.response.data}));
  }
}

function* quanIncr(action) {
  try {
    const result = yield call(quanIncrAPI, {
      table: action.payload.table,
      wishData: action.payload.wishData,
    });
    yield put(QUAN_INCR_WISH_LIST_SUCCESS({table: action.payload.table, data: result.data}));
  } catch (err) {
    yield put(QUAN_INCR_WISH_LIST_FAILURE({error: err.response.data}));
  }
}

function* quanDecr(action) {
  try {
    const result = yield call(quanDecrAPI, {
      table: action.payload.table,
      wishData: action.payload.wishData,
    });
    yield put(QUAN_DECR_WISH_LIST_SUCCESS({table: action.payload.table, data: result.data}));
  } catch (err) {
    yield put(QUAN_DECR_WISH_LIST_FAILURE({error: err.response.data}));
  }
}

function* watchGetWish() {
  yield takeEvery(GET_WISH_WISH_LIST_REQUEST, getWish);
}

function* watchAddWish() {
  yield takeEvery(ADD_WISH_WISH_LIST_REQUEST, addWish);
}

function* watchDeleteWish() {
  yield takeEvery(DELETE_WISH_WISH_LIST_REQUEST, deleteWish);
}

function* watchResetWish() {
  yield takeEvery(RESET_WISH_WISH_LIST_REQUEST, resetWish);
}

function* watchQuanIncr() {
  yield takeEvery(QUAN_INCR_WISH_LIST_REQUEST, quanIncr);
}

function* watchQuanDecr() {
  yield takeEvery(QUAN_DECR_WISH_LIST_REQUEST, quanDecr);
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