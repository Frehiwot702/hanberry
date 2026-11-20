import React from 'react'
import PromoVideo from './Video'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server';

const Videos = async () => {
  const t = await getTranslations("Videos");
  const g = await getTranslations();
  return (
    <div className='w-full py-16 text-black px-5 md:px-16 font-body'>
        <div className='grid md:grid-cols-2 gap-10 py-10'>
            <div className='w-full space-y-5'>
                <h3 
                  // style={{fontFamily: 'salvager'}}
                  className='text-4xl md:text-6xl pt-16 font-light font-heading'>{t("headline")}</h3>
                <p className='text-lg text-[#4C3C32]'>{t("subtitle")}</p>
                <div className='mt-16 w-full'> 
                    <Link 
                    className="block w-full bg-[#231814] text-white py-6 md:py-3 px-10 cursor-pointer hover:bg-[#AD8A55]  text-center text-2xl"
                    href='/#booking'>{g("bookNow")}</Link>
                </div>
            </div>
            <div className='flex h-fit'>
              <PromoVideo videoId='video1_yeolnx'/> 
              <PromoVideo videoId='video2_npsrxa'/>  
            </div>
            {/* video2_npsrxa */}
        </div>
    </div>
  )
}

export default Videos