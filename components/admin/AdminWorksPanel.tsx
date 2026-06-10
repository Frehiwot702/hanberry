"use client";

import React from 'react'
import Masonry from './components/Masonry';
import { Work } from '@/app/services/works.service'; 

// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// type Item = { id: number; image_url: string; height: number; type: string };

const AdminWorksPanel = ({works, loading} : {works: Work[]; loading: boolean;}) => {

    // const [images, setImages] = useState<Work[]>(works);
    console.log({works})

    // const [image, setImage] = useState<File | null>(null);
    

    // const [img, setImg] = useState<File | null>(null);
    
    // useEffect(() => {
    //     fetch('/api/public/home-works').then((r) => r.json()).then((data) => {
    //         setImages(Array.isArray(data?.images) ? data.images : []);
    //     }).catch(() => setImages([]));
    // }, []);

    // const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];

    //     if (!file) return;

    //     setImage(file);
    //     // const result = await uploadImage(file);
    //     // console.log({result})
    //     // await addWork( result.secure_url, result.public_id );
        
    // } 

    // const handleSave = async () => {

    //     if (!image) return;

    //     const result = await uploadImage(image);
    //     const height = 900

    //     await addWork(
    //         result.secure_url,
    //         result.public_id,
    //         height
    //     );
    // };

    if(loading) {
        return (
            <div>
                <p className='text-center py-10 text-black/70'>Loading works...</p>
            </div>
        )
    }


  return (
    <div className="mt-12 lg:mx-28">
        <h1 className="text-[30px] font-medium">Homepage Showcase</h1>
        <p className=''>Manage featured images displayed on your homepage to highlight your signature looks.</p>
        
        {/* <input 
            type='file'
            name='image'
            accept='image/*'
            onChange={(e) => { handleUpload(e); }}
        /> */}
        <div className='relative w-full md:h-fit'>
            {works.length ? (
                <div className='w-full h-full mt-10'>
                    <Masonry items={works.map((i) => ({ id: String(i.id), img: i.imageUrl, height: i.height, canReplace: true }))} ease="power3.out" duration={0.6} stagger={0.05} animateFrom="bottom" scaleOnHover={true} hoverScale={0.95} blurToFocus={true} colorShiftOnHover={false} />
                    {/* <div className='bg-black/20 absolute bottom-0 left-0 w-full h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <button className='bg-white text-black rounded-full px-5 py-1.5 text-base font-medium'>Replace</button>
                    </div> */}
                </div>
                ) : (
                <p className='text-center py-10 text-black/70'>Works will be available soon.</p>
            )}
        </div>
        {/* {image && (
            <Image
                src={URL.createObjectURL(image)}
                alt="Preview"
                width={300}
                height={300}
            />
        )} */}
        {/* <button onClick={handleSave}>
        Save Work
        </button> */}
        

    </div>
  )
}

export default AdminWorksPanel