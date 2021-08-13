import {put, call, all, fork, takeEvery} from 'redux-saga/effects';
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

const getMenuAPI = () => {
  return axios.get('/api/menu-slct');
};

const stockIncrAPI = (menuData) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock + 1;
  axios.patch('/api/menu-slct', {menu_name, menu_stock});
  return axios.get('/api/menu-slct');
};

const stockDecrAPI = (menuData) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock - 1;
  axios.patch('/api/menu-slct', {menu_name, menu_stock});
  return axios.get('/api/menu-slct');
};

const stockRestAPI = ({menuData, wishData}) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock + wishData.wish_quantity;
  axios.patch('/api/menu-slct', {menu_name, menu_stock});
  return axios.get('/api/menu-slct');
};

function* getMenu() {
  try {
    const result = yield call(getMenuAPI);
    yield put(GET_MENU_MENU_SLCT_SUCCESS({data: result.data}));
  } catch (err) {
    yield put(GET_MENU_MENU_SLCT_FAILURE({error: err.response.data}));
  }
}

function* stockIncr(action) {
  try {
    const result = yield call(stockIncrAPI, action.payload.menuData);
    yield put(STOCK_INCR_MENU_SLCT_SUCCESS({data: result.data}));
  } catch (err) {
    yield put(STOCK_INCR_MENU_SLCT_FAILURE({error: err.response.data}));
  }
}

function* stockDecr(action) {
  try {
    const result = yield call(stockDecrAPI, action.payload.menuData);
    yield put(STOCK_DECR_MENU_SLCT_SUCCESS({data: result.data}));
  } catch (err) {
    yield put(STOCK_DECR_MENU_SLCT_FAILURE({error: err.response.data}));
  }
}

function* stockRest(action) {
  try {
    const result = yield call(stockRestAPI, {
      menuData: action.payload.menuData,
      wishData: action.payload.wishData,
    });
    yield put(STOCK_REST_MENU_SLCT_SUCCESS({data: result.data}));
  } catch (err) {
    yield put(STOCK_REST_MENU_SLCT_FAILURE({error: err.response.data}));
  }
}

function* watchGetMenu() {
  yield takeEvery(GET_MENU_MENU_SLCT_REQUEST, getMenu);
}

function* watchStockIncr() {
  yield takeEvery(STOCK_INCR_MENU_SLCT_REQUEST, stockIncr);
}

function* watchStockDecr() {
  yield takeEvery(STOCK_DECR_MENU_SLCT_REQUEST, stockDecr);
}

function* watchStockRest() {
  yield takeEvery(STOCK_REST_MENU_SLCT_REQUEST, stockRest);
}

export default function* menuSlct() {
  yield all([fork(watchGetMenu), fork(watchStockIncr), fork(watchStockDecr), fork(watchStockRest)]);
}
