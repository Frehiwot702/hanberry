import Image from 'next/image';
import React from 'react'

const Successful = ({pkge, name, email, phone, date, quantity, totalPrice, onClose}: {pkge: {
    id: string,
    name: string, 
    includes: string[],
    description: string,
    price: number, 
    duration: string,
    optional_notes: string
}, name: string, email: string | null, phone: string, date: string, quantity: number, totalPrice: number, onClose: () => void}) => {

    const getDayAndMonth = (dateString: string) => {
        const [year, month, day] = dateString.split("-");

        const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );

        return {
            day: date.getDate(),
            month: date.toLocaleString("en-US", { month: "long" }),
            year: date.getFullYear(),
        };
    };

    const { day, month, year } = getDayAndMonth(date);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-scroll bg-black/50 px-1 py-10 md:p-5'>
        <div style={{backgroundImage: 'url(/summary-background.jpg)', backgroundColor: '#ffffff'}} className='text-black bg-cover bg-no-repeat md:w-4/5 mx-auto my-auto rounded-xl grid md:grid-cols-3 gap-10 p-5 md:px-10 pt-16'>
            <div className='text-center mb-10 col-span-2 md:pl-8'>
                <h3 className='text-2xl md:text-5xl font-bold text-start mb-2'>Your Booking Has Been Received!</h3>
                <h3 className='text-md text-start'>The makeup artist will contact you directly to confirm the details</h3>
                <div className='flex w-full space-x-3 items-center justify-center my-10 text-center'>
                    <div className='absolute z-50 items-end justify-center'>
                        <h3 className='text-[5em] font-bold'>{day}</h3>
                        <h3 className='-mt-5'>{month}, {year}</h3>
                    </div>
                    <Image
                        src='/date-bg.png'
                        alt='pencil sketch background image'
                        width={220}
                        height={220}
                        className=''
                    />
                </div>
                {/* <h3 className='text-3xl font-bold font-serif'>Your makeup session has been successfully booked</h3>
                <h4 className=''>You will hear from us shortly</h4> */}

                <div className='w-full grid md:grid-cols-2 gap-10 text-start'>
                    <div className='md:border-r-2 md:border-black/5 space-y-3 text-lg'>
                        <div>
                            <h3 className='font-bold'>{name}</h3>
                            <h4 className='text-sm text-gray-500'>Booked for</h4>
                        </div>
                        <div>
                            <h3 className='font-bold'>+251 {phone}</h3>
                            <h4 className='text-sm text-gray-500'>Phone</h4>
                        </div>
                        {email && (<div>
                            <h3 className='font-bold'>{email}</h3>
                            <h4 className='text-sm text-gray-500'>Email</h4>
                        </div>)}
                        <div>
                            <h3 className='font-bold'>{quantity}</h3>
                            <h4 className='text-sm text-gray-500'>Person Quantity</h4>
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <h3 className='text-3xl font-bold'>{pkge.name}</h3>
                        <div className='space-y-3 text-sm'>
                            <p className=''>{pkge.description} </p>
                            {/* <p className='text-center'>Perfect for your wedding day — timeless beauty that lasts all day.</p> */}
                            <p className=''>Includes</p>
                            <ul className='pl-3'>
                                {pkge.includes.map((item) => (
                                    <li key={item} className='flex items-center gap-3'> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#000000"/></svg>{item}</li>
                                ))}
                            </ul>
                            <p>Duration: {pkge.duration} </p>
                            <p>Person Quantity: {quantity}</p>
                            <p>Package Price: {pkge.price}</p>

                            <p className='mt-5 font-semibold'>Total Price: {totalPrice} <b>ETB</b> </p>
                        </div>
                        
                    </div>

                </div>
                <button onClick={onClose} className='bg-[#1E1E1E] text-white py-2 w-full rounded-lg mt-16'>Close</button>
                <h3 className='text-gray-500 mt-5'>For more information, please contact us through +251 935712362 / +251 914671613</h3>
                
            </div>
        </div>

    </div>
  )
}

export default Successful