import {put, call, all, fork, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_MENU_MENU_MGNT_REQUEST,
  GET_MENU_MENU_MGNT_SUCCESS,
  GET_MENU_MENU_MGNT_FAILURE,
  CHANGE_MENU_MENU_MGNT_REQUEST,
  CHANGE_MENU_MENU_MGNT_SUCCESS,
  CHANGE_MENU_MENU_MGNT_FAILURE,
} from '../reducers/menuMgnt';

const getMenuAPI = () => {
  return axios.get('/api/menu-mgnt');
};

const changeMenuAPI = (menuData) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock;
  axios.patch('/api/menu-mgnt', {menu_name, menu_stock});
  axios.patch('/api/menu-slct', {menu_name, menu_stock});
  return axios.get('/api/menu-mgnt');
};

function* getMenu() {
  try {
    const result = yield call(getMenuAPI);
    yield put(GET_MENU_MENU_MGNT_SUCCESS({data: result.data}));
  } catch (err) {
    yield put(GET_MENU_MENU_MGNT_FAILURE({error: err.response.data}));
  }
}

function* changeMenu(action) {
  try {
    const result = yield call(changeMenuAPI, action.payload.menuData);
    yield put(CHANGE_MENU_MENU_MGNT_SUCCESS({data: result.data}));
  } catch (err) {
    yield put(CHANGE_MENU_MENU_MGNT_FAILURE({error: err.response.data}));
  }
}

function* watchGetMenu() {
  yield takeLatest(GET_MENU_MENU_MGNT_REQUEST, getMenu);
}

function* watchChangeMenu() {
  yield takeEvery(CHANGE_MENU_MENU_MGNT_REQUEST, changeMenu);
}

export default function* menuMgnt() {
  yield all([fork(watchGetMenu), fork(watchChangeMenu)]);
}
