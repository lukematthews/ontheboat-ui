import { configureStore } from '@reduxjs/toolkit'
import selectedBoatSlice from './features/selectedBoatSlice'
import boatRegisterSlice from './features/boatRegisterSlice'

export default configureStore({
  reducer: {
    selectedBoat: selectedBoatSlice,
    boatRegisterSelectedBoat: boatRegisterSlice
  },
})