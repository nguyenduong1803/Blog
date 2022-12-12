import { createSlice } from '@reduxjs/toolkit'
interface BlogState {
  postId: string
}
const initState: BlogState = {
  postId: ''
}
const blogSlice = createSlice({
  name: 'blogs',
  initialState: initState,
  reducers: {}
})

const blogReducer = blogSlice.reducer
export default blogReducer
