import { put, call, all, fork, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { io } from 'socket.io-client';
import axios from 'axios';

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
  return eventChannel((emit) => {
    const emitter = (result) => {
      emit(result);
    };
    socket.emit('GET /api/menu-mgnt Request');
    socket.on('GET /api/menu-mgnt Success', emitter);
  });
};

const changeMenuAPI = ({ menuData }) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock;
  axios.patch('/api/menu-mgnt', { menu_name, menu_stock });
  axios.patch('/api/menu-slct', { menu_name, menu_stock });
  return axios.get('/api/menu-mgnt');
};

function* getMenu() {
  try {
    const result = yield call(getMenuAPI);
    while (true) {
      const channel = yield take(result);
      yield put(GET_MENU_MENU_MGNT_SUCCESS({ data: channel }));
    }
  } catch (err) {
    yield put(GET_MENU_MENU_MGNT_FAILURE({ error: err.response.data }));
  }
}

function* changeMenu(action) {
  try {
    const result = yield call(changeMenuAPI, { menuData: action.payload.menuData });
    yield put(CHANGE_MENU_MENU_MGNT_SUCCESS({ data: result.data }));
  } catch (err) {
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
