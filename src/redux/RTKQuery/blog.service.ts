import { IPost } from './../../types/blog.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// fetchBaseQuery là function nhỏ được xây dụng trên fetch api
// nó không thay thế hoàn toàn axios nhưng giải quyết được các vẫn đề cơ bản
// có thể dùng axios thay thế

// endpoints là tập hợp các method giúp get post put delete ,.. tương tác với server
// khi khai báo endpoints nó sẽ sinh ra cho chúng ta các hook tương ứng để dùng trong components
// Query: Thường dùng cho GET
// Mutation: Thường dùng cho các trường hợp đổi dữ liệu trên server như POST PUT DELETE

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api/' }),
  endpoints: (builder) => ({
    // Generic Type T:response R:arguments
    getPost: builder.query<IPost, void>({
      query: () => 'blog' //không có arguments
    })
  })
})

export const { useGetPostQuery } = blogApi
