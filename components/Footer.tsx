// import Image from 'next/image'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server';
// import React from 'react'

const Footer = async () => {
  const t = await getTranslations('Footer');

  return (
    <div className='bg-[#231814] text-white h-full relative w-full font-body'>
        <div className='grid lg:grid-cols-6 md:gap-5 px-10 py-20'>
            <div className='col-span-2 relative p-10 min-h-96 min-w-72 mx-auto md:h-full'>
                <Image
                    src='/women.png'
                    alt={t("imageAlt")}
                    fill
                    className='h-full w-full object-center object-contain mx-auto my-auto '
                />
            </div>
            <div className='grid md:grid-cols-3 gap-10 col-span-4'>
                <div className='space-y-3'>
                    <h3 className='text-3xl md:text-5xl font-heading'> {t("headline")} </h3>
                    <p className='text-sm md:text-md text-white/70'>hami0935712362@gmail.com</p>
                </div>
                <div className='md:mx-auto space-y-3'>
                    <h3 className='font-brand text-xl md:text-3xl'>{t("discover")}</h3>
                    <ul className='text-sm md:text-lg py-2 text-white/70 space-y-1 group group-hover:text-[#D8A48F] hover:cursor-pointer'>
                        <li className='hover:text-[#E7C9B6]'>{t("home")}</li>
                        <li className='hover:text-[#E7C9B6]'>{t("about")}</li>
                        <li className='hover:text-[#E7C9B6]'>{t("services")}</li>
                        <li className='hover:text-[#E7C9B6]'>{t("gallery")}</li>
                        <li className='hover:text-[#E7C9B6]'>{t("contact")}</li>
                    </ul>
                </div>
                <div className='md:mx-auto space-y-3'>
                    <h3 className='font-brand text-xl md:text-3xl'>{t("contact")}</h3>
                    <ul className='text-sm md:text-lg py-2 text-white/70 space-y-1 group group-hover:text-[#D8A48F] hover:cursor-pointer'>
                        <li className='hover:text-[#E7C9B6]'> +251 935 71 23 62 </li>
                        <li className='hover:text-[#E7C9B6]'> +251 914 67 16 13 </li>
                        <li className='hover:text-[#E7C9B6]'> {t("addisAbaba")} </li>
                    </ul>
                </div>
                <div className='w-full md:grid items-center'>
                    <div className='space-y-8'>
                        {/* <div className='w-full md:w-2/3 space-y-3'>
                            <h3 className='text-2xl text-[#D8A48F]'>Hamneal Nebiyu - Artist</h3>
                            <p className='text-sm md:text-lg text-white/80 font-light'>Professional Makeup Artist | Bridal & Event Specialist Enhancing natural beauty with passion, precision, and care.</p>
                        </div> */}
                        <div className=''>
                            <h3 className='font-brand text-xl md:text-3xl'>{t("socials")}</h3>
                            <div>
                                <ul className='flex space-x-3 py-2 text-sm text-white/80'>
                                    <li className='hover:text-[#E7C9B6]'> 
                                        <Link href='https://www.instagram.com/hamneal_nebiyu?igsh=NHU3dGF2Z256bjJ6&utm_source=qr'>{t("instagram")} </Link>
                                    </li>
                                    <li>|</li>
                                    <li className='hover:text-[#E7C9B6]'> 
                                        <Link href='https://www.tiktok.com/@hamnealnebiyu?_r=1'>{t("tiktok")}</Link></li>    
                                    <li>|</li>
                                    <li className='hover:text-[#E7C9B6]'>
                                        <Link href='#'>{t('facebook')}</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className='border-t-2 border-white/20 pt-5 mb-0'>
                            {/* <h3 className='text-[3em] md:text-[5em] xl:text-[8.5em] text-[#AD8A55] inline'>HANBERRY</h3> */}
                            <Image
                                src="/images/HanBerry BEAUTY.png"
                                alt="HanBerry Beauty"
                                width={230}
                                height={230}
                                className="object-cover mb-4"
                            />
                            <p className='text-sm md:text-md text-white/80 font-light'>{t('description')}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
            
        <div className='bottom-0 border-t-2 border-white/20 px-5 md:px-0'>
            {/* Made with 💖 by <Link className='text-[#bda478ff]' href='https://t.me/fruittedi'> B&F © 2025 </Link> | */}
            <h3 className='text-sm font-light text-center py-3 text-white/90'>{t('allRightsReserved')}</h3>
        </div>
    </div>
  )
}

export default Footer