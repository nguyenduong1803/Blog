import { IPost } from './../../types/blog.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// fetchBaseQuery là function nhỏ được xây dụng trên fetch api
// nó không thay thế hoàn toàn axios nhưng giải quyết được các vẫn đề cơ bản
// có thể dùng axios thay thế

// endpoints là tập hợp các method giúp get post put delete ,.. tương tác với server
// khi khai báo endpoints nó sẽ sinh ra cho chúng ta các hook tương ứng để dùng trong components
// Query: Thường dùng cho GET
// Mutation: Thường dùng cho các trường hợp đổi dữ liệu trên server như POST PUT DELETE

interface ResponseBlog {
  currentPage: number
  data: IPost[]
  totalPages: number
  total: number
}
interface ResponseBlogById {
  data: IPost
}
export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api/' }),
  endpoints: (builder) => ({
    // Generic Type T:response R:arguments
    getPost: builder.query<ResponseBlog, void>({
      query: () => 'blog', //không có arguments
      // providesTags là [] hoặc function return []
      providesTags(result) {
        // callback này chậy mỗi khi getPost chạy
        // interface Tags{
        // type:"Post",
        //  id:"string",
        // }[]
        const finalItem = { type: 'Posts' as const, id: 'LIST' }
        if (result) {
          const finalList = result?.data.map(({ _id }) => ({ type: 'Posts' as const, id: _id })) || {}
          const final = [...finalList, finalItem]
          return final
        }
        return [finalItem]
      }
    }),
    addPost: builder.mutation<ResponseBlog, Omit<IPost, '_id'>>({
      query(body) {
        return {
          url: 'blog/add',
          method: 'POST',
          body
        }
      },
      // invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providersTags matche với nó sẽ bị gọi lại
      // trong trường hợp này getPost gọi lại
      invalidatesTags: (result, error, body) => [{ type: 'Posts', id: 'LIST' }]
    }),
    getPostById: builder.query<{ data: IPost }, string>({
      query: (id) => `/blog/${id}`
    }),
    updatePost: builder.mutation<{ data: IPost }, { id: string; body: Omit<IPost, '_id'> }>({
      query: ({ id, body }) => ({ url: `/blog/update/${id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, data) => [{ type: 'Posts', id: data.id }]
    }),
    deletePost: builder.mutation<{ message: string }, string>({
      query(id) {
        return {
          url: `blog/remove/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id}]
    })
  })
})

export const {
  useGetPostQuery,
  useAddPostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation
} = blogApi
