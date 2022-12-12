import { blogApi } from './RTKQuery/blog.service'
import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import postReducer from 'pages/Blog/postSlice'
import blogReducer from './RTKQuery/blog.slice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
const store = configureStore({
  reducer: { blog: postReducer, blogs: blogReducer, [blogApi.reducerPath]: blogApi.reducer },
  // thêm middleware để enable các tính năng caching invalidation polling của RTKQuery
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

// options nhưng bắt buộc dùng để active tính năng refetchOnFocus/refetchOnReconnect 
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDistpatch = typeof store.dispatch
export const useAppDistpatch = () => useDispatch<AppDistpatch>()
export default store
