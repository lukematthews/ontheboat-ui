import { configureStore } from '@reduxjs/toolkit'
import selectedBoatSlice from './features/selectedBoatSlice'
import userSlice from './features/userSlice'
import boatRegisterSlice from './features/boatRegisterSlice'

export default configureStore({
  reducer: {
    selectedBoat: selectedBoatSlice,
    user: userSlice,
    boatRegisterSelectedBoat: boatRegisterSlice
  },
})