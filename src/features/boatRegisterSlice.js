import { createSlice } from '@reduxjs/toolkit'

export const boatRegisterSlice = createSlice({
  name: 'boatRegisterSelectedBoat',
  initialState: {
    value: {},
  },
  reducers: {
    setSelectedBoatRegister: (state, action) => {
        state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedBoatRegister } = boatRegisterSlice.actions;

export default boatRegisterSlice.reducer;