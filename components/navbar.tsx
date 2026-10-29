"use client";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useRef, useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function Navbar() {

  const [openMenu, setOpenMenu] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  

  return (
    <>
      <div ref={ref} className='w-full text-black px-10 shadow-2xl'>
        <div className="w-full py-3 hidden md:flex items-center justify-between space-x-5 md:space-x-16 border-b-2 border-gray-200">
          <div className="flex items-center space-x-3 text-sm">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
            </svg> */}
            <h3>+251 935 71 23 62 | +251 914 67 16 13</h3>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
            </svg> */}
            <h3>hami0935712362@gmail.com</h3>
          </div>
        </div>
      </div>
      {/* desktop menu */}
      <nav
        className={`hidden w-full md:grid grid-cols-3 items-center justify-between px-10 py-4 bg-[#FAF6F0]`}
      >
        {/* Left links with divider */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-14 text-lg font-light">
            <Link href="#home" className="hover:text-[#C9A34E] text-black transition-colors">
              Home
            </Link>
            <Link href="#works" className="hover:text-[#C9A34E] text-black transition-colors">
              Works
            </Link>
            <Link href="#booking" className="hover:text-[#C9A34E] text-black transition-colors">
              Services
            </Link>
            <Link href="#about" className="hover:text-[#C9A34E] text-black transition-colors">
              The Artist
            </Link>
          </div>
          {/* horizontal line directly below left links */}
          <div className="mt-4 mb-6 h-px bg-gray-300 w-full" aria-hidden="true" />
        </div>

        {/* Logo Center */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/HanBerry BEAUTY.png"
            alt="HanBerry Beauty"
            width={130}
            height={130}
            className="object-cover"
          />
        </div>

        {/* Right links + button with divider */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-12 text-lg font-light">
            <Link href="#contact" className="hover:text-[#C9A34E] text-black md:text-l transition-colors">
              Contact
            </Link>
            <Link href='/#booking' className="bg-black text-white px-4 py-2 hover:bg-white border border-black hover:text-black md:text-lg transition-colors">
              Book Now
            </Link>
          </div>
          {/* horizontal line directly below right links */}
          <div className="mt-4 mb-6 h-px bg-gray-300 w-full" aria-hidden="true" />
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`w-full h-[5em] flex md:hidden items-center justify-between bg-white px-2 shadow-sm`}
      >
        {/* Left links with divider */}
        <div>
          { !openMenu && ( <button onClick={() => setOpenMenu(!openMenu)} className="items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="100" viewBox="0 0 20 20"><path fill="#000000" fillRule="evenodd" d="M2 8a1 1 0 0 1 1-1h10.308a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm0-4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h10.308a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Z" clipRule="evenodd"/></svg>
          </button>)}
          { openMenu && ( <button onClick={() => setOpenMenu(!openMenu)} className="items-start text-black rounded-full px-2 cursor-pointer"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
            </svg>
          </button>)}
        </div>

        {/* Logo Center */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/HanBerry BEAUTY.png"
            alt="HanBerry Beauty"
            width={110}
            height={120}
            className="object-cover"
          />
        </div>
        <Link href='/#booking' className="bg-black text-white px-4 py-2 text-sm md:text-lg transition-colors">
          Book Now
        </Link> 
      </div>
      {
        openMenu && (
          <div className="w-full absolute z-20 bg-white rounded-b-lg">
            <div className="w-full grid gap-3 px-3 py-5 items-center  text-l md:text-l font-light">
              <Link href="#home" className="hover:text-[#C9A34E] text-black transition-colors">
                Home
              </Link>
              <Link href="#works" className="hover:text-[#C9A34E] text-black transition-colors">
                Works
              </Link>
              <Link href="#booking" className="hover:text-[#C9A34E] text-black transition-colors">
                Services
              </Link>
              <Link href="#about" className="hover:text-[#C9A34E] text-black transition-colors">
                About the Artist
              </Link>
              <Link href="#contact" className="hover:text-[#C9A34E] text-black md:text-l transition-colors">
                Contact
              </Link>
            </div>
          </div>
        )
      }
    </>
  );
}
