import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/userSlice.js'
import authModalReducer from './Slices/uiSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authModalReducer,
  },
})
export default store