import { startEditPost, removePost, selectPost, getPostList } from 'pages/Blog/postSlice'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDistpatch } from 'redux/store'
import { IPost } from 'types/blog.type'
import PostItem from '../PostItem/PostItem'

export default function Postlist() {
  const postList = useSelector(selectPost)
  const distpatch = useAppDistpatch()
  const handleRemovePost = (id: string) => {
    distpatch(removePost(id))
  }
  const handleEditPost = (id: string) => {
    distpatch(startEditPost(id))
  }
  useEffect(() => {
    const promise = distpatch(getPostList())
    return () => {
      promise.abort()
    }
  }, [distpatch])
  return (
    <div className='mt-6 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
      {postList &&
        postList.map((post: IPost) => (
          <PostItem key={post._id} {...post} handleRemovePost={handleRemovePost} handleEditPost={handleEditPost} />
        ))}
    </div>
  )
}
