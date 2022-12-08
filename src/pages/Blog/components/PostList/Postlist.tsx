import { startEditPost, removePost, selectPost } from 'pages/Blog/postSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDistpatch } from 'redux/store'
import { IPost } from 'types/blog.type'
import PostItem from '../PostItem/PostItem'

export default function Postlist() {
  const postList = useSelector(selectPost)
  const distpatch = useDispatch<AppDistpatch>()
  const handleRemovePost = (id: string) => {
    distpatch(removePost(id))
  }
  const handleEditPost = (id: string) => {
    distpatch(startEditPost(id))
  }
  return (
    <div className='mt-6 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
      {postList.map((post: IPost) => (
        <PostItem key={post.id} {...post} handleRemovePost={handleRemovePost} handleEditPost={handleEditPost} />
      ))}
    </div>
  )
}
