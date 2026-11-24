import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Policy = () => {
  return (
    <div className='bg-white w-full min-h-screen text-black grid md:grid-cols-2'>
        <div className='relative min-h-82'>
            <Image
                src='/images/o9-9.jpg'
                alt='women with makeup'
                fill
                className='object-cover object-center h-96'
            />
        </div>
        <div className='text-md flex flex-col mx-auto p-5 md:p-16  my-auto'>
            <h3 className="font-brand text-4xl md:text-6xl py-5">Booking Policy</h3>
            <ul className='space-y-3 mt-5'>
                <li>• <b>Appointments Only:</b> All services are by appointment to ensure each client receives a personalized premiumexperience.</li>
                <li>• <b>Punctuality:</b> Please arrive on time for your appointment. Late arrivals may result in a shortened service or cancellation, as we carefully honor each client’s scheduled time.</li>
                <li>• <b>Deposits:</b> A non-refundable deposit may be required to secure your appointment. This deposit will be applied toward your final service total.</li>
                <li>• <b>Cancellations & Rescheduling:</b> Kindly provide at least 24 hours notice after the booking is confirmed for cancellations or rescheduling. Late cancellations may result in the loss of your deposit.</li>
                <li>• <b>door to door vip Service:</b> For home or hotel appointments, clients are kindly asked to prepare a clean, comfortable, and well-lit space suitable for the service to ensure the best results and a smooth experience.</li>
            </ul>
            <p className='mt-5'>Thank you for respecting our time and commitment to providing a premium beauty experience.</p>
            <div className='text-center w-full py-16'>
                <Link
                    href='/'
                    className="my-2 relative bottom-0 w-full px-10 bg-black text-white py-2 md:py-3 cursor-pointer border-2 border-black hover:text-black hover:bg-white"
                >
                    Book now
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Policy