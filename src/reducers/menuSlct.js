import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMenu = createAsyncThunk('getMenu', async () => {
  const res = await axios.get('/api/menu-slct');
  return res.data;
});

export const stockIncr = createAsyncThunk('stockIncr', async ({menuData}) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock + 1;
  await axios.patch('/api/menu-slct', {menu_name, menu_stock});
  const res = await axios.get('/api/menu-slct');
  return res.data;
});

export const stockDecr = createAsyncThunk('stockDecr', async ({menuData}) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock - 1;
  await axios.patch('/api/menu-slct', {menu_name, menu_stock});
  const res = await axios.get('/api/menu-slct');
  return res.data;
});

export const stockRest = createAsyncThunk('stockRest', async ({menuData, wishData}) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock + wishData.wish_quantity;
  await axios.patch('/api/menu-slct', {menu_name, menu_stock});
  const res = await axios.get('/api/menu-slct');
  return res.data;
});

const initialState = {
  menu: [],
};

const menuSlctSlice = createSlice({
  name: 'menuSlct',
  initialState,
  extraReducers: {
    [getMenu.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
    [stockIncr.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
    [stockDecr.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
    [stockRest.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
  },
});

export default menuSlctSlice.reducer;
