"use client";
// import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    num: 1,
    title: 'Commitment to Quality',
    text: `We deliver flawless results using carefully selected products and techniques that meet the highest quality standards.`,
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#4C3C32" className="bi bi-gem" viewBox="0 0 16 16">
            <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6zm11.386 3.785-1.806-2.41-.776 2.413zm-3.633.004.961-2.989H4.186l.963 2.995zM5.47 5.495 8 13.366l2.532-7.876zm-1.371-.999-.78-2.422-1.818 2.425zM1.499 5.5l5.113 6.817-2.192-6.82zm7.889 6.817 5.123-6.83-2.928.002z"/>
          </svg>
  },
  {
    num: 2,
    title: 'High Standards of Hygiene',
    text: `Every tool, product, and workspace is thoroughly cleaned and sanitized to ensure your safety and comfort.`,
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#4C3C32" className="bi bi-droplet-half" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
            <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/>
          </svg>
  },
  //  {
  //   num: 5,
  //   title: 'Trusted by Clients',
  //   text: `Our reputation is built on consistency, professionalism, and the trust of clients who keep coming back.`,
  //   svg: ``
  // },
  {
    num: 3,
    title: 'Premium Brands Only',
    text: `We use authentic, high-end makeup brands to ensure long-lasting beauty and skin-friendly results.`,
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#4C3C32" className="bi bi-stars" viewBox="0 0 16 16">
            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
          </svg>
  },
  {
    num: 4,
    title: 'Tailored just for You',
    text: `Every look is customized to your skin type, features, and personal style for a result that feels uniquely you.`,
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#4C3C32" className="bi bi-bullseye" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8"/>
            <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
          </svg>
  },
];

// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

export default function HanberryFeaturesPage() {
  return (
    <div 
      className="min-h-screen relative overflow-hidden text-black md:py-16 px-5 md:px-16"
      // style={{ backgroundImage: "url('/images/b1.png')" }}
    >
      <div className='py-16'>
        <h3 className='text-[#4C3C32] uppercase text-center'>The hanberry Standard</h3>
        <h2 className='text-4xl md:text-7xl text-center mt-3 text-black'>Gentle on the skin, Uncompromising on finish.</h2>
        <div className='relative pt-10'>
          <div className='grid md:grid-cols-4 gap-5 md:gap-16'>
            {features.map((feat) => (
              <div key={feat.num} className='space-y-5'>
                {/* <div className='opacity-80'>{feat.svg}</div> */}
                <h6 className='text-2xl text-[#4C3C32]'>0{feat.num}</h6>
                <h3 className='text-2xl md:text-4xl py-2 mt-4 text-black'>{feat.title}</h3>
                <p className='text-lg text-[#4C3C32]'>{feat.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}