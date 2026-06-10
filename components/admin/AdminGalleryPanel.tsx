"use client";

import React, { ChangeEvent, useRef, useState } from 'react'
import Masonry from './components/Masonry';
import { addGalleryItem, Gallery } from '@/app/services/gallery.service'; 
import { Category } from "@/app/services/category.service"
import { uploadImage } from '@/app/services/uploadImage';

// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// type Item = { id: number; image_url: string; height: number; type: string };

const AdminGalleryPanel = ({gallery, categories, loading} : {gallery: Gallery[]; categories: Category[]; loading: boolean;}) => {

    // const [images, setImages] = useState<Work[]>(gallery);
    console.log({gallery})

    const [image, setImage] = useState<File | null>(null);
    const [showAddGallery, setShowAddGallery] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [imageHeight, setImageHeight] = useState('');

    const [addLoading, setAddLoading] = useState(false);
    const [deteleLoading, setDeleteLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const uploadRef = useRef<HTMLInputElement>(null);
    

    // const [img, setImg] = useState<File | null>(null);
    
    // useEffect(() => {
    //     fetch('/api/public/home-gallery').then((r) => r.json()).then((data) => {
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

    //     // await addGalleryItem(
    //     //     {result.secure_url,
    //     //     result.public_id,
    //     //     imageHeight,
    //     //    selectedCategoryId}
    //     // );
    // };

    const handleAddGallery = async () => {
        setError("");
        if (!image) return;

        if(!imageHeight) {
            setError("Enter image height");
            return;
        }

        try {
            setAddLoading(true);
            const result = await uploadImage(image);
            // const height = 900

            await addGalleryItem(
                result.secure_url,
                result.public_id,
                imageHeight,
                selectedCategoryId
            );
            setAddLoading(false);
            setShowAddGallery(false);
            setImage(null);
        }  catch (error) {
            setAddLoading(false);
            console.log(error);
            setError( "Failed to add image, try again." );
        }
        
    }

    

    const handleImageInput = () => {
        uploadRef.current?.click();
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if(!files) {
            setError("No image selected.");
        }
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    }


    if(loading) {
        return (
            <div>
                <p className='text-center py-10 text-black/70'>Loading gallery...</p>
            </div>
        )
    }


  return (
    <div className="mt-12 lg:mx-28">
        <div className='flex flex-col md:flex-row items-end justify-between'>
            <div>
                <h1 className="text-[30px] font-medium">Gallery</h1>
                <p className=''>Upload and organize images to showcase your full portfolio of beauty work.</p>
            </div>

            <button onClick={() => setShowAddGallery(true)} className="text-[26px] leading-none font-semibold">
                +
            </button>
        </div>
        {/* <input 
            type='file'
            name='image'
            accept='image/*'
            onChange={(e) => { handleUpload(e); }}
        /> */}
        <div className='relative w-full md:h-fit'>
            {gallery.length ? (
                <div className='w-full h-full mt-10'>
                    <Masonry items={gallery.map((i) => ({ id: String(i.id), img: i.imageUrl, height: i.height, canDelete: true }))} ease="power3.out" duration={0.6} stagger={0.05} animateFrom="bottom" scaleOnHover={true} hoverScale={0.95} blurToFocus={true} colorShiftOnHover={false} />
                    <div className='bg-black/20 absolute bottom-0 left-0 w-full h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <button className='bg-white text-black rounded-full px-5 py-1.5 text-base font-medium'>Replace</button>
                    </div>
                </div>
                ) : (
                <p className='text-center py-10 text-black/70'>Gallery will be available soon.</p>
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
        {showAddGallery ? (
            <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center px-6">
            <div className="w-full max-w-[880px] rounded-2xl bg-white p-8 shadow-xl">
                <h3 className="text-[36px] font-medium">Add new image</h3>
                {error && <p className='text-center text-red-500'>{error}</p>}

                <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
                    <div className='flex justify-center'>
                        <div className='w-full'>
                        <div className="relative w-full h-[300px] md:h-[450px] bg-[#1E1E1E]/5 rounded-t-[10px] overflow-hidden">

                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-gray-500">Preview Image</p>
                                </div>
                            )}

                        </div>

                        <div
                            onClick={handleImageInput}
                            className="flex items-center justify-between cursor-pointer"
                        >
                            <span className="w-full bg-black text-white px-5 py-4 rounded-b-4xl text-center">
                            Upload File
                            </span>
                        </div>

                        <input
                            ref={uploadRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        </div>
                    </div>
                    <div>
                        <select
                            className="mt-6 w-[360px] h-[50px] border border-black/40 px-3 text-sm"
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                        >
                        <option value="" disabled>
                            Select category
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                            {category.name}
                            </option>
                        ))}
                        </select>

                        <input
                            value={imageHeight}
                            onChange={(e) => setImageHeight(e.target.value)}
                            placeholder="Enter Image height here"
                            className="mt-6 w-full h-[50px] border border-black/40 px-3 text-sm"
                        /> 
                    </div>
                </div>
 

                <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => {setShowAddGallery(false); setImage(null); setError("")}}
                        className="h-[50px] px-8 border border-black/30 text-[20px]"
                    >
                        Cancel
                    </button>
                    <button type="button" onClick={() => handleAddGallery()} className="h-[50px] px-8 bg-black text-white text-[20px]">
                        {addLoading ? "adding..." : "Add Image"}
                    </button>
                </div>
            </div>
            </div>
        ) : null}

    </div>
  )
}

export default AdminGalleryPanel