import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div className=''>
          <h1 className='text-3xl font-semibold text-center my-7'>About Ting's Blog</h1>
          <div className='txt-md text-gray-500 flex flex-col gap-6'>
            <p>Welcome to Ting's Blog.</p>
            <p>This is a practice project.</p>
            <p> I hope I can learn something more about MERN.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
