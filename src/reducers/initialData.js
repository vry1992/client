import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  unitNames: {},
  personsWhoAdded: [],
  callSigns: []
}

export const initialDataSlice = createSlice({
  name: 'initialData',
  initialState,
  reducers: {
    setInitData: (state, { payload: { unitNames, personsWhoAdded, callSigns }}) => {
      state.unitNames = unitNames;
      state.personsWhoAdded = personsWhoAdded;
      state.callSigns = callSigns;
    },
    setUnitNames: (state, { unitNames }) => {
      state.unitNames = unitNames;
    },
  },
});

export const { setInitData, setUnitNames } = initialDataSlice.actions;
const { reducer: initialDataReducer } = initialDataSlice;

export {
  initialDataReducer
}