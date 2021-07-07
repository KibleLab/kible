import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getWish = createAsyncThunk('addWish', async (table) => {
  const res = await axios.get(`/api/wishlist/${table}`);
  const temp = {table: table, data: res.data};
  return temp;
});

export const addWish = createAsyncThunk('addWish', async ({table, menuData}) => {
  const menu_name = menuData.menu_name;
  const menu_price = menuData.menu_price;
  await axios.post(`/api/wishlist/${table}`, {menu_name, menu_price});
  const res = await axios.get(`/api/wishlist/${table}`);
  const temp = {table: table, data: res.data};
  return temp;
});

export const delWish = createAsyncThunk('delWish', async ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  await axios.delete(`/api/wishlist/${table}`, {data: {menu_name}});
  const res = await axios.get(`/api/wishlist/${table}`);
  const temp = {table: table, data: res.data};
  return temp;
});

export const resetWish = createAsyncThunk('resetWish', async (table) => {
  await axios.delete(`/api/wishlist/reset/${table}`);
  const res = await axios.get(`/api/wishlist/${table}`);
  const temp = {table: table, data: res.data};
  return temp;
});

export const quanIncr = createAsyncThunk('quanIncr', async ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  const wish_quantity = wishData.wish_quantity + 1;
  await axios.patch(`/api/wishlist/${table}`, {menu_name, wish_quantity});
  const res = await axios.get(`/api/wishlist/${table}`);
  const temp = {table: table, data: res.data};
  return temp;
});

export const quanDecr = createAsyncThunk('quanDecr', async ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  const wish_quantity = wishData.wish_quantity - 1;
  await axios.patch(`/api/wishlist/${table}`, {menu_name, wish_quantity});
  const res = await axios.get(`/api/wishlist/${table}`);
  const temp = {table: table, data: res.data};
  return temp;
});

const tableLength = Array.from(Array(100), () => new Array(0));

const initialState = {
  wish: [...tableLength],
};

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  extraReducers: {
    [getWish.fulfilled]: (state, {payload}) => {
      state.wish[payload.table - 1] = [...payload.data];
    },
    [addWish.fulfilled]: (state, {payload}) => {
      state.wish[payload.table - 1] = [...payload.data];
    },
    [delWish.fulfilled]: (state, {payload}) => {
      state.wish[payload.table - 1] = [...payload.data];
    },
    [resetWish.fulfilled]: (state, {payload}) => {
      state.wish[payload.table - 1] = [...payload.data];
    },
    [quanIncr.fulfilled]: (state, {payload}) => {
      state.wish[payload.table - 1] = [...payload.data];
    },
    [quanDecr.fulfilled]: (state, {payload}) => {
      state.wish[payload.table - 1] = [...payload.data];
    },
  },
});

export default wishListSlice.reducer;
