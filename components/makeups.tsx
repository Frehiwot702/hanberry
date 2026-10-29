"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const makeupStyles = [
  {
    id: 1,
    image: '/images/m1.JPG',
    title: 'Bridal Glam',
    description: 'Radiate timeless elegance on your special day. Every bridal look is designed to enhance your natural glow and ensure you feel beautiful, confident, and unforgettable.'
  },
  {
    id: 2,
    image: '/images/m2.JPG',
    title: 'Natural Beauty',
    description: 'Embrace your authentic self with subtle enhancements that highlight your natural features. Perfect for everyday elegance and professional settings.'
  },
  {
    id: 3,
    image: '/images/m3.JPG',
    title: 'Glamorous Evening',
    description: 'Make a statement with bold, sophisticated looks designed for special occasions. From dramatic eyes to flawless skin, every detail is perfected.'
  },
  {
    id: 4,
    image: '/images/m4.JPG',
    title: 'Cultural Elegance',
    description: 'Celebrate your heritage with traditional and modern fusion looks. Each style honors cultural beauty while embracing contemporary artistry.'
  },
  {
    id: 5,
    image: '/images/m5.PNG',
    title: 'Editorial Glam',
    description: 'Channel high-fashion vibes with creative, artistic makeup looks. Perfect for photoshoots, events, and those who love to stand out.'
  }
];

export default function MakeupGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentStyle = makeupStyles[activeIndex];

  return (
    <div className="w-full py-6 md:py-8 lg:py-24">
      <div className="px-4 md:px-16">
        {/* Top Divider Line */}
        {/* <div className="h-px bg-[#F8E7E3] mb-6 md:mb-8"></div> */}

        {/* Text Content Section */}
        <div className="w-full my-6 md:my-8">
          {/* Main Title - Cursive/Elegant Font */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl mb-10 md:mb-8 text-black"
            // style={{fontFamily: 'salvager'}}
            // style={{ fontFamily: 'Georgia, serif' }}
          >
            Makeup Crafted for Every Occasion
          </motion.h1>

          {/* Content Container with Sub-heading, Description, and Navigation */}
          <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Left Side - Sub-heading and Description */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 text-black">
                    {currentStyle.title}
                  </h2>
                  <p className="text-base text-lg leading-relaxed max-w-2xl text-[#4C3C32]">
                    {currentStyle.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Navigation */}
            <div className="flex items-center gap-4">
              <span className="text-black font-medium right-0">Next</span>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % makeupStyles.length)}
                className="w-10 h-10 bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
                aria-label="Next makeup style"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        
      </div>
      {/* Image Gallery Section */}
      <div className="relative w-full overflow-hidden ">
          <div className="flex gap-0">
            {makeupStyles.map((style, index) => {
              const isHovered = hoveredIndex === index;
              const isActive = activeIndex === index;
              
              return (
                <motion.div
                  key={style.id}
                  className="relative shrink-0 cursor-pointer my-auto"
                  style={{
                    marginLeft: index > 0 ? '-5%' : '0',
                    zIndex: isHovered || isActive ? 10 : 5 - index,
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setActiveIndex(index);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ width: '24%' }}
                  animate={{
                    width: isHovered || isActive ? '28%' : '24%',
                    height: isHovered || isActive ? '420px' : '360px',
                  }}
                  transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={style.image}
                      alt={style.title}
                      fill
                      sizes="(max-width: 768px) 22vw, 22vw"
                      className={`object-cover transition-all duration-400 ${
                        isHovered || isActive ? 'brightness-100 rounded-md shadow-2xl' : 'brightness-40'
                      }`}
                    />
                    {/* Overlay effect on hover */}
                    {(isHovered || isActive) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
    </div>
  );
}

