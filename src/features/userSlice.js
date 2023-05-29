import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {},
    isLoggedIn: false
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
