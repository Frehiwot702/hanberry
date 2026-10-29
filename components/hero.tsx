"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  {
    src: '/images/h1.PNG',
    alt: 'Model 1',
    overlayText: '',
    textColor: '',
  },
  {
    src: '/images/h2.jpg',
    alt: 'Model 2',
    overlayText: '',
    textColor: '',
  },
  {
    src: '/images/h3.jpg',
    alt: 'Model 3',
    // overlayText: 'BEA',
    textColor: 'text-white',
  },
  {
    src: '/images/h4.PNG',
    alt: 'Model 4',
    // overlayText: 'UTY',
    textColor: 'text-white',
  },
];

// Keep a small variant object, but we'll pass per-item animate props for clearer control
// (floatVariants removed — using per-item animate/transition props instead)

function HeroSection() {
  return (
    <div className=" w-full overflow-hidden">
      {/* Images Row */}
      <div className="grid grid-cols-4 justify-center items-center gap-2 md:gap-6 px-2 md:px-10 py-12">
        {images.map((img, index) => {
          // h1 & h3 (index 0,2) should be higher; h2 & h4 (index 1,3) lower
          const verticalClass = index % 2 === 0 ? '-translate-y-6' : 'translate-y-6';
          const smallVerticlClass = index % 2 === 0 ? '-translate-y-4' : 'translate-y-4';
          // Per-item animate: even indices move up, odd move down. Keep movement slow.
          const animateY = index % 2 === 0 ? [0, -30, 0] : [0, 30, 0];
          const transition = { duration: 10, repeat: Infinity };

          return (
            <motion.div
              key={index}
              className={`relative rounded-2xl overflow-hidden w-full h-[450px] md:h-[600px] transform ${smallVerticlClass} md:${verticalClass}`}
              animate={{ y: animateY }}
              transition={transition}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />

              {/* Overlay handling: position BEA on h3 (index 2) to the right, UTY on h4 (index 3) to the left */}
              {img.overlayText && (index === 2 || index === 3) && (
                <div className={`absolute inset-y-0 ${index === 2 ? 'right-1' : 'left-6'} top-1/2 transform -translate-y-1/2 pointer-events-none `}> 
                  {/* Bottom layer: large white stroke (outline) */}
                  <span
                    aria-hidden
                    style={{ WebkitTextStroke: '6px white', color: 'transparent' }}
                    className="block text-[11em] font-extrabold tracking-wider leading-none pt-40"
                  >
                    {img.overlayText}
                  </span>
               
                </div>
              )}
            </motion.div>
          );
        })}
        <div>
          <div className={`absolute inset-y-0 right-2 -bottom-10 top-2/3 transform -translate-y-1/2 pointer-events-none `}> 
              {/* Bottom layer: large white stroke (outline) */}
              <span
                aria-hidden
                style={{ WebkitTextStroke: '6px black', color: 'transparent' }}
                className="block text-[4em] md:text-[11em] md:font-extrabold tracking-wider leading-none pt-40"
              > BEAUTY </span>
            </div>
        </div>
      </div>

      {/* Scrolling Text */}
      <div className="w-full overflow-hidden py-10 md:py-20">
        <motion.div
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: 'linear',
          }}
          className="whitespace-nowrap flex gap-6 text-sm md:text-xl font-semibold"
        >
          {Array(10).fill(
            <>
              <span key={1} className="text-[#8B7A5D]">BE YOUR OWN KIND OF BEAUTY  </span>
              <span key={2} className='text-black'> | </span>
              <span key={3} className="text-black">BE YOUR OWN KIND OF BEAUTY </span>
              <span key={4} className='text-black'> |</span>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;