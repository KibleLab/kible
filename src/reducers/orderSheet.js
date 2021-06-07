import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getOS = createAsyncThunk('getOS', async (table_no) => {
  const res = await axios.get(`/api/OrderSheet/${table_no}`);
  const temp = {table_no: table_no, data: res.data};
  return temp;
});

export const addOS = createAsyncThunk('addOS', async ({table_no, data}) => {
  await axios.post(`/api/MenuSelect/${table_no}`, data);
  const res = await axios.get(`/api/OrderSheet/${table_no}`);
  const temp = {table_no: table_no, data: res.data};
  return temp;
});

export const quanIncrOS = createAsyncThunk('quanIncrOS', async ({table_no, data}) => {
  await axios.patch(`/api/MenuSelect/${table_no}`, data);
  const res = await axios.get(`/api/OrderSheet/${table_no}`);
  const temp = {table_no: table_no, data: res.data};
  return temp;
});

const tableLength = Array.from(Array(100), () => new Array(0));

const initialState = {
  order: [...tableLength],
};

const orderSheetSlice = createSlice({
  name: 'orderSheet',
  initialState,

  extraReducers: {
    [getOS.fulfilled]: (state, {payload}) => {
      state.order[payload.table_no - 1] = [...payload.data];
    },
    [addOS.fulfilled]: (state, {payload}) => {
      state.order[payload.table_no - 1] = [...payload.data];
    },
    [quanIncrOS.fulfilled]: (state, {payload}) => {
      state.order[payload.table_no - 1] = [...payload.data];
    },
  },
});

export default orderSheetSlice.reducer;
