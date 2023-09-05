import { configureStore } from '@reduxjs/toolkit'
import selectedBoatSlice from './features/selectedBoatSlice'
import boatRegisterSlice from './features/boatRegisterSlice'
import profileSlice from './features/profileSlice'

export default configureStore({
  reducer: {
    selectedBoat: selectedBoatSlice,
    boatRegisterSelectedBoat: boatRegisterSlice,
    profile: profileSlice
  },
})