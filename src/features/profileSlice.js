import { createSlice } from '@reduxjs/toolkit'

export const currentProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    value: {},
  },
  reducers: {
    setProfile: (state, action) => {
        state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfile } = currentProfileSlice.actions;

export default currentProfileSlice.reducer;