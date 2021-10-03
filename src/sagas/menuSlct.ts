import { put, call, all, fork, take, takeLeading, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import { MenuData, WishData } from '../types/sagas';

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
    return () => {
      socket.off('GET /api/menu-slct Success', emitter);
    };
  });
};

const stockIncrAPI = async (payload: { menuData: MenuData }) => {
  const menu_name = payload.menuData.menu_name;
  const menu_stock = payload.menuData.menu_stock + 1;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-slct');
};

const stockDecrAPI = async (payload: { menuData: MenuData }) => {
  const menu_name = payload.menuData.menu_name;
  const menu_stock = payload.menuData.menu_stock - 1;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-slct');
};

const stockRestAPI = async (payload: { menuData: MenuData; wishData: WishData }) => {
  const menu_name = payload.menuData.menu_name;
  const menu_stock = payload.menuData.menu_stock + payload.wishData.wish_quantity;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-slct');
};

function* getMenu() {
  const channel: ReturnType<typeof getMenuAPI> = yield call(getMenuAPI);
  while (true) {
    try {
      const payload: {} = yield take(channel);
      yield put(GET_MENU_MENU_SLCT_SUCCESS({ data: payload }));
    } catch (err: any) {
      yield put(GET_MENU_MENU_SLCT_FAILURE({ error: err.response.data }));
      channel.close();
    }
  }
}

function* stockIncr(action: { payload: { menuData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(stockIncrAPI, action.payload);
    yield put(STOCK_INCR_MENU_SLCT_SUCCESS({ data: result.data }));
  } catch (err: any) {
    yield put(STOCK_INCR_MENU_SLCT_FAILURE({ error: err.response.data }));
  }
}

function* stockDecr(action: { payload: { menuData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(stockDecrAPI, action.payload);
    yield put(STOCK_DECR_MENU_SLCT_SUCCESS({ data: result.data }));
  } catch (err: any) {
    yield put(STOCK_DECR_MENU_SLCT_FAILURE({ error: err.response.data }));
  }
}

function* stockRest(action: { payload: { menuData: MenuData; wishData: WishData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(stockRestAPI, action.payload);
    yield put(STOCK_REST_MENU_SLCT_SUCCESS({ data: result.data }));
  } catch (err: any) {
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
