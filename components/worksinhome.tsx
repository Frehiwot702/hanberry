"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Masonry from './Masonry';
import Link from 'next/link';
import {subscribeWorks, Work} from '../app/services/works.service';
// import { Gallery, subscribeGallery } from '@/app/services/gallery.service';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// type Item = { id: number; image_url: string; height: number; type: string };

export default function WorksInHome() { 
  const [images, setImages] = useState<Work[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => { 
      const unsubscribe = subscribeWorks((data) => { setImages(data || []); setLoading(false); });
      return () => unsubscribe();
  }, []);

  if(loading) {
    return (
      <div>loading works...</div>
    )
  }

  return (
    <div id='works' className="w-full h-fit bg-white font-poppins py-12 md:py-24 lg:py-24 relative">
      <div className=" mx-auto relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-start mb-8 md:mb-12 px-4 md:px-16">
          <h1 style={{fontFamily: 'salvager'}} className="text-4xl md:text-6xl mb-3 md:mb-5 text-black">Elegant & Luxury Makeup Works</h1>
          <p className="text-black text-md">Explore a curated selection of makeup looks, each crafted to enhance natural beauty and personal style.</p>
        </motion.div>
        <div className='relative w-full md:h-fit'>
          <div className='absolute z-40 bg-gradient-to-b from-transparent via-transparent to-white w-full h-full'>.</div>
          {images.length ? (
            <Masonry items={images.map((i) => ({ id: String(i.id), img: i.imageUrl, height: i.height }))} ease="power3.out" duration={0.6} stagger={0.05} animateFrom="bottom" scaleOnHover={true} hoverScale={0.95} blurToFocus={true} colorShiftOnHover={false} />
          ) : (
            <p className='text-center py-10 text-black/70'>Works will be available soon.</p>
          )}
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex justify-center relative bottom-0">
          <Link href="/gallery" className="bg-black border border-black text-white px-8 py-2 md:px-12 md:py-3 text-base md:text-lg hover:bg-white hover:text-black transition-colors my-16">View More</Link>
        </motion.div>
      </div>
    </div>
  );
}
