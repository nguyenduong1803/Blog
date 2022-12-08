import React from 'react'

type Props = {}

const BlogItem = (props: Props) => {
  return (
    <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
      <div className='group relative'>
        <div className='sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64'>
          <img
            src='https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg'
            alt='Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.'
            className='h-full w-full object-cover object-center'
          />
        </div>
        <h3 className='mt-6 text-sm text-gray-500'>
          <a href='#'>
            <span className='absolute inset-0' />
            Desk and Office
          </a>
        </h3>
        <p className='text-base font-semibold text-gray-900'>Work from home accessories</p>
      </div>
    </div>
  )
}
export default BlogItem
