"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion';
import { Category, subscribeCategories } from '@/app/services/category.service';
import { Package, subscribePackages } from '@/app/services/package.service';
import { useTranslations } from 'next-intl';

const Services = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [allPackages, setAllPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);

    const t = useTranslations("Services");
    const g = useTranslations();

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
    <div id='booking' className='relative text-black w-full md:max-w-4/5 mx-auto py-16 px-5 md:px-0 space-y-4 font-body'>
        <h3 className='text-[#AD8A55] uppercase'>{t("bookYourAppointment")}</h3>
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl text-black font-heading"
            // style={{fontFamily: 'salvager'}}
            // style={{ fontFamily: 'Georgia, serif' }}
        >{t("chooseAService")}</motion.h1>
        <p className="text-lg text-black leading-relaxed max-w-2xl">{t("chooseServiceDescription")}</p>

        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {grouped.sort((a, b) => a.order - b.order).map((category) => (
                <div key={category.id} className='relative w-full'>
                    <div className='relative w-full h-[600px]'>
                        <Image
                            src={category.coverImage}
                            alt={t(category.name)}
                            fill
                            className='object-cover w-full h-full rounded-lg'
                        />
                        <div className='absolute w-full h-full bg-linear-to-b from-transparent to-black rounded-lg'/>
                    </div>
                    
                    <div className='text-white absolute top-16 md:top-24 left-5 grid h-full'>
                        <div className='grid grid-cols-1 items-end gap-2 row-span-2 h-full justify-end'>
                            <div className='flex flex-col bottom-5 gap-2'>
                                <h3 className='text-3xl lg:text-5xl font-brand'>{t(category.name)} {g("makeup")}</h3>
                                <p className='text-sm md:text-md font-light text-white/80'>{t(category.description)}</p>
                            </div>
                        </div>
                        {/* <div className='flex flex-col justify-end gap-2 row-span-1 h-[100px]'>
                            <h3 className='font-semibold mt-3'>4 packages available</h3>
                        </div> */}
                        <div className='h-[100px] flex flex-col items-start gap-5'>
                            <div className='flex flex-col justify-end gap-2 row-span-1 h-[100px]'>
                                <h3 className='mt-3 text-sm md:text-md'>{category.types.length} {t("packagesAvailable")}</h3>
                            </div>
                            <Link
                                href={`/service/${category.slug}`}  
                                className='bg-[#E0BFB8] w-fit text-black text-md hover:bg-[#d0a090] transition-colors duration-300 py-3 px-8 rounded-full flex items-center gap-5 mt-5 md:mt-0'
                            >
                                {t("explorePackages")} 
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