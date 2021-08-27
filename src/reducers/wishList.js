import { createSlice } from '@reduxjs/toolkit';

const tableLength = Array.from(Array(100), () => new Array(0));

const initialState = {
  data: [...tableLength],
  isLoading: false,
  isDone: false,
  error: null,
};

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    GET_WISH_WISH_LIST_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    GET_WISH_WISH_LIST_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table - 1] = [...action.payload.data];
    },
    GET_WISH_WISH_LIST_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    ADD_WISH_WISH_LIST_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    ADD_WISH_WISH_LIST_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table - 1] = [...action.payload.data];
    },
    ADD_WISH_WISH_LIST_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    DELETE_WISH_WISH_LIST_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    DELETE_WISH_WISH_LIST_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table - 1] = [...action.payload.data];
    },
    DELETE_WISH_WISH_LIST_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    RESET_WISH_WISH_LIST_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    RESET_WISH_WISH_LIST_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table - 1] = [...action.payload.data];
    },
    RESET_WISH_WISH_LIST_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    QUAN_INCR_WISH_LIST_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    QUAN_INCR_WISH_LIST_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table - 1] = [...action.payload.data];
    },
    QUAN_INCR_WISH_LIST_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    QUAN_DECR_WISH_LIST_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    QUAN_DECR_WISH_LIST_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table - 1] = [...action.payload.data];
    },
    QUAN_DECR_WISH_LIST_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  GET_WISH_WISH_LIST_REQUEST,
  GET_WISH_WISH_LIST_SUCCESS,
  GET_WISH_WISH_LIST_FAILURE,
  ADD_WISH_WISH_LIST_REQUEST,
  ADD_WISH_WISH_LIST_SUCCESS,
  ADD_WISH_WISH_LIST_FAILURE,
  DELETE_WISH_WISH_LIST_REQUEST,
  DELETE_WISH_WISH_LIST_SUCCESS,
  DELETE_WISH_WISH_LIST_FAILURE,
  RESET_WISH_WISH_LIST_REQUEST,
  RESET_WISH_WISH_LIST_SUCCESS,
  RESET_WISH_WISH_LIST_FAILURE,
  QUAN_INCR_WISH_LIST_REQUEST,
  QUAN_INCR_WISH_LIST_SUCCESS,
  QUAN_INCR_WISH_LIST_FAILURE,
  QUAN_DECR_WISH_LIST_REQUEST,
  QUAN_DECR_WISH_LIST_SUCCESS,
  QUAN_DECR_WISH_LIST_FAILURE,
} = wishListSlice.actions;

export default wishListSlice.reducer;
