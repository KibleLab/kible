import {put, call, all, fork, take, takeEvery} from 'redux-saga/effects';
import {eventChannel} from '@redux-saga/core';
import {io} from 'socket.io-client';
import axios from 'axios';

import {
  GET_ORDER_ORDER_SHEET_REQUEST,
  GET_ORDER_ORDER_SHEET_SUCCESS,
  GET_ORDER_ORDER_SHEET_FAILURE,
  ADD_ORDER_ORDER_SHEET_REQUEST,
  ADD_ORDER_ORDER_SHEET_SUCCESS,
  ADD_ORDER_ORDER_SHEET_FAILURE,
  QUAN_INCR_ORDER_SHEET_REQUEST,
  QUAN_INCR_ORDER_SHEET_SUCCESS,
  QUAN_INCR_ORDER_SHEET_FAILURE,
} from '../reducers/orderSheet';

const socket = io('/api/ordersheet', {path: '/socket', transports: ['websocket']});

const getOrderAPI = (table) => {
  return eventChannel((emit) => {
    const emitter = (result) => {
      emit(result);
    };
    socket.emit('GET /api/ordersheet Request', table);
    socket.on('GET /api/ordersheet Success', emitter);
  });
};

const addOrderAPI = ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  const menu_price = wishData.menu_price;
  const order_quantity = wishData.wish_quantity;
  axios.post(`/api/ordersheet/${table}`, {menu_name, menu_price, order_quantity});
  return axios.get(`/api/ordersheet/${table}`);
};

const quanIncrAPI = ({table, wishData, orderData}) => {
  const menu_name = orderData.menu_name;
  const order_quantity = orderData.order_quantity + wishData.wish_quantity;
  axios.patch(`/api/ordersheet/${table}`, {menu_name, order_quantity});
  return axios.get(`/api/ordersheet/${table}`);
};

function* getOrder(action) {
  try {
    const result = yield call(getOrderAPI, action.payload.table);
    while (true) {
      const channel = yield take(result);
      console.log(channel);
      yield put(GET_ORDER_ORDER_SHEET_SUCCESS({table: action.payload.table, data: channel}));
    }
  } catch (err) {
    yield put(GET_ORDER_ORDER_SHEET_FAILURE({error: err.response.data}));
  }
}

function* addOrder(action) {
  try {
    const result = yield call(addOrderAPI, {
      table: action.payload.table,
      wishData: action.payload.wishData,
    });
    yield put(ADD_ORDER_ORDER_SHEET_SUCCESS({table: action.payload.table, data: result.data}));
  } catch (err) {
    yield put(ADD_ORDER_ORDER_SHEET_FAILURE({error: err.response.data}));
  }
}

function* quanIncr(action) {
  try {
    const result = yield call(quanIncrAPI, {
      table: action.payload.table,
      wishData: action.payload.wishData,
      orderData: action.payload.orderData,
    });
    yield put(QUAN_INCR_ORDER_SHEET_SUCCESS({table: action.payload.table, data: result.data}));
  } catch (err) {
    yield put(QUAN_INCR_ORDER_SHEET_FAILURE({error: err.response.data}));
  }
}

function* watchGetOrder() {
  yield takeEvery(GET_ORDER_ORDER_SHEET_REQUEST, getOrder);
}

function* watchAddOrder() {
  yield takeEvery(ADD_ORDER_ORDER_SHEET_REQUEST, addOrder);
}

function* watchQuanIncr() {
  yield takeEvery(QUAN_INCR_ORDER_SHEET_REQUEST, quanIncr);
}

export default function* orderSheet() {
  yield all([fork(watchGetOrder), fork(watchAddOrder), fork(watchQuanIncr)]);
}
