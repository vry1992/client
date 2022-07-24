import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchShipsList: []
}

export const shipsSlice = createSlice({
  name: 'ships',
  initialState,
  reducers: {
    setSearchShipsList: (state, { payload }) => {
      state.searchShipsList = payload;
    },
  },
});

export const { setSearchShipsList } = shipsSlice.actions;
const { reducer: shipsReducer } = shipsSlice;

export {
  shipsReducer
}