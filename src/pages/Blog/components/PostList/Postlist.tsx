import { startEditPost, removePost, selectPost, getPostList, selectLoading } from 'pages/Blog/postSlice'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDeletePostMutation, useGetPostQuery } from 'redux/RTKQuery/blog.service'
import { useAppDistpatch } from 'redux/store'
import { IPost } from 'types/blog.type'
import PostItem from '../PostItem/PostItem'
import SkeletonPost from '../Skeleton/SkeletonPost'

export default function Postlist() {
  // const postList = useSelector(selectPost)
  // const loading = useSelector(selectLoading)

  const [deletePost] = useDeletePostMutation()
  const distpatch = useAppDistpatch()
  const handleRemovePost = (id: string) => {
    // distpatch(removePost(id))
    deletePost(id)
  }
  const handleEditPost = (id: string) => {
    distpatch(startEditPost(id))
  }
  // console.log(loading)
  // useEffect(() => {
  //   const promise = distpatch(getPostList())
  //   return () => {
  //     promise.abort()
  //   }
  // }, [distpatch])
  const { data, isFetching } = useGetPostQuery()
  console.log(data)
  return (
    <div className='mt-6 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
      {isFetching && (
        <>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </>
      )}
      {!isFetching &&
        data &&
        data.data.map((post: IPost) => (
          <PostItem key={post._id} {...post} handleRemovePost={handleRemovePost} handleEditPost={handleEditPost} />
        ))}
    </div>
  )
}
