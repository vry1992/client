import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  unitNames: [],
  personsWhoAdded: [],
  callSigns: [],
  shipNames: []
}

export const initialDataSlice = createSlice({
  name: 'initialData',
  initialState,
  reducers: {
    setInitData: (state, { payload }) => {
      Object.entries(payload).forEach(([key, value]) => {
        state[key] = value;
      })
    },
  },
});

export const { setInitData } = initialDataSlice.actions;
const { reducer: initialDataReducer } = initialDataSlice;

export {
  initialDataReducer
}