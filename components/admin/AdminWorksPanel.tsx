"use client";

import React, { useEffect, useState } from 'react'
import Masonry from './components/Masonry';


// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

type Item = { id: number; image_url: string; height: number; type: string };

const AdminWorksPanel = () => {

    const [images, setImages] = useState<Item[]>([]);

    // const [img, setImg] = useState<File | null>(null);
    
    useEffect(() => {
        fetch('/api/public/home-works').then((r) => r.json()).then((data) => {
            setImages(Array.isArray(data?.images) ? data.images : []);
        }).catch(() => setImages([]));
    }, []);

  return (
    <div className="mt-12 mx-28">
        <h1 className="text-[30px] font-medium">Homepage Showcase</h1>
        <p className=''>Manage featured images displayed on your homepage to highlight your signature looks.</p>
        
        <input 
            type='file'
            name='image'
            accept='image/*'
        />
        <div className='relative w-full md:h-fit'>
            {images.length ? (
                <Masonry items={images.map((i) => ({ id: String(i.id), img: i.image_url, height: i.height, type: i.type }))} ease="power3.out" duration={0.6} stagger={0.05} animateFrom="bottom" scaleOnHover={true} hoverScale={0.95} blurToFocus={true} colorShiftOnHover={false} />
                ) : (
                <p className='text-center py-10 text-black/70'>Works will be available soon.</p>
            )}
        </div>

    </div>
  )
}

export default AdminWorksPanel