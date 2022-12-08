import React from 'react'
import CreatePost from './components/CreatePost/CreatePost'
import Postlist from './components/PostList/Postlist'
type Props = {}

const Blog = (props: Props) => {
  return (
    <div className='p-5'>
      <CreatePost />
      <Postlist />
    </div>
  )
}
export default Blog
