import { put, call, all, fork, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import { MenuData } from '../types/sagas';

import {
  GET_MENU_MENU_MGNT_REQUEST,
  GET_MENU_MENU_MGNT_SUCCESS,
  GET_MENU_MENU_MGNT_FAILURE,
  CHANGE_MENU_MENU_MGNT_REQUEST,
  CHANGE_MENU_MENU_MGNT_SUCCESS,
  CHANGE_MENU_MENU_MGNT_FAILURE,
} from '../reducers/menuMgnt';

const socket = io('/api/menu-mgnt', { path: '/socket', transports: ['websocket'] });

const getMenuAPI = () => {
  return eventChannel((emitter) => {
    socket.emit('GET /api/menu-mgnt Request');
    socket.on('GET /api/menu-mgnt Success', emitter);
    return () => {
      socket.off('GET /api/menu-mgnt Success', emitter);
    };
  });
};

const changeMenuAPI = async (payload: { menuData: MenuData }) => {
  const menu_name = payload.menuData.menu_name;
  const menu_stock = payload.menuData.menu_stock;
  await axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return await axios.get('/api/menu-slct');
};

function* getMenu() {
  const channel: ReturnType<typeof getMenuAPI> = yield call(getMenuAPI);
  while (true) {
    try {
      const payload: {} = yield take(channel);
      yield put(GET_MENU_MENU_MGNT_SUCCESS({ data: payload }));
    } catch (err: any) {
      yield put(GET_MENU_MENU_MGNT_FAILURE({ error: err.response.data }));
      channel.close();
    }
  }
}

function* changeMenu(action: { payload: { menuData: MenuData } }) {
  try {
    const result: AxiosResponse<Array<MenuData>> = yield call(changeMenuAPI, action.payload);
    yield put(CHANGE_MENU_MENU_MGNT_SUCCESS({ data: result.data }));
  } catch (err: any) {
    yield put(CHANGE_MENU_MENU_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* watchGetMenu() {
  yield takeLatest(GET_MENU_MENU_MGNT_REQUEST, getMenu);
}

function* watchChangeMenu() {
  yield takeLatest(CHANGE_MENU_MENU_MGNT_REQUEST, changeMenu);
}

export default function* menuMgnt() {
  yield all([fork(watchGetMenu), fork(watchChangeMenu)]);
}
