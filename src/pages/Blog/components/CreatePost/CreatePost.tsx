import { unwrapResult } from '@reduxjs/toolkit'
import {
  addPost,
  cancelEditingPost,
  finishEditPost,
  selectPostEditing,
  selectPostIdEditing
} from 'pages/Blog/postSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAddPostMutation, useGetPostByIdQuery, useUpdatePostMutation } from 'redux/RTKQuery/blog.service'
import { AppDistpatch } from 'redux/store'
import { IPost } from 'types/blog.type'

const initialState: IPost = {
  description: '',
  images: '',
  _id: '',
  publish: false,
  title: ''
}
type Error = {
  error: Object
  messsage: string
}
const CreatePost = () => {
  // redux toolkit
  const distpath = useDispatch<AppDistpatch>()
  const postEdit = useSelector(selectPostEditing)
  const postIdEdit = useSelector(selectPostIdEditing)
  // RTK Query/
  const [setAddPost, addPostResult] = useAddPostMutation()
  const [setUpdatePost, updatePostResult] = useUpdatePostMutation()
  const { data, isFetching } = useGetPostByIdQuery(postIdEdit, { skip: !postIdEdit })
  // state
  const [error, setError] = useState<null | Error>(null)
  const [formData, setFormData] = useState<IPost>(initialState)
  const handleSetForm = (name: keyof Omit<IPost, '_id'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }))
  }
  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // if (formData.description === '' || formData.images === '' || formData.title === '') return
    const { _id, ...formDataExceptId } = formData
    // with reudux toolkit
    // try {
    //   distpath(addPost(formDataExceptId)).unwrap()
    //   handleResetForm()
    // } catch (error: any) {
    //   console.log(error)
    //   setError(error)
    // }
    // with mutation RTK

    setAddPost(formDataExceptId)
    console.log(formData)
  }
  // reset
  const handleResetForm = () => {
    setFormData(initialState)
  }
  const cancelEditPost = () => {
    distpath(cancelEditingPost())
  }
  const handleUpdatePost = () => {
    const { _id, ...formDataExceptId } = formData
    setUpdatePost({ id: _id, body: formDataExceptId })
  }
  useEffect(() => {
    console.log(data)
    setFormData(data?.data || initialState)
  }, [data])
  return (
    <div>
      <div className='mt-10 sm:mt-0'>
        <div className='mt-5 md:col-span-2 md:mt-0'>
          <form onSubmit={handleSubmit} onReset={cancelEditPost} className='mx-auto w-[50%]'>
            <div className='overflow-hidden shadow sm:rounded-md'>
              <div className='bg-white px-4 py-5 sm:p-6'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-12 sm:col-span-6'>
                    <label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
                      Title
                    </label>
                    <input
                      type='text'
                      onChange={handleSetForm('title')}
                      name='first-name'
                      id='first-name'
                      value={formData.title}
                      autoComplete='given-name'
                      className='mt-1 block h-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                  <div className='col-span-12 sm:col-span-6'>
                    <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                      Featured Image
                    </label>
                    <input
                      type='text'
                      onChange={handleSetForm('images')}
                      name='last-name'
                      id='last-name'
                      value={formData.images}
                      autoComplete='family-name'
                      className='mt-1 block h-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                  <div className='col-span-12 sm:col-span-6'>
                    <label htmlFor='email-address' className='block text-sm font-medium text-gray-700'>
                      Description
                    </label>
                    <input
                      type='text'
                      onChange={handleSetForm('description')}
                      name='email-address'
                      id='email-address'
                      autoComplete='email'
                      value={formData.description}
                      className='mt-1 block h-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                  <div className='col-span-12 flex gap-4 align-middle sm:col-span-6 '>
                    <label
                      htmlFor='comments'
                      className='block cursor-pointer select-none text-sm font-medium text-gray-700'
                    >
                      Publish
                    </label>
                    <input
                      onChange={(e) => setFormData((prev) => ({ ...prev, publish: e.target.checked }))}
                      checked={formData.publish}
                      id='comments'
                      name='comments'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                    />
                  </div>
                </div>
                {error?.messsage && <p className='text-red-700'>{error.messsage}</p>}
              </div>
              <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                {Boolean(postIdEdit) && (
                  <>
                    <button
                      onClick={handleUpdatePost}
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent border-green-600 py-2 px-4 text-sm font-medium text-black shadow-sm  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Edit
                    </button>
                    <button
                      type='reset'
                      className='inline-flex justify-center rounded-md border border-transparent border-orange-500 py-2 px-4 text-sm font-medium text-black shadow-sm  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Cancel
                    </button>
                  </>
                )}
                {!Boolean(postIdEdit) && (
                  <button
                    type='submit'
                    className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white '
                  >
                    Publish Post
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default CreatePost
