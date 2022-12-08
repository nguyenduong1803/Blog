import { RootState } from './../../redux/store'
import { IPost } from '../../types/blog.type'
import { createReducer, createAction } from '@reduxjs/toolkit'
import { initialPostList } from 'constants/blog'

interface BlogState {
  editingPost: IPost | null
  postList: IPost[]
}

const initState: BlogState = {
  editingPost: null,
  postList: initialPostList
}
// create Action
export const addPost = createAction<IPost>('blog/addPost')
export const removePost = createAction<string>('blog/removePost')
export const startEditPost = createAction<string>('blog/startEditPost')
export const finishEditPost = createAction<IPost>('blog/finishEditPost')
export const cancelEditingPost = createAction('blog/cancelEditingPost')

const postReducer = createReducer(initState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      state.postList.push(action.payload)
    })
    .addCase(removePost, (state, action) => {
      state.postList = state.postList.filter((post) => post.id !== action.payload)
    })
    .addCase(startEditPost, (state, action) => {
      state.editingPost = state.postList.find((post: IPost) => post.id === action.payload) || null
    })
    .addCase(finishEditPost, (state, action) => {
      const index = state.postList.findIndex((post) => post.id === action.payload.id)
      state.postList[index] = action.payload
      state.editingPost = null
    })
    .addCase(cancelEditingPost, (state) => {
      console.log('run')
      state.editingPost = null
    })
})
// selector
export const selectPost = (state: RootState) => state.blog.postList
export const selectPostEditing = (state: RootState) => state.blog.editingPost
export default postReducer
