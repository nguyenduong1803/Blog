import { RootState } from './../../redux/store'
import { IPost } from '../../types/blog.type'
import { createReducer, createAction, current,nanoid } from '@reduxjs/toolkit'
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
export const addPost = createAction('blog/addPost', function (post: Omit<IPost, 'id'>) {
  return {
    payload:{
      ...post,
      id:nanoid()
    }
  }
})
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
      const postId = action.payload.id
      console.log('prev: ', current(state))
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        console.log('next: ', current(state))
      })
    })
    .addCase(cancelEditingPost, (state) => {
      console.log('run')
      state.editingPost = null
    })
    .addMatcher(
      // add matchers run when function here
      (action) => action.type.includes('cancel'),
      (state, action) => {
        console.log(current(state))
      }
    )
})
// selector
export const selectPost = (state: RootState) => state.blog.postList
export const selectPostEditing = (state: RootState) => state.blog.editingPost
export default postReducer
