import { removePost } from 'pages/Blog/postSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDistpatch } from 'redux/store'
import { IPost } from 'types/blog.type'

interface IPostWithAction extends IPost {
  handleRemovePost: (id: string) => void
  handleEditPost: (id: string) => void
}

const PostItem = (props: IPostWithAction) => {
  const { description, featureImage, id, publish, title, handleRemovePost,handleEditPost } = props
  return (
    <div className=' space-y-12 '>
      <div className='group relative '>
        <div className='sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64'>
          <img
            src={featureImage}
            alt='Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.'
            className='h-full w-full object-cover object-center'
          />
        </div>
        <h3 className='mt-6 text-sm text-gray-500'>
          <a href='#'>
            <span className='absolute inset-0' />
            {title}
          </a>
        </h3>
        <p className='text-base font-semibold text-gray-900'>{description}</p>
      </div>
      <div className='flex gap-2'>
        <button className='px-4' onClick={() => handleRemovePost(id)}>
          Remove
        </button>
        <button onClick={()=>handleEditPost(id)} className='border border-green-500 px-3 text-green-500'>Sửa</button>
      </div>
    </div>
  )
}
export default PostItem
