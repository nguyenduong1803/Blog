import { RootState } from './../../redux/store'
import { IPost } from '../../types/blog.type'
import {
  createReducer,
  createAction,
  current,
  nanoid,
  createSlice,
  createAsyncThunk,
  AsyncThunk
} from '@reduxjs/toolkit'
import { initialPostList } from 'constants/blog'
import Http from 'utils/Http'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface BlogState {
  editingPost: IPost | null
  postList: IPost[]
  loading: boolean
  currentRequestId: string | undefined
}

const initState: BlogState = {
  editingPost: null,
  postList: [],
  loading: false,
  currentRequestId: undefined
}

const postSlice = createSlice({
  name: 'blog',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostList.fulfilled, (state, action: any) => {
        state.postList = action.payload.data
      })
      .addCase(addPost.fulfilled, (state, action: any) => {
        state.postList.push(action.payload.data)
      })
      .addCase(startEditPost, (state, action) => {
        state.editingPost = state.postList.find((post: IPost) => post._id === action.payload) || null
      })
      .addCase(finishEditPost.fulfilled, (state, action: any) => {
        const postId = action.payload.product._id
        state.postList.find((post, index) => {
          if (post._id === postId) {
            state.postList[index] = action.payload.product
            return true
          }
        })
      })
      .addCase(cancelEditingPost, (state) => {
        state.editingPost = null
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addDefaultCase((state, action) => {
        // not match action.type => run here
        console.log(`Action: ${action.type}`)
      })
  }
})

export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkApi) => {
  const res = await Http.get<IPost>('/blog', {
    signal: thunkApi.signal
  })
  return res.data
})
export const addPost = createAsyncThunk('blog/addPost', async (body: Omit<IPost, '_id'>, thunkApi) => {
  try {
    const res = await Http.post<IPost>('/blog/add', body, {
      signal: thunkApi.signal
    })
    return res.data
  } catch (error: any) {
    console.log(error)
    if (error.name === 'AxiosError' && error.response.status === 400) {
      return thunkApi.rejectWithValue(error.response.data)
    }
    throw error
  }
})
export const finishEditPost = createAsyncThunk('blog/finishEditPost', async (data: IPost, thunkApi) => {
  const { _id, ...body } = data
  const res = await Http.put<IPost>('/blog/update/' + _id, body, {
    signal: thunkApi.signal
  })
  return res.data
})

// create Action
// export const addPost = createAction('blog/addPost', function (post: Omit<IPost, 'id'>) {
//   return {
//     payload: {
//       ...post,
//       id: nanoid()
//     }
//   }
// })
export const removePost = createAction<string>('blog/removePost')
export const startEditPost = createAction<string>('blog/startEditPost')
// export const finishEditPost = createAction<Omit<IPost, '_id'>>('blog/finishEditPost')
export const cancelEditingPost = createAction('blog/cancelEditingPost')

// const postReducer = createReducer(initState, (builder) => {
//   builder
//     .addCase(addPost, (state, action) => {
//       state.postList.push(action.payload)
//     })
//     .addCase(removePost, (state, action) => {
//       state.postList = state.postList.filter((post) => post.id !== action.payload)
//     })
//     .addCase(startEditPost, (state, action) => {
//       state.editingPost = state.postList.find((post: IPost) => post.id === action.payload) || null
//     })
//     .addCase(finishEditPost, (state, action) => {
//       const postId = action.payload.id
//       state.postList.some((post, index) => {
//         if (post.id === postId) {
//           state.postList[index] = action.payload
//           return true
//         }
//       })
//     })
//     .addCase(cancelEditingPost, (state) => {
//       console.log('run')
//       state.editingPost = null
//     })
//     .addMatcher(
//       // add matchers run when function here
//       (action) => action.type.includes('cancel'),
//       (state, action) => {
//         console.log(current(state))
//       }
//     )
// })
// selector
export const selectPost = (state: RootState) => state.blog.postList
export const selectPostEditing = (state: RootState) => state.blog.editingPost
export const selectLoading = (state: RootState) => state.blog.loading
export default postSlice.reducer
