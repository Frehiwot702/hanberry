'use client'
import Image from 'next/image'
import { useState } from 'react';
// import React from 'react'

const Contact = () => {

  const [useremail, setUserEmail] = useState('');
  const [message, setMesssage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
          try {
  
              e.preventDefault();
              setLoading(true);
              setError('');
              
              await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                      useremail, 
                      message
                  }),
              })
              setLoading(false);
              setSuccess('Message sent successfully!');
              setUserEmail('');
              setMesssage('');
  
          } catch (error: unknown) {
              console.log(error)
              setError('Error sending message, try again.');
          }
          
      }

  return (
    <div id='contact' className='relative w-full h-full grid xl:grid-cols-2 gap-5 text-black px-5 md:px-16 pt-24 '>
        <div className='my-auto py-16 relative pb-24'>
            <h3 className='text-4xl md:text-6xl pb-4'>Get in Touch, Gorgeous</h3>
            <p className='text-lg text-[#4C3C32]'>We’re just a message away. Share details about your occasion, preferred aesthetic, or any inquiries, and the Hanberry Beauty team will respond promptly. Let us enhance your natural beauty with timeless elegance and refined artistry.</p>

            <form onSubmit={handleSubmit} className='py-8 space-y-5 md:w-2/3'>
              <div className='flex flex-col space-y-2'>
                <label className='font-bold'>Email</label>
                <input 
                  type='email'
                  name='email'
                  onChange={(e) => {setUserEmail(e.target.value)}}
                  placeholder='Enter your email here'
                  className='border border-black/30 px-5 py-3 placeholder:text-[#B49E83] text-sm'
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <label className='font-bold'>Message</label>
                <textarea 
                  id='message'
                  name='message'
                  onChange={(e) => {setMesssage(e.target.value)}}
                  placeholder='Write your message here'
                  className='border border-black/30 px-5 py-3 h-48 placeholder:text-[#B49E83] text-sm'
                ></textarea>
              </div>

              {error && <h3 className='text-red-500'>{error}</h3>}
              {success && <h3 className='text-green-500'>{success}</h3>}

              <button
                type='submit'
                className='bg-black w-full py-3 font-semibold text-white border border-black/30 hover:text-black hover:bg-white cursor-pointer'
              >
                {loading ? `loading...` : `Send Message`}
              </button>
            </form>
        </div>
        <div className='flex items-center justify-center bg-transparent'>
            <Image
              className='h-full w-full object-cover mx-auto bg-transparent'
              src='/contact_us.png'
              alt='Black Woman'
              width={600}
              height={300}
              // fill
            />
        </div>
    </div>
  )
}

export default Contact;