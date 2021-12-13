import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from '../types/reducers';

const initialState: InitialState = {
  data: [],
  isLoading: false,
  isDone: false,
  error: null,
};

const menuMgnt = createSlice({
  name: 'menuMgnt',
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
    getMenu_Failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },

    // changeMenu
    changeMenu_request: (state, _action) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    changeMenu_success: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    changeMenu_Failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const menuMgntActions = { ...menuMgnt.actions };

export default menuMgnt.reducer;
