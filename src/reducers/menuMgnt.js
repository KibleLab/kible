import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isLoading: false,
  isDone: false,
  error: null,
};

const menuMgntSlice = createSlice({
  name: 'menuMgnt',
  initialState,
  reducers: {
    GET_MENU_MENU_MGNT_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    GET_MENU_MENU_MGNT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    GET_MENU_MENU_MGNT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    CHANGE_MENU_MENU_MGNT_REQUEST: (state) => {
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    CHANGE_MENU_MENU_MGNT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isDone = true;
      state.data = [...action.payload.data];
    },
    CHANGE_MENU_MENU_MGNT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  GET_MENU_MENU_MGNT_REQUEST,
  GET_MENU_MENU_MGNT_SUCCESS,
  GET_MENU_MENU_MGNT_FAILURE,
  CHANGE_MENU_MENU_MGNT_REQUEST,
  CHANGE_MENU_MENU_MGNT_SUCCESS,
  CHANGE_MENU_MENU_MGNT_FAILURE,
} = menuMgntSlice.actions;

export default menuMgntSlice.reducer;
