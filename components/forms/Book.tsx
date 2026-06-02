"use client"
import React, { useState } from 'react'
import Successful from '../Response/Successful';
import Link from 'next/link';
import { AddBookingRequest, createBooking } from '@/app/services/booking.servce';



const Book = ({pkg, onClose} : {pkg: {
    id: string,
    name: string, 
    includes: string[],
    description: string,
    price: number, 
    duration: string,
    optional_notes: string
}, onSuccess: () => void, onClose: () => void}) => {

    console.log('package selected: ', pkg)

    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [totalPrice, setTotalPrice] = useState(pkg.price);
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const handleQuantityIncrease = () => {
        setQuantity(prevQty => {
            const newQty = prevQty + 1;
            setTotalPrice(newQty * pkg.price);
            return newQty;
        });
    };

    const handleQuantityDecrease = () => {
        setQuantity(prevQty => {
            if (prevQty > 1) {
            const newQty = prevQty - 1;
            setTotalPrice(newQty * pkg.price);
            return newQty;
            }
            return prevQty;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {

            e.preventDefault();
            setLoading(true);
            setError('');

            const payload: AddBookingRequest = { 
                fullname, 
                phone, 
                date, 
                quantity,
                package: {
                    id: pkg.id,
                    name: pkg.name,
                    price: pkg.price
                }, 
                duration: pkg.duration,
                email: email || null,
                totalPrice, 
            };
            
             
            await createBooking(payload);
            
             
            setLoading(false)
            setSuccess(true);

        } catch (error: unknown) {
            console.log(error);
            setError('Error booking, try again.');
        }
        
    }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-scroll bg-black/50 p-5'>
        <div className='bg-white text-black w-full md:w-4/5 mx-auto my-auto rounded-xl grid md:grid-cols-2 gap-10 p-5 md:px-10 py-16'>
            <div className='flex flex-col  justify-between h-full'>

                <div>
                    <div>
                        <img
                            src='./images/o9-9.jpg'
                            alt='Package Image'
                            width={500}
                            height={300}
                            className='w-full h-[300px] md:h-[450px] object-cover rounded-lg mb-5'
                        />
                    </div>
                    <h3 
                        className='text-3xl md:text-5xl font-extrabold'
                        style={{fontFamily: 'salvager'}}
                    >Booking Form</h3>

                    <h5 className='text-lg font-light mt-10'>Package detail</h5>
                    <h3 className='text-xl md:text-3xl font-bold pb-3'>{pkg.name}</h3>

                    <div className='space-y-3'>
                        <p className=''>{pkg.description} </p>
                        {/* <p className='text-center'>Perfect for your wedding day — timeless beauty that lasts all day.</p> */}
                        <p className=''>Includes</p>
                        <ul className='pl-3'>
                            {pkg.includes.map((item) => (
                                <li key={item} className='flex items-center gap-3'> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#000000"/></svg>{item}</li>
                            ))}
                        </ul>
                        <p className=''>Duration: {pkg.duration} </p>
                        <p className=''>Price: {pkg.price} <b>ETB</b> </p>
                    </div>
                </div>
                <p className='relative bottom-0 text-sm bg-[#1E1E1E] text-white rounded-md p-5 mt-10'>This booking is for availability checking only. Confirmation and payment process will be arranged directly with the makeup artist.</p>
            </div>
            <div className='p-5 rounded-lg bg-white shadow-2xl space-y-2 md:p-10'>
                {/* <p className='text-sm text-black/50'>This booking is for availability checking only. Confirmation and payment process will be arranged directly with the makeup artist.</p> */}
                <h3 className='text-2xl font-semibold mb-5'>Fill in the form below</h3>
                <form onSubmit={handleSubmit} className='space-y-8'>
                    <div>
                        <h3 className='font-semibold'>Full Name</h3>
                        <input
                            type='text'
                            onChange={(e) => {setFullname(e.target.value)}}
                            required
                            placeholder='Enter your full name'
                            className='border-b-2 border-gray-500 focus:outline-none w-full pb-2'
                        />
                    </div>
                    <div>
                        <h3 className='font-semibold'>Phone Number</h3>
                        <div className='flex items-center gap-2'>
                            <h3>+251</h3>
                            <input
                                type="tel"
                                placeholder="912345678"
                                required
                                pattern="^9[0-9]{8}$"
                                maxLength={9}
                                value={phone}
                                onChange={(e) => {
                                    // Allow only numbers
                                    const value = e.target.value.replace(/\D/g, '');
                                    // Force start with 9
                                    if (value === '' || value.startsWith('9')) {
                                    setPhone(value);
                                    }
                                }}
                                className="border-b-2 border-gray-500 focus:outline-none w-full pb-2"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className='font-semibold'>Email</h3>
                        <input
                            type='email'
                            onChange={(e) => {setEmail(e.target.value)}}
                            placeholder='Enter your email (optional)'
                            className='border-b-2 border-gray-500 focus:outline-none w-full pb-2'
                        />
                    </div>
                    <div>
                        <h3 className='font-semibold'>Appointment Date</h3>
                        <input
                            type='date'
                            onChange={(e) => {setDate(e.target.value)}}
                            required
                            className='border-b-2 border-gray-500 focus:outline-none w-full pb-2'
                        />
                    </div>
                    <div>
                        <h3 className='font-semibold'>How Many People Need Makeup Services?</h3>
                        <div className='flex items-center space-x-3'>
                            <button 
                                type='button' 
                                disabled={quantity === 1}
                                onClick={handleQuantityDecrease}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="50" viewBox="0 0 24 24">
                                <path fill="#000000" d="M17 13H7v-2h10m2-8H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"/></svg>  
                            </button>
                            <div className='bg-black/4 w-10 h-10 rounded-lg flex items-center justify-center'>{quantity}</div>
                            <button type='button' onClick={handleQuantityIncrease}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/></svg>
                            </button>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 text-sm'>
                        <input 
                            type='checkbox' 
                            name='policy'
                            required
                        /> <p>I have read and agreed to the <Link href='/policy' target="_blank" className='cursor-pointer'><span className='text-[#C19F98]'>Policy</span></Link> set by Hanberry Beauty.</p>
                    </div>
                    <h3 className='text-red-500 text-center'>{error}</h3>
                    <div className='bg-black/4 p-5 rounded-lg'>
                        <h3 className='text-md'>Total price: <b>{totalPrice} ETB</b></h3>
                        <div className=''>
                            {/* <p className='text-sm text-black/50 text-center'>This booking is for availability checking only. Confirmation and payment process will be arranged directly with the makeup artist.</p> */}
                            <button type='submit' className='bg-[#1E1E1E] text-white py-2 w-full rounded-lg mt-3'>{loading ? 'Loading...' : 'Book Now'}</button>
                            <button type='button' onClick={onClose} className='text-black py-2 w-full rounded-lg'>Cancel</button>
                        </div>
                    </div>

                    
                </form>
            </div>
        </div>

        {success && <Successful pkge={pkg} name={fullname} email={email || null} phone={phone} date={date} quantity={quantity} totalPrice={totalPrice} onClose={() => {setSuccess(false)}} />}
    </div>
  )
}

export default Book