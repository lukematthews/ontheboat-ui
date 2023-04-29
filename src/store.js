import { configureStore } from '@reduxjs/toolkit'
import selectedBoatSlice from './features/selectedBoatSlice'

export default configureStore({
  reducer: {
    selectedBoat: selectedBoatSlice,
  },
})