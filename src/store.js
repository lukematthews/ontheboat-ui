import { configureStore } from '@reduxjs/toolkit'
import selectedBoatSlice from './features/selectedBoatSlice'
import userSlice from './features/userSlice'
export default configureStore({
  reducer: {
    selectedBoat: selectedBoatSlice,
    user: userSlice,
  },
})