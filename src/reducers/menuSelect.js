import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMenu = createAsyncThunk('getMenu', async (table_no) => {
  const res = await axios.get(`/api/MenuSelect/${table_no}`);
  return res.data;
});

const initialState = {
  menu: [],
  wish: [],
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
    addWish: (state, action) => {
      state.wish.push({
        menu_no: action.payload.menu_no,
        menu_name: action.payload.menu_name,
        menu_price: action.payload.menu_price,
        order_quantity: 1,
      });
    },
    delWish: (state, action) => {
      const index = state.wish.findIndex((wish) => wish.menu_no === action.payload.menu_no);
      state.wish.splice(index, 1);
    },
    quanIncr: (state, action) => {
      state.wish[action.payload].order_quantity += 1;
    },
    quanDecr: (state, action) => {
      state.wish[action.payload].order_quantity -= 1;
    },
    resetWish: (state) => {
      state.wish = [];
    },
  },
  extraReducers: {
    [getMenu.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
  },
});

export const {stockIncr, stockDecr, stockRest, addWish, delWish, quanIncr, quanDecr, resetWish} =
  menuSelectSlice.actions;

export default menuSelectSlice.reducer;
