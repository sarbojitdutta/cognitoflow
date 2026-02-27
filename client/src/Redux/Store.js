import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/userSlice.js'
import authModalReducer from './Slices/uiSlice.js'
import dashboardReducer from './Slices/dashboardSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authModalReducer,
    dashboard: dashboardReducer
  },
})
export default store