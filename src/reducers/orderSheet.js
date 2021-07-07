import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrder = createAsyncThunk('getOrder', async (table) => {
  const res = await axios.get(`/api/ordersheet/${table}`);
  const temp = {table: table, data: res.data};
  return temp;
});

export const addOrder = createAsyncThunk('addOrder', async ({table, wishData}) => {
  const menu_name = wishData.menu_name;
  const menu_price = wishData.menu_price;
  const order_quantity = wishData.wish_quantity;
  await axios.post(`/api/ordersheet/${table}`, {menu_name, menu_price, order_quantity});
  const res = await axios.get(`/api/ordersheet/${table}`);
  const temp = {table: table, data: res.data};
  return temp;
});

export const quanIncrOrder = createAsyncThunk(
  'quanIncrOS',
  async ({table, wishData, orderData}) => {
    const menu_name = orderData.menu_name;
    const order_quantity = orderData.order_quantity + wishData.wish_quantity;
    await axios.patch(`/api/ordersheet/${table}`, {menu_name, order_quantity});
    const res = await axios.get(`/api/ordersheet/${table}`);
    const temp = {table: table, data: res.data};
    return temp;
  }
);

const tableLength = Array.from(Array(100), () => new Array(0));

const initialState = {
  order: [...tableLength],
};

const orderSheetSlice = createSlice({
  name: 'orderSheet',
  initialState,
  extraReducers: {
    [getOrder.fulfilled]: (state, {payload}) => {
      state.order[payload.table - 1] = [...payload.data];
    },
    [addOrder.fulfilled]: (state, {payload}) => {
      state.order[payload.table - 1] = [...payload.data];
    },
    [quanIncrOrder.fulfilled]: (state, {payload}) => {
      state.order[payload.table - 1] = [...payload.data];
    },
  },
});

export default orderSheetSlice.reducer;
