import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isLoading: false,
  isDone: false,
  error: null,
};

const menuSlctSlice = createSlice({
  name: 'menuSlct',
  initialState,
  reducers: {
    GET_MENU_MENU_SLCT_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    GET_MENU_MENU_SLCT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    GET_MENU_MENU_SLCT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    STOCK_INCR_MENU_SLCT_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    STOCK_INCR_MENU_SLCT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    STOCK_INCR_MENU_SLCT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    STOCK_DECR_MENU_SLCT_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    STOCK_DECR_MENU_SLCT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    STOCK_DECR_MENU_SLCT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    STOCK_REST_MENU_SLCT_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    STOCK_REST_MENU_SLCT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    STOCK_REST_MENU_SLCT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  GET_MENU_MENU_SLCT_REQUEST,
  GET_MENU_MENU_SLCT_SUCCESS,
  GET_MENU_MENU_SLCT_FAILURE,
  STOCK_INCR_MENU_SLCT_REQUEST,
  STOCK_INCR_MENU_SLCT_SUCCESS,
  STOCK_INCR_MENU_SLCT_FAILURE,
  STOCK_DECR_MENU_SLCT_REQUEST,
  STOCK_DECR_MENU_SLCT_SUCCESS,
  STOCK_DECR_MENU_SLCT_FAILURE,
  STOCK_REST_MENU_SLCT_REQUEST,
  STOCK_REST_MENU_SLCT_SUCCESS,
  STOCK_REST_MENU_SLCT_FAILURE,
} = menuSlctSlice.actions;

export default menuSlctSlice.reducer;
