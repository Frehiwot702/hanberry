"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import CountUp from './CountUp';
import { useTranslations } from 'next-intl';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type stat = {
  value: number;
  label: string;
  side: string;
}

const imageRotate = {
  hidden: { opacity: 0, rotate: -8, scale: 0.9 },
  visible: { 
    opacity: 1, 
    rotate: -4, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
  },
} as const;

const numberScale = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
  },
} as const;

const stats: stat[] = [
  {
    value: 100,
    label: "Happy Clients",
    side: "K"
  },
  {
    value: 20,
    label: "Repeated Clients",
    side: "%"
  },
  {
    value: 15,
    label: "Premium Brand",
    side: "+"
  },
  {
    value: 10,
    label: "Years of Experience",
    side: "+"
  }
];

export default function AboutHamneal() {

  const t = useTranslations("AboutTheArtist");
  const g = useTranslations();


  return (
    <div id='about' className="w-full font-body">
      {/* Top Section - Light Brown Background */}
      <div className="bg-[#231814] text-white py-8 md:py-12 lg:py-16 min-h-screen h-full">
        <div className="px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-24 lg:gap-12 items-center h-full">
            {/* Left Side - Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative w-full h-[400px] md:h-[450px] lg:h-[700px]"
            >
              <div className="relative h-full w-full max-w-full md:max-w-[70%] h-full max-h-[900px] pl-4 mx-auto my-auto">
                <Image
                  src="/images/ham.PNG"
                  alt={t("hamneal") + " " + t("nebiyu")}
                  fill
                  // sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* Right Side - Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="flex flex-col gap-6 md:px-10"
            >
              <h2 className="text-lg tracking-tight text-[#AD8A55] uppercase">
                {t("theArtist")}
              </h2>

              <h2 className="text-4xl md:text-5xl lg:text-7xl tracking-tight font-heading">
                {g("hamneal")} <span className='text-[#AD8A55]'>{g("nebiyu")}</span>
              </h2>
              
              <div className="flex flex-col gap-3 text-sm md:text-base leading-relaxed text-[#E3D5C3]">
                <p className='text-justify leading-7 font-light'>
                  {t("aboutOne")}
                </p>
                <p className='text-justify leading-7 font-light'>
                  {t("aboutTwo")}
                </p>
              </div>
              {/* Bottom Section - White Background with Statistics */}
              <div className="border-t-2 border-[#E3D5C3]/30 pt-8 mt-2">
                <div className="mx-auto">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                        className="flex flex-col items-center text-center"
                      >
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }}
                          variants={numberScale}
                          transition={{ delay: index * 0.1 }}
                          className="text-4xl md:text-5xl lg:text-6xl mb-2 font-heading"
                        >
                          <CountUp to={stat.value} from={0} side={stat.side}/>
                        </motion.div>
                        <div className="text-sm md:text-base font-medium text-[#E3D5C3]">
                          {t(stat.label)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* <button className="self-start font-bold text-lg md:text-xl hover:opacity-80 transition-opacity mt-2">
                Read More
              </button> */}
            </motion.div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

