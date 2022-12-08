import { addPost, cancelEditingPost, finishEditPost, selectPostEditing } from 'pages/Blog/postSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDistpatch } from 'redux/store'
import { IPost } from 'types/blog.type'

const initialState: IPost = {
  description: '',
  images: '',
  _id: '',
  publish: false,
  title: ''
}
const CreatePost = () => {
  const distpath = useDispatch<AppDistpatch>()
  const postEdit = useSelector(selectPostEditing)
  const [formData, setFormData] = useState<IPost>(initialState)

  const handleSetForm = (name: keyof Omit<IPost, '_id'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }))
  }
  // handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.description === '' || formData.images === '' || formData.title === '') return
    distpath(addPost(formData))
    handleResetForm()
  }
  // reset
  const handleResetForm = () => {
    setFormData(initialState)
  }
  const cancelEditPost = () => {
    distpath(cancelEditingPost())
  }
  const handleUpdatePost = () => {
    distpath(finishEditPost(formData))
    console.log('update')
  }
  useEffect(() => {
    setFormData(postEdit || initialState)
  }, [postEdit])
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
              </div>
              <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                {postEdit && (
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
                {!postEdit && (
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
