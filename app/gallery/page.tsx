'use client'
import Masonry from '@/components/Masonry';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { subscribeGallery, Gallery as GalleryT } from '../services/gallery.service';

// type Item = { id: number; image_url: string; height: number; type: string };

const Gallery = () => {
  // const [title, setTitle] = useState('Gallery');
  const [images, setImages] = useState<GalleryT[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
      const unsubscribe = subscribeGallery((data) => { setImages(data || []); setLoading(false); });
      return () => unsubscribe();
  }, []);

  if(loading) {
    return (
      <div>loading gallery...</div>
    )
  }

  return (
    <div className='bg-white text-black pt-10 pb-12 md:pb-16 lg:pb-20'>
        <div className='relative w-full md:h-fit'>
          <div className='px-5 md:px-10'>
            <Link href='/' >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                    <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1"/>
                </svg>
            </Link>
          </div>
          <div className='mx-auto flex items-start justify-center py-10'>
              <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl mb-10 md:mb-8 text-black" style={{fontFamily: 'salvager'}}>
                Gallery
              </motion.h1>
          </div>
          <Masonry items={images.map((i) => ({ id: String(i.id), img: i.imageUrl, height: i.height }))} ease="power3.out" duration={0.6} stagger={0.05} animateFrom="bottom" scaleOnHover={true} hoverScale={0.95} blurToFocus={true} colorShiftOnHover={false} />
        </div>
    </div>
  )
}

export default Gallery
