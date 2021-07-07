import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMenuMgnt = createAsyncThunk('getMenuMgnt', async () => {
  const res = await axios.get('/api/menu-mgnt');
  return res.data;
});

export const changeMenu = createAsyncThunk('changeMenu', async ({menuData}) => {
  const menu_name = menuData.menu_name;
  const menu_stock = menuData.menu_stock;
  await axios.patch('/api/menu-mgnt', {menu_name, menu_stock});
  const res = await axios.get('/api/menu-mgnt');
  return res.data;
});

const initialState = {
  menu: [],
};

const menuMgntSlice = createSlice({
  name: 'menuMgnt',
  initialState,
  extraReducers: {
    [getMenuMgnt.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
    [changeMenu.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
  },
});

export default menuMgntSlice.reducer;
