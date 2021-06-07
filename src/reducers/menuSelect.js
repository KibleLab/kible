import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMenu = createAsyncThunk('getMenu', async (table_no) => {
  const res = await axios.get(`/api/MenuSelect/${table_no}`);
  return res.data;
});

const initialState = {
  menu: [],
  order: [],
};

const menuSelectSlice = createSlice({
  name: 'menuSelect',
  initialState,
  reducers: {
    stockIncr: (state, action) => {
      const index = state.menu.findIndex((menu) => menu.menu_no === action.payload.menu_no);
      state.menu[index].menu_stock += 1;
    },
    stockDecr: (state, action) => {
      const index = state.menu.findIndex((menu) => menu.menu_no === action.payload.menu_no);
      state.menu[index].menu_stock -= 1;
    },
    stockRest: (state, action) => {
      const index = state.menu.findIndex((menu) => menu.menu_no === action.payload.menu_no);
      state.menu[index].menu_stock += action.payload.order_quantity;
    },
    addOrder: (state, action) => {
      state.order.push({
        menu_no: action.payload.menu_no,
        menu_name: action.payload.menu_name,
        menu_price: action.payload.menu_price,
        order_quantity: 1,
      });
    },
    delOrder: (state, action) => {
      const index = state.order.findIndex((order) => order.menu_no === action.payload.menu_no);
      state.order.splice(index, 1);
    },
    quanIncr: (state, action) => {
      state.order[action.payload].order_quantity += 1;
    },
    quanDecr: (state, action) => {
      state.order[action.payload].order_quantity -= 1;
    },
    resetOrder: (state) => {
      state.order = [];
    },
  },
  extraReducers: {
    [getMenu.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
  },
});

export const {stockIncr, stockDecr, stockRest, addOrder, delOrder, quanIncr, quanDecr, resetOrder} =
  menuSelectSlice.actions;

export default menuSelectSlice.reducer;
