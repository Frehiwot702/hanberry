"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion';
import { Category, subscribeCategories } from '@/app/services/category.service';
import { Package, subscribePackages } from '@/app/services/package.service';

const Services = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [allPackages, setAllPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeCategories( (data) => { setCategories(data || []); setLoading(false); });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
            const unsubscribe = subscribePackages( (data) => { setAllPackages(data || []); setLoading(false);});
            return () => unsubscribe();
        }, []);
    
        // console.log({allPackages})
    
    const grouped = useMemo(() => categories.map((cat) => ({ ...cat, types: allPackages.filter((pkg) => pkg.categoryId === cat.id) })), [categories, allPackages]);

    if(loading) {
        return (
            <div>loading...</div>
        )
    }
    
  return (
    <div id='services' className='relative text-black w-full py-16 px-5 md:px-16 space-y-4'>
        <h3 className='uppercase text-lg text-[#4C3C32]'>Book Your Appointment</h3>
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl text-black"
            // style={{fontFamily: 'salvager'}}
            // style={{ fontFamily: 'Georgia, serif' }}
        >Choose a Service</motion.h1>
        <p className="text-lg text-black leading-relaxed max-w-2xl">Choose a service to explore packages and start your booking.</p>

        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-5'>
            {grouped.sort((a, b) => a.order - b.order).map((category) => (
                <div key={category.id} className='relative w-full'>
                    <div className='relative w-full h-[600px]'>
                        <Image
                            src={category.coverImage}
                            alt={category.name}
                            fill
                            className='object-cover w-full h-full rounded-lg'
                        />
                        <div className='absolute w-full h-full bg-linear-to-b from-transparent to-black rounded-lg'/>
                    </div>
                    
                    <div className='text-white absolute top-24 left-5 grid h-full'>
                        <div className='grid grid-cols-1 items-end gap-2 row-span-2 h-full justify-end'>
                            <div className='flex flex-col bottom-5 gap-2'>
                                <h3 className='text-4xl md:text-6xl'>{category.name} Makeup</h3>
                                <p className='text-md font-light'>{category.description}</p>
                            </div>
                        </div>
                        {/* <div className='flex flex-col justify-end gap-2 row-span-1 h-[100px]'>
                            <h3 className='font-semibold mt-3'>4 packages available</h3>
                        </div> */}
                        <div className='h-[100px] flex flex-col items-start gap-5'>
                            <div className='flex flex-col justify-end gap-2 row-span-1 h-[100px]'>
                                <h3 className='mt-3'>{category.types.length} packages available</h3>
                            </div>
                            <Link
                                href={`/service/${category.slug}`}  
                                className='bg-[#E0BFB8] w-fit text-black text-md hover:bg-[#d0a090] transition-colors duration-300 py-3 px-8 rounded-full flex items-center gap-5'
                            >
                                Explore packages 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            
            
        </div>
    </div>
  )
}

export default Services