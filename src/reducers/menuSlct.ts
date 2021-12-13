import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from '../types/reducers';

const initialState: InitialState = {
  data: [],
  isLoading: false,
  isDone: false,
  error: null,
};

const menuSlct = createSlice({
  name: 'menuSlct',
  initialState,
  reducers: {
    // getMenu
    getMenu_request: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    getMenu_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    getMenu_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // stockIncr
    stockIncr_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    stockIncr_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    stockIncr_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // stockDecr
    stockDecr_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    stockDecr_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    stockDecr_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // stockRest
    stockRest_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    stockRest_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    stockRest_failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const menuSlctActions = { ...menuSlct.actions };

export default menuSlct.reducer;
