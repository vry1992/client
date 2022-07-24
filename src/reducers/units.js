import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  unitNames: {}
}

export const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    setUnitNames: (state, { payload }) => {
      state.unitNames = payload;
    },
  },
});

export const { setUnitNames } = unitsSlice.actions;
const { reducer: unitsReducer } = unitsSlice;

export {
    unitsReducer
}