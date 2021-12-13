import { put, call, all, fork, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import { WishData, OrderData } from '../types/sagas';

import { orderSheetActions } from '../reducers/orderSheet';

const socket = io('/api/ordersheet', { path: '/socket', transports: ['websocket'] });

const getOrderAPI = (payload: { table: string }) => {
  return eventChannel((emitter) => {
    socket.emit('GET /api/ordersheet Request', payload.table);
    socket.on('GET /api/ordersheet Success', emitter);
    return () => {
      socket.off('GET /api/ordersheet Success', emitter);
    };
  });
};

const addOrderAPI = async (payload: { table: string; wishData: WishData }) => {
  const menu_name = payload.wishData.menu_name;
  const order_quantity = payload.wishData.wish_quantity;
  await axios.post(`/api/ordersheet/${payload.table}`, { menu_name, order_quantity });
  return await axios.get(`/api/ordersheet/${payload.table}`);
};

const quanIncrAPI = async (payload: {
  table: string;
  wishData: WishData;
  orderData: OrderData;
}) => {
  const menu_name = payload.orderData.menu_name;
  const order_quantity = payload.orderData.order_quantity + payload.wishData.wish_quantity;
  await axios.patch(`/api/ordersheet/${payload.table}`, { menu_name, order_quantity });
  return await axios.get(`/api/ordersheet/${payload.table}`);
};

function* getOrder(action: { payload: { table: string } }) {
  const channel: ReturnType<typeof getOrderAPI> = yield call(getOrderAPI, action.payload);
  while (true) {
    try {
      const payload: { table: string; data: Array<OrderData> } = yield take(channel);
      yield put(orderSheetActions.getOrder_success({ table: payload.table, data: payload.data }));
    } catch (err: any) {
      yield put(orderSheetActions.getOrder_failure({ error: err.response.data }));
      channel.close();
    }
  }
}

function* addOrder(action: { payload: { table: string; wishData: WishData } }) {
  try {
    const result: AxiosResponse<Array<OrderData>> = yield call(addOrderAPI, action.payload);
    yield put(
      orderSheetActions.addOrder_success({
        table: action.payload.table,
        data: result.data,
      }),
    );
  } catch (err: any) {
    yield put(orderSheetActions.addOrder_failure({ error: err.response.data }));
  }
}

function* quanIncr(action: {
  payload: { table: string; wishData: WishData; orderData: OrderData };
}) {
  try {
    const result: AxiosResponse<Array<OrderData>> = yield call(quanIncrAPI, action.payload);
    yield put(
      orderSheetActions.quanIncr_success({
        table: action.payload.table,
        data: result.data,
      }),
    );
  } catch (err: any) {
    yield put(orderSheetActions.quanIncr_failure({ error: err.response.data }));
  }
}

function* watchGetOrder() {
  yield takeLatest(orderSheetActions.getOrder_request, getOrder);
}

function* watchAddOrder() {
  yield takeLatest(orderSheetActions.addOrder_request, addOrder);
}

function* watchQuanIncr() {
  yield takeLatest(orderSheetActions.quanIncr_request, quanIncr);
}

export default function* orderSheet() {
  yield all([fork(watchGetOrder), fork(watchAddOrder), fork(watchQuanIncr)]);
}
