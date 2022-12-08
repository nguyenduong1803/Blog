import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import postReducer from 'pages/Blog/postSlice'
const store = configureStore({
  reducer: { blog: postReducer }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDistpatch = typeof store.dispatch
export const useAppDistpatch = () => useDispatch<AppDistpatch>()
export default store
