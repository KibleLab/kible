import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const changeMenu = createAsyncThunk('changeMenu', async (data) => {
  await axios.patch('/api/MenuManagement', data);
  const res = await axios.get('/api/MenuManagement');
  return res.data;
});

const initialState = {
  menu: [],
};

const menuManagementSlice = createSlice({
  name: 'menuManagement',
  initialState,
  extraReducers: {
    [changeMenu.fulfilled]: (state, {payload}) => {
      state.menu = [...payload];
    },
  },
});

export default menuManagementSlice.reducer;
