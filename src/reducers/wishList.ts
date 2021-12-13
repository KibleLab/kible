import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from '../types/reducers';

const tableLength = Array.from(Array(101), () => new Array(0));

const initialState: InitialState = {
  data: [...tableLength],
  isLoading: false,
  isDone: false,
  error: null,
};

const wishList = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    // getWish
    getWish_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    getWish_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table] = [...action.payload.data];
    },
    getWish_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // addWish
    addWish_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    addWish_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table] = [...action.payload.data];
    },
    addWish_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // deleteWish
    deleteWish_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    deleteWish_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table] = [...action.payload.data];
    },
    deleteWish_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // resetWish
    resetWish_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    resetWish_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table] = [...action.payload.data];
    },
    resetWish_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // quanIncr
    quanIncr_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    quanIncr_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table] = [...action.payload.data];
    },
    quanIncr_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // quanDecr
    quanDecr_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    quanDecr_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data[action.payload.table] = [...action.payload.data];
    },
    quanDecr_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const wishListActions = { ...wishList.actions };

export default wishList.reducer;
