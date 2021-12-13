import { put, call, all, fork, take, takeLeading, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import { MenuData, WishData } from '../types/sagas';

import { menuSlctActions } from '../reducers/menuSlct';

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
      yield put(menuSlctActions.getMenu_success({ data: payload }));
    } catch (err: any) {
      yield put(menuSlctActions.getMenu_failure({ error: err.response.data }));
      channel.close();
    }
  }
}

function* stockIncr(action: { payload: { menuData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(stockIncrAPI, action.payload);
    yield put(menuSlctActions.stockIncr_success({ data: result.data }));
  } catch (err: any) {
    yield put(menuSlctActions.stockIncr_failure({ error: err.response.data }));
  }
}

function* stockDecr(action: { payload: { menuData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(stockDecrAPI, action.payload);
    yield put(menuSlctActions.stockDecr_success({ data: result.data }));
  } catch (err: any) {
    yield put(menuSlctActions.stockDecr_failure({ error: err.response.data }));
  }
}

function* stockRest(action: { payload: { menuData: MenuData; wishData: WishData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(stockRestAPI, action.payload);
    yield put(menuSlctActions.stockRest_success({ data: result.data }));
  } catch (err: any) {
    yield put(menuSlctActions.stockRest_failure({ error: err.response.data }));
  }
}

function* watchGetMenu() {
  yield takeLatest(menuSlctActions.getMenu_request, getMenu);
}

function* watchStockIncr() {
  yield takeLeading(menuSlctActions.stockIncr_request, stockIncr);
}

function* watchStockDecr() {
  yield takeLeading(menuSlctActions.stockDecr_request, stockDecr);
}

function* watchStockRest() {
  yield takeLatest(menuSlctActions.stockRest_request, stockRest);
}

export default function* menuSlct() {
  yield all([fork(watchGetMenu), fork(watchStockIncr), fork(watchStockDecr), fork(watchStockRest)]);
}
