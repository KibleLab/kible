import { put, call, all, fork, take, takeLeading, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios from 'axios';

import {
  GET_MENU_MENU_SLCT_REQUEST,
  GET_MENU_MENU_SLCT_SUCCESS,
  GET_MENU_MENU_SLCT_FAILURE,
  STOCK_INCR_MENU_SLCT_REQUEST,
  STOCK_INCR_MENU_SLCT_SUCCESS,
  STOCK_INCR_MENU_SLCT_FAILURE,
  STOCK_DECR_MENU_SLCT_REQUEST,
  STOCK_DECR_MENU_SLCT_SUCCESS,
  STOCK_DECR_MENU_SLCT_FAILURE,
  STOCK_REST_MENU_SLCT_REQUEST,
  STOCK_REST_MENU_SLCT_SUCCESS,
  STOCK_REST_MENU_SLCT_FAILURE,
} from '../reducers/menuSlct';

const socket = io('/api/menu-slct', { path: '/socket', transports: ['websocket'] });

const getMenuAPI = () => {
  return eventChannel((emitter) => {
    socket.emit('GET /api/menu-slct Request');
    socket.on('GET /api/menu-slct Success', emitter);
  });
};

const stockIncrAPI = async ({ menuData }) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock + 1;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-slct');
};

const stockDecrAPI = async ({ menuData }) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock - 1;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-slct');
};

const stockRestAPI = async ({ menuData, wishData }) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock + wishData.wish_quantity;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-slct');
};

function* getMenu() {
  try {
    const result = yield call(getMenuAPI);
    while (true) {
      const channel = yield take(result);
      yield put(GET_MENU_MENU_SLCT_SUCCESS({ data: channel }));
    }
  } catch (err) {
    yield put(GET_MENU_MENU_SLCT_FAILURE({ error: err.response.data }));
  }
}

function* stockIncr(action) {
  try {
    const result = yield call(stockIncrAPI, { menuData: action.payload.menuData });
    yield put(STOCK_INCR_MENU_SLCT_SUCCESS({ data: result.data }));
  } catch (err) {
    yield put(STOCK_INCR_MENU_SLCT_FAILURE({ error: err.response.data }));
  }
}

function* stockDecr(action) {
  try {
    const result = yield call(stockDecrAPI, { menuData: action.payload.menuData });
    yield put(STOCK_DECR_MENU_SLCT_SUCCESS({ data: result.data }));
  } catch (err) {
    yield put(STOCK_DECR_MENU_SLCT_FAILURE({ error: err.response.data }));
  }
}

function* stockRest(action) {
  try {
    const result = yield call(stockRestAPI, {
      menuData: action.payload.menuData,
      wishData: action.payload.wishData,
    });
    yield put(STOCK_REST_MENU_SLCT_SUCCESS({ data: result.data }));
  } catch (err) {
    yield put(STOCK_REST_MENU_SLCT_FAILURE({ error: err.response.data }));
  }
}

function* watchGetMenu() {
  yield takeLatest(GET_MENU_MENU_SLCT_REQUEST, getMenu);
}

function* watchStockIncr() {
  yield takeLeading(STOCK_INCR_MENU_SLCT_REQUEST, stockIncr);
}

function* watchStockDecr() {
  yield takeLeading(STOCK_DECR_MENU_SLCT_REQUEST, stockDecr);
}

function* watchStockRest() {
  yield takeLatest(STOCK_REST_MENU_SLCT_REQUEST, stockRest);
}

export default function* menuSlct() {
  yield all([fork(watchGetMenu), fork(watchStockIncr), fork(watchStockDecr), fork(watchStockRest)]);
}
