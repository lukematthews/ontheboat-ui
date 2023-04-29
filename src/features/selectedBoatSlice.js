import { createSlice } from '@reduxjs/toolkit'

export const selectedBoatSlice = createSlice({
  name: 'selectedBoat',
  initialState: {
    value: {},
  },
  reducers: {
    setSelectedBoat: (state, action) => {
        state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedBoat } = selectedBoatSlice.actions;

export default selectedBoatSlice.reducer;