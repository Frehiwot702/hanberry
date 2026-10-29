"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Poppins, Italianno } from 'next/font/google';

import { salvager } from '@/app/lib/fonts';
import Link from 'next/link';

const poppins = Poppins({ subsets: ['latin'], weight: ['300','400','500','600','700'], display: 'swap' });
const italianno = Italianno({ subsets: ['latin'], weight: ['400'], display: 'swap' });

// Simple typing animation: renders characters with staggered opacity/translateY
function TypingText({ text, className = '', delay = 0, charDelay = 0.03 }: { text: string; className?: string; delay?: number; charDelay?: number }) {
  // Preserve spaces by converting them to non-breaking spaces so they render as characters
  const letters = text.split('').map((c) => (c === ' ' ? '\u00A0' : c));
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: charDelay,
        delayChildren: delay,
      },
    },
  };
  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.span
      aria-hidden
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((char, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function MakeupIntro() {
  return (

    <div className="w-full bg-[#231814] text-white flex flex-col lg:flex-row">
      {/* Left Image bg-[#E7C9B6] */}

      <div className="w-full lg:w-1/2 h-screen overflow-hidden relative">
        <Image src="/images/w1.jpg" alt="Makeup model" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>

      {/* Right Side - Text and Image */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Text Area */}
        <div className="p-6 lg:p-16 flex-1 lg:max-w-4xl">
          <p className="text-xl lg:text-3xl mb-3 font-light">
            <TypingText text="Welcome" delay={0.1} charDelay={0.14} />
          </p>
          <h1 className="text-4xl lg:text-5xl leading-tight">
            <h3 className='text-4xl lg:text-6xl leading-tight'> Dive into the world of makeup beauty </h3>
          </h1>
          <p className={`text-md lg:text-xl text-white/80 max-w-2xl`}>
            “At Hanberry Beauty Lounge, beauty is more than makeup — it’s confidence, self-expression, and artistry.” – Hamneal N.
          </p>
          <div className='mt-8'>
            <Link
                href='/#works'
                className='bg-[#AD8A55] w-fit text-black text-lg hover:bg-[#d6ac6d] transition-colors duration-300 py-3 px-8 rounded-full flex items-center justify-center gap-5 cursor-pointer text-center '
            >
                Explore Our Work
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
            </Link>
          </div>
        </div>

        {/* Bottom Right Image centered */}
        <div className="w-full h-9/12 flex items-center justify-center overflow-hidden  relative">
          <Image src="/images/w2.jpg" alt="Closeup eyes" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
        </div>
      </div>
    </div>
  );
}

export default MakeupIntro;