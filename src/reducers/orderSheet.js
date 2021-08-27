import { createSlice } from '@reduxjs/toolkit';

const tableLength = Array.from(Array(100), () => new Array(0));

const initialState = {
  data: [...tableLength],
  isLoading: false,
  isDone: false,
  error: null,
};

const orderSheetSlice = createSlice({
  name: 'orderSheet',
  initialState,
  reducers: {
    GET_ORDER_ORDER_SHEET_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    GET_ORDER_ORDER_SHEET_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table - 1] = [...action.payload.data];
    },
    GET_ORDER_ORDER_SHEET_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    ADD_ORDER_ORDER_SHEET_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    ADD_ORDER_ORDER_SHEET_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table - 1] = [...action.payload.data];
    },
    ADD_ORDER_ORDER_SHEET_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    QUAN_INCR_ORDER_SHEET_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    QUAN_INCR_ORDER_SHEET_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table - 1] = [...action.payload.data];
    },
    QUAN_INCR_ORDER_SHEET_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  GET_ORDER_ORDER_SHEET_REQUEST,
  GET_ORDER_ORDER_SHEET_SUCCESS,
  GET_ORDER_ORDER_SHEET_FAILURE,
  ADD_ORDER_ORDER_SHEET_REQUEST,
  ADD_ORDER_ORDER_SHEET_SUCCESS,
  ADD_ORDER_ORDER_SHEET_FAILURE,
  QUAN_INCR_ORDER_SHEET_REQUEST,
  QUAN_INCR_ORDER_SHEET_SUCCESS,
  QUAN_INCR_ORDER_SHEET_FAILURE,
} = orderSheetSlice.actions;

export default orderSheetSlice.reducer;
