import React, { ChangeEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { replaceWork } from '@/app/services/works.service';
import {uploadImage} from '../../../app/services/uploadImage';
import { removeGallery } from '@/app/services/gallery.service';

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const getValue = () => {
    if (typeof window === 'undefined') return defaultValue;

    const index = queries.findIndex(q => window.matchMedia(q).matches);
    return values[index] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(getValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handler = () => setValue(getValue());

    const mediaQueryLists = queries.map(q => window.matchMedia(q));
    mediaQueryLists.forEach(mql =>
      mql.addEventListener('change', handler)
    );

    return () =>
      mediaQueryLists.forEach(mql =>
        mql.removeEventListener('change', handler)
      );
  }, [queries]);

  return value;
};


const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  height: number;
  canReplace?:boolean;
  canDelete?:boolean
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)'],
    [4, 3, 2],
    3
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const [showReplaceWorkModal, setShowReplaceWorkModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [cloudinaryUpload, setCloudinaryUpload] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  // const [containerHeight, setContainerHeight] = useState(0);

  const { grid, containerHeight } = useMemo(() => {
  if (!width) return { grid: [], containerHeight: 0 };

  const colHeights = new Array(columns).fill(0);
  const gap = 16;
  const totalGaps = (columns - 1) * gap;
  const columnWidth = (width - totalGaps) / columns;


  const grid = items.map(child => {
    const col = colHeights.indexOf(Math.min(...colHeights));
    const x = col * (columnWidth + gap);
    const h = child.height / 2;
    const y = colHeights[col];

    colHeights[col] += h + gap;

    return { ...child, x, y, w: columnWidth, h };
  });

  return {
    grid,
    containerHeight: Math.max(...colHeights)
  };
  }, [columns, items, width]);


  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleImageInput = () => {
        uploadRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if(!files) {
            setError("No logo selected.");
        }
        if (files && files.length > 0) {
            setNewImage(files[0]);
        }
  }


  const updateImage = async () => {
    setError("");
    setLoading(true);

    if (!newImage) {
      setError("Please select an image to upload.");
      setLoading(false);
      return;
    };
    if(!selectedImage) {
      setError("No image selected for replacement.");
      setLoading(false);
      return;
    };
    
    const result = await uploadImage(newImage);

    await replaceWork(
      selectedImage.id,
      result.secure_url
    );
    setLoading(false);
    setShowReplaceWorkModal(false);
    setNewImage(null)
  }


  const handleDeleteGallery = async (id: string) => {
          try { 
              setLoading(true);
              await removeGallery(id)
              setLoading(false);
          } catch (error) {
              setLoading(false);
              console.log(error);
              setError( "Failed to delete gallery." );
          }
      }


  return (
    <div ref={containerRef} className="relative w-full" style={{ height: containerHeight }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content"
          style={{ willChange: 'transform, width, height, opacity' }}
          // onClick={() => window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className=" w-full h-full bg-cover bg-center rounded-[10px] uppercase text-[10px] leading-[10px]"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
            )}
          </div>
          <div className="absolute inset-0 bg-black/40 flex flex-col space-y-5 items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[10px]">

            {item.canReplace && (
              <button
                onClick={() => {
                  setSelectedImage(item);
                  setShowReplaceWorkModal(true);
                }}
                className="bg-white text-black px-5 py-2 rounded-full"
              >
                Replace
              </button>
            )}
            {item.canDelete && (
              <button
                onClick={() => {
                  handleDeleteGallery(item.id);
                }}
                className="bg-red-500 text-white px-5 py-2 rounded-full"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}

      {showReplaceWorkModal ? (
        <div className="absolute top-0 inset-0 z-50 bg-black/20 flex items-center justify-center px-6">
          <div className="w-full top-0 max-w-[860px] rounded-2xl bg-white p-8 shadow-xl flex flex-col overflow-y-auto">
            <h3 className="text-[26px] font-medium text-center">Replace Work</h3>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <div className="mt-6 grid md:grid-cols-7 gap-6">
              <div className='col-span-3 w-full flex justify-center items-center'>
                <img
                  src={selectedImage?.img || "/"}
                  alt='Work image' 
                  className='object-cover rounded-2xl w-full h-[300px] md:h-[450px]'
                />
              </div>

              <div className='h-full flex my-auto items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
              </div>

              <div className='col-span-3 flex justify-center'>
                <div className='w-full'>
                  <div className="relative w-full h-[300px] md:h-[450px] bg-[#1E1E1E]/5 rounded-t-[10px] overflow-hidden">

                    {newImage ? (
                      <img
                        src={URL.createObjectURL(newImage)}
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
          
            </div>

            

            <div className="mt-16 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {setNewImage(null); setShowReplaceWorkModal(false);}}
                className="h-[50px] px-8 border border-black/30 text-[20px]"
              >
                Cancel
              </button>  
              <button type="button" onClick={updateImage} className="h-[50px] px-8 bg-black text-white text-[20px]">
                {loading ? "replacing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Masonry;
